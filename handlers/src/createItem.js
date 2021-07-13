const { createItem, getListItemsCount } = require('./itemRepository');

exports.createItemHandler = async (context) => {
    const userId = context.identity.sub;
    const { listId, title, completed = false } = context.arguments;

    if (!title) {
        throw new Error('A title is required');
    }

    if (title.length > 1024) {
        throw new Error('A title must be less or equal to 1024 character length');
    }

    const count = await getListItemsCount(listId, userId);
    if (count > 1000) {
        console.log(`USER_ID:${userId} - List (${listId}) has ${count} items`);
        throw new Error('A max of 1000 items is allowed in an TODO');
    }

    const newItem = await createItem({
        listId,
        title,
        completed,
    }, userId);

    console.log(`USER_ID:${userId} - New item (${newItem.itemId}) created in List (${listId})`);

    return { 
        id: newItem.itemId,
        listId: newItem.listId,
        title: newItem.title,
        completed: newItem.completed,
        createdAt: newItem.createdAt,
        modifiedAt: newItem.modifiedAt,
    };
};
