const { getLists } = require('./listRepository');

exports.getListsHandler = async (context) => {
    const userId = context.identity.sub;

    const lists = await getLists(userId);
    if (!lists || lists.length === 0) {
        console.log(`USER_ID:${userId} - No lists found`);
        return;
    }

    console.log(`USER_ID:${userId} - ${lists.length} lists returned`);

    return lists.map(list => ({
        id: list.listId,
        title: list.title,
        createdAt: list.createdAt,
        modifiedAt: list.modifiedAt,
    }));
};
