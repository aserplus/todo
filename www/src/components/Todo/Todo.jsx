import React, {useEffect, useState} from 'react'
import styled from "@emotion/styled/macro";
import {API, graphqlOperation} from "aws-amplify";
import {createItem, updateItem} from "../../graphql/mutations";
import TextInput from "../TextInput";
import Button from "../Button";

const Todo = ({ todo }) => {
    const [items, setItemsState] = useState(todo.items);
    useEffect(() => { setItemsState(todo.items)}, [todo] )
    const handleChange = async (value) => {
        try {
            const itemData = await API.graphql(graphqlOperation(createItem, {listId: todo.id, title: value}));
            const item = itemData.data.createItem;
            if (!item) {
                return;
            }
            setItemsState([item, ...items]);

        } catch (err) { console.log(err) }
    }

    const handleCompleteItem = async (id) => {
        try {
            const itemData = await API.graphql(graphqlOperation(updateItem, { id, listId: todo.id, completed: true }));
            const updatedItem = itemData.data.updateItem;
            if (!updatedItem) {
                return;
            }
            const updatedItems = [];
            items.forEach(item => {
                if (item.id !== id){
                    updatedItems.push(item);
                }
            })

            updatedItems.push(updatedItem);
            setItemsState(updatedItems);

        } catch (err) { console.log(err) }
    }

    return (
        <>
            <h2>
                {todo.title}
            </h2>
            <StyledTextInput placeholder="Add new item" onChange={handleChange} />
            {
                (items.length === 0) && <StyledPNoTodos>No items</StyledPNoTodos>
            }
            {
                items.map((item) => (
                    <StyledArticle key={item.id}>
                        <StyledP completed={item.completed}>{item.title}</StyledP>
                        { !item.completed && <Button onClick={()=>handleCompleteItem(item.id)}>Competed</Button> }
                    </StyledArticle>
                ))
            }
        </>
    )
}

export default Todo

//#region Styles
const StyledTextInput = styled(TextInput)`
  margin-bottom: 10px;
`;

const StyledArticle = styled.article`
  background-color: white;
  padding: 5px 10px 5px 10px;
  margin: 0 0 10px 0;
  display: flex;
  flex-wrap: wrap;
`;

const StyledP = styled.p`
  flex: 1;
  text-decoration: ${props => props.completed ? 'line-through': 'none'};
  color: ${props => props.completed ? 'grey': 'none'};
`;

const StyledPNoTodos= styled.p`
  align-self: center;
`;

//#endregion