import React, { useState } from 'react'
import styled from "@emotion/styled/macro";

const TextInput = ({placeholder, onChange, className}) => {
    const [disableInput, setDisableInput] = useState(false);

    const handleKeyUp = async (event) => {
        if (event.key !== 'Enter' || event.target.value.length === 0) {
            return;
        }

        setDisableInput(true);

        await onChange(event.target.value);

        setDisableInput(false);
        event.target.value = '';
        event.preventDefault();
    }

    return (
        <StyledTextInput
            onKeyUp={handleKeyUp}
            placeholder={placeholder}
            disabled={disableInput}
            className={className}
        />
    )
}

export default TextInput

const StyledTextInput = styled.input`
  height: 30px;
  min-width: 200px;
`;
