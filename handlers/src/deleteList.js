const { getListAndItems, deleteListAndItems } = require('./listRepository');

exports.deleteListHandler = async (context) => {
    const userId = context.identity.sub;
    const { id } = context.arguments;

    const listItems = await getListAndItems(id, userId);

    await deleteListAndItems(listItems);

    console.log(`USER_ID:${userId} - List (${id}) is deleted along with ${listItems.length - 1} items`);

    return true;
};
