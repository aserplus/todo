const { getListAndItems } = require('./listRepository');

exports.getListHandler = async (context) => {
    const userId = context.identity.sub;
    const { id } = context.arguments;

    let listItems = await getListAndItems(id, userId);

    let list;
    const items = [];
    
    listItems.forEach(listItem => {
        if (!listItem.itemId) {
            list = listItem;
            return;
        }

        items.push({
            id: listItem.itemId,
            listId: listItem.listId,
            title: listItem.title,
            completed: listItem.completed,
            createdAt: listItem.createdAt,
            modifiedAt: listItem.modifiedAt,
        });
    });

    console.log(`USER_ID:${userId} - List (${id}) and ${items.length} items returned`);

    return {
        id: list.listId,
        title: list.title,
        items: items,
        createdAt: list.createdAt,
        modifiedAt: list.modifiedAt,
    };
};
