const { getItem, updateItem } = require('./itemRepository');

exports.updateItemHandler = async (context) => {
    const userId = context.identity.sub;
    const { id, listId, title, completed, } = context.arguments;

    const item = await getItem(id, listId, userId);
    if (!item) {
        throw new Error('Item does not exist');
    }

    const updatedItem = await updateItem({
        ...item,
        title: title || item.title,
        completed: completed != null ? completed : item.completed,
    });

    console.log(`USER_ID:${userId} - Item (${updatedItem.itemId}) updated in list (${updatedItem.listId})`);

    return {
        id: updatedItem.itemId,
        listId: updatedItem.listId,
        title: updatedItem.title,
        completed: updatedItem.completed,
        createdAt: updatedItem.createdAt,
        modifiedAt: updatedItem.modifiedAt,
    };
};
