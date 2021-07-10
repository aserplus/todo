const { v4: uuidv4 } = require('uuid');
const dynamodb = require('aws-sdk/clients/dynamodb');

const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const tableName = process.env.TABLE_NAME;
const refIndexName = process.env.INDEX_REF_NAME;


exports.createItem = async (item, userId) => {
    const { listId, title, completed } = item;
    const itemId = uuidv4();
    const currentDateTime = new Date();

    const params = {
        TableName : tableName,
        Item: {
            pk: `${userId}#${listId}`,
            sk: `${currentDateTime.getTime()}#${itemId}`,
            refId: `${listId}#${itemId}`,
            itemId,
            listId,
            userId: userId,
            title,
            completed,
            createdAt: currentDateTime.toISOString(),
            modifiedAt: currentDateTime.toISOString(),
        }
    };

    await docClient.put(params).promise();

    return params.Item;
};

exports.getItems = async (listId, userId) => {
    const params = {
        TableName: tableName,
        IndexName: refIndexName,
        ProjectionExpression:"pk, sk, itemId, listId, title, completed, createdAt, modifiedAt",
        KeyConditionExpression: "userId = :userId and begins_with(refId,:refId)",
        ExpressionAttributeValues: {
            ":userId": userId,
            ":refId": `${listId}#`
        },
        Select: 'SPECIFIC_ATTRIBUTES',
    };

    const result = await docClient.query(params).promise();
    return result.Items;
};

exports.getListItemsCount = async (listId, userId) => {
    const params = {
        TableName: tableName,
        IndexName: refIndexName,
        KeyConditionExpression: "userId = :userId and begins_with(refId,:refId)",
        ExpressionAttributeValues: {
            ":userId": userId,
            ":refId": `${listId}#`
        },
        Select: 'COUNT',
    };

    const result = await docClient.query(params).promise();
    return result.Count;
};

exports.getItem = async (id, listId, userId) => {
    const params = {
        TableName: tableName,
        IndexName: refIndexName,
        ProjectionExpression:"pk, sk, itemId, listId, title, completed, createdAt, modifiedAt",
        KeyConditionExpression: "userId = :userId and refId = :refId",
        ExpressionAttributeValues: {
            ":userId": userId,
            ":refId": `${listId}#${id}`,
        },
        Select: 'SPECIFIC_ATTRIBUTES',
        Limit: 1,
    };

    const result = await docClient.query(params).promise();

    return result.Items[0];
};

exports.updateItem = async (item) => {
    console.log(item);
    const dateTimeNow = (new Date()).toISOString();
    const params = {
        TableName: tableName,
        Key : {
            pk: item.pk,
            sk: item.sk,
        },
        UpdateExpression: "SET title = :title, completed = :completed, modifiedAt = :modifiedAt",
        ExpressionAttributeValues: {
            ":title": item.title,
            ":completed": item.completed,
            ":modifiedAt": dateTimeNow,
        },
    };

    await docClient.update(params).promise();

    return item;
};
