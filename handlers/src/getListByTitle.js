const { getListByTitle } = require('./listRepository');
const { getItems } = require('./itemRepository');

exports.getListByTitleHandler = async (context) => {
    const userId = context.identity.sub;
    const { title } = context.arguments;

    if (!title) {
        throw new Error('A title is required');
    }

    if (title.length > 1024) {
        throw new Error('A title must be less or equal to 1024 character length');
    }

    const list = await getListByTitle(title, userId);
    if (!list) {
        console.log(`USER_ID:${userId} - No list found`);
        return;
    }

    const items = await getItems(list.listId, userId);

    console.log(`USER_ID:${userId} - List (${list.listId}) and ${items.length} items returned`);

    return {
        id: list.listId,
        title: list.title,
        items: items.map(item => {
            return {
                id: item.itemId,
                listId: item.listId,
                title: item.title,
                completed: item.completed,
                createdAt: item.createdAt,
                modifiedAt: item.modifiedAt,
            }
        }),
        createdAt: list.createdAt,
        modifiedAt: list.modifiedAt,
    };
};
