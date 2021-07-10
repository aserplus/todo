/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLists = /* GraphQL */ `
  query GetLists {
    getLists {
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
export const getList = /* GraphQL */ `
  query GetList($id: ID!) {
    getList(id: $id) {
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
export const getListByTitle = /* GraphQL */ `
  query GetListByTitle($title: String!) {
    getListByTitle(title: $title) {
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
