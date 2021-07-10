const { v4: uuidv4 } = require('uuid');
const dynamodb = require('aws-sdk/clients/dynamodb');

const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const tableName = process.env.TABLE_NAME;
const refIndexName = process.env.INDEX_REF_NAME;


exports.createList = async (list, userId) => {
    const { title } = list;
    const listId = uuidv4();
    const dateTimeNow = (new Date()).toISOString();
    const sk = title.toLowerCase();
    const params = {
        TableName : tableName,
        Item: {
            pk: userId,
            sk,
            refId: listId,
            listId,
            userId: userId,
            title,
            createdAt: dateTimeNow,
            modifiedAt: dateTimeNow,
        },
        ConditionExpression: "pk <> :pk and sk <> :sk",
        ExpressionAttributeValues: {
            ":pk": userId,
            ":sk": sk,
        },
    };

    await docClient.put(params).promise();

    return params.Item;
};


exports.getListAndItems = async (listId, userId) => {
    const params = {
        TableName: tableName,
        IndexName: refIndexName,
        ProjectionExpression:"pk, sk, itemId, listId, title, completed, createdAt, modifiedAt",
        KeyConditionExpression: "userId = :userId and begins_with(refId,:refId)",
        ExpressionAttributeValues: {
            ":userId": userId,
            ":refId": listId
        },
        Select: 'SPECIFIC_ATTRIBUTES',
    };

    const result = await docClient.query(params).promise();

    return result.Items;
};

exports.getLists = async (userId) => {
    const params = {
        TableName: tableName,
        ProjectionExpression:"pk, sk, listId, title, createdAt, modifiedAt",
        KeyConditionExpression: "pk = :pk",
        ExpressionAttributeValues: {
            ":pk": userId,
        },
        Select: 'SPECIFIC_ATTRIBUTES',
    };

    const result = await docClient.query(params).promise();

    return result.Items;
};

exports.getListByTitle = async (title, userId) => {
    const result = await docClient.get({
        TableName: tableName,
        Key: {
            pk: userId,
            sk: title.toLowerCase(),
        },
    }).promise();

    return result.Item;
};


exports.deleteListAndItems = async (listItems) => {
    const batchItemsToDelete = [];
    let itemsToDelete = [];
    let currentBatchCount = 0;

    listItems.forEach((listItem) => {
        itemsToDelete.push({
            DeleteRequest : {
                Key : {
                    pk: listItem.pk,
                    sk: listItem.sk,
                }
            }
        });

        currentBatchCount++;

        if (currentBatchCount % 25 === 0) {
            batchItemsToDelete.push({
                RequestItems : {
                    [tableName] : [...itemsToDelete]
                }
            });

            itemsToDelete = [];
            currentBatchCount = 0;
        }
    });

    batchItemsToDelete.push({
        RequestItems : {
            [tableName] : [...itemsToDelete]
        }
    });

    for (const batch of batchItemsToDelete) {
        await docClient.batchWrite(batch).promise();
    }
};


