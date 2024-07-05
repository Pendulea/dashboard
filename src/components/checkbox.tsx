import React from 'react';
import styled from 'styled-components';
import { WHITE_GREY } from '../constants';

interface IProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    icon?: string;
    style?: any
    iconStyle?: any
    size?: 'small' | 'medium' | 'large'
}

interface StyledProps {
  ischecked: string;
}

const StyledLabel = styled.label`
    color:${WHITE_GREY};
    font-weight: 500;
    text-transform: uppercase;
`;

const StyledInput = styled.input<StyledProps>`
  &:checked {
    background-color: ${props => props.ischecked == "true" ? 'green' : 'white'};
  }
`;

function Checkbox(props: IProps) {

  const size = props.size || 'medium';
  const style = props.style || {};

  const getSize = () => {
    switch (size) {
      case 'small':
        return 10;
      case 'medium':
        return 12.5;
      case 'large':
        return 15;
    }
  }

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 8.5;
      case 'medium':
        return 10;
      case 'large':
        return 12;
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.checked); // Call the parent component's onChange function
  };

  return (
    <div className='noselect' onClick={() =>props.onChange(!props.checked)} style={Object.assign(style, {display:'flex', flexDirection:'row', alignItems: 'center'})}>
    {props.icon && <img style={Object.assign({width: getSize(), height: getSize(), marginRight: getSize() / 3}, props.iconStyle)} src={`/images/${props.icon}`}/>}
    <StyledLabel style={{fontSize: getFontSize()}}>
      {props.label}
    </StyledLabel>
    <StyledInput
        type="checkbox"
        onChange={handleChange}
        checked={props.checked}
        ischecked={props.checked ? "true" : "false"}
        style={{height: getSize(), marginLeft: getSize() / 2.5}}
      />
    </div>
  );
}

export default Checkbox;