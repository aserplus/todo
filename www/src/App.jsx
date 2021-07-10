import React, {useState} from 'react';
import styled from '@emotion/styled/macro';
import './App.css';
import TodoList from './components/TodoList';
import {API, graphqlOperation} from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import HeaderTop from "./components/HeaderTop";
import {getList, getListByTitle} from "./graphql/queries";
import Todo from "./components/Todo";
import Button from "./components/Button";
import { amplifyConfigure } from './amplifyConfigure';

amplifyConfigure();

const App = () => {
    const [todo, setTodoState] = useState();

    console.log(process.env.REACT_APP_NOT_SECRET_CODE);
    const handleSearch = async (value) => {
        try {
            // Try to search for a single todo list based on user entered title
            const todoData = await API.graphql(graphqlOperation(getListByTitle, {title: value}));
            const todo = todoData.data.getListByTitle;

            // If no todo list exist then a modal is shown
            if (!todo) {
                window.dialog.showModal();
            } else {
                setTodoState(todo);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleClickTodo = async (id) => {
        try {
            const todoData = await API.graphql(graphqlOperation(getList, {id}));
            const todo = todoData.data.getList;

            if (!todo) {
                window.dialog.showModal();
            } else {
                setTodoState(todo);
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Container>
            <HeaderTop onSearch={handleSearch} />
            <ContentContainer>
                {todo && <Todo todo={todo} />}
                {!todo && <TodoList onClickTodo={handleClickTodo} />}
            </ContentContainer>
            <StyledDialog id="dialog">
                <p>Todo does not exist!</p>
                <form method="dialog">
                    <Button>Close</Button>
                </form>
            </StyledDialog>
        </Container>
    );
};

export default withAuthenticator(App);

//#region Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px 10px 10px;
  width: 50%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  padding: 0 10px 0 10px;
`;

const StyledDialog = styled.dialog`
  border: solid gray 1px;
  border-radius: 3px;
  min-width: 150px;
  text-align: center;
`;
//#endregion
