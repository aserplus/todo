import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { getLists } from '../../graphql/queries';
import {createList, deleteList} from "../../graphql/mutations";
import styled from "@emotion/styled/macro";
import TextInput from "../TextInput";
import Button from "../Button";

const TodoList = ({onClickTodo}) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos()
    }, [])

    const handleCreateList = async (title) => {
        try {
            const todoData = await API.graphql(graphqlOperation(createList, { title }));

            const todo = todoData.data.createList;
            if (!todo) {
                return;
            }
            setTodos([...todos, todo].sort(sortTodos));
        } catch (err) { console.log(err) }
    }

    const handleDeleteList = async (id) => {
        try {
            await API.graphql(graphqlOperation(deleteList, { id }));

            const newTodos = [];
            todos.forEach(todo => {
                if (todo.id === id){
                    return;
                }
                newTodos.push(todo);
            })

            setTodos(newTodos);
        } catch (err) { console.log(err) }
    }

    const fetchTodos = async() => {
        try {
            const todoData = await API.graphql(graphqlOperation(getLists))
            const todos = todoData.data.getLists;
            setTodos(todos || []);
        } catch (err) { console.log(err) }
    }

    return (
        <>
            <h2>My ToDos</h2>
            <StyledTextInput
                onChange={handleCreateList}
                placeholder="Add new list"
            />
            {
                (todos.length === 0) && <StyledPNoTodos>No todos</StyledPNoTodos>
            }
            {
                todos.map((todo) => (
                    <StyledArticle key={todo.id}>
                        <StyledP onClick={() => onClickTodo(todo.id)}>{todo.title}</StyledP>
                        <Button onClick={()=>handleDeleteList(todo.id)}>Delete</Button>
                    </StyledArticle>
                ))
            }
        </>
    )
}

export default TodoList

const sortTodos = (todo1, todo2) => {
    const todo1Title = todo1.title.toLowerCase();
    const todo2Title = todo2.title.toLowerCase();
    if (todo1Title < todo2Title) {
        return -1;
    }
    if (todo1Title > todo2Title) {
        return 1;
    }
    return 0;
};

const StyledArticle = styled.article`
  background-color: white;
  padding: 5px 10px 5px 10px;
  margin: 0 0 10px 0;
  display: flex;
  flex-wrap: wrap;
`;

const StyledTextInput = styled(TextInput)`
  margin-bottom: 10px;
`;

const StyledP = styled.p`
  flex: 1;
  cursor: pointer;
`;

const StyledPNoTodos= styled.p`
  align-self: center;
`;