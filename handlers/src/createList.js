const { createList } = require('./listRepository');

exports.createListHandler = async (context) => {
    const userId = context.identity.sub;
    const { title } = context.arguments;

    if (!title) {
        throw new Error('A title is required');
    }

    if (title.length > 1024) {
        throw new Error('A title must be less or equal to 1024 character length');
    }

    const newList = await createList({ title }, userId);

    console.log(`USER_ID:${userId} - New list (${newList.listId}) created`);

    return { 
        id: newList.listId,
        title: newList.title,
        createdAt: newList.createdAt,
        modifiedAt: newList.modifiedAt,
    };
};
