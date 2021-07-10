const { createList } = require('./listRepository');

exports.createListHandler = async (context) => {
    const userId = context.identity.sub;
    const { title } = context.arguments;

    const newList = await createList({ title }, userId);

    console.log(`USER_ID:${userId} - New list (${newList.listId}) created`);

    return { 
        id: newList.listId,
        title: newList.title,
        createdAt: newList.createdAt,
        modifiedAt: newList.modifiedAt,
    };
};
