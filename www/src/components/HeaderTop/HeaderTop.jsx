import React from 'react';
import styled from '@emotion/styled/macro';
import TextInput from "../TextInput";

const HeaderTop = ({onSearch}) => {
    return (
        <HeaderTopContainer>
            <StyledA href={'/'} title={'home'}><StyledH1>ToDo</StyledH1></StyledA>
            <StyledTextInput placeholder="Search" onChange={onSearch} />
        </HeaderTopContainer>
    )
};

export default HeaderTop

//#region Styles
const HeaderTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  background-color: #282c34;
  gap: 10px;
`;

const StyledH1 = styled.h1`
  margin: auto;
  min-width: 140px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
`;

const StyledA = styled.a`
  text-decoration: none;
  flex: 1;
`;

const StyledTextInput = styled(TextInput)`
  height: 30px;
  align-self: end;
  width: 10%;
  min-width: 200px;
`;

//#endregion