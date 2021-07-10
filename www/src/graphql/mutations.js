/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createList = /* GraphQL */ `
  mutation CreateList($title: String!) {
    createList(title: $title) {
      id
      title
      items {
        id
        listId
        title
        completed
        createdAt
        modifiedAt
      }
      createdAt
      modifiedAt
    }
  }
`;
export const createItem = /* GraphQL */ `
  mutation CreateItem($listId: ID!, $title: String!, $completed: Boolean) {
    createItem(listId: $listId, title: $title, completed: $completed) {
      id
      listId
      title
      completed
      createdAt
      modifiedAt
    }
  }
`;
export const deleteList = /* GraphQL */ `
  mutation DeleteList($id: ID!) {
    deleteList(id: $id)
  }
`;
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $id: ID!
    $listId: ID!
    $title: String
    $completed: Boolean
  ) {
    updateItem(id: $id, listId: $listId, title: $title, completed: $completed) {
      id
      listId
      title
      completed
      createdAt
      modifiedAt
    }
  }
`;
