const { getListByTitle } = require('./listRepository');
const { getItems } = require('./itemRepository');

exports.getListByTitleHandler = async (context) => {
    const { title } = context.arguments;
    const userId = context.identity.sub;

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
