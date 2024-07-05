import styled from 'styled-components'
import { DARK_GREY, WHITE_GREY } from '../constants'

const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    padding: 5px;
    border: 1px solid ${DARK_GREY};
    
    ::placeholder {
        color: ${WHITE_GREY}
    }
    :focus {
        border: 1px solid white;
    }

    background: transparent;
    border-radius: 5px;
    font-size: 14px;
    color: white;
`

export default Input