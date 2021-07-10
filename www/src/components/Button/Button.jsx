import React, { useState } from 'react'
import styled from "@emotion/styled/macro";

const Button = ({onClick, children, className}) => {
    const [disabled, setDisabled] = useState(false);

    const handleClick = async (event) => {
        if (!onClick) {
            return;
        }
        setDisabled(true);

        await onClick(event.target.value);

        setDisabled(false);
    }

    return (
        <StyledButton onClick={handleClick} disabled={disabled} className={className}>{children}</StyledButton>
    )
}

export default Button

const StyledButton= styled.button`
  min-width: 20px;
  align-self: center;
  justify-self: center;
  background-color: #282c34; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  &:hover,&:focus { background-color: #3a3f47 }
`;
