import  { useState } from 'react';
import styled from "styled-components";

const MenuSelect = (props: Props) => {
    const { menu, defaultSelectedIndex, onChangeMenu, style, size, mode, locked} = props
    const [indexSelected, setIndexSelected] = useState(defaultSelectedIndex)

    const onClickMenu = (index: number) => {
        if (!locked){
            setIndexSelected(index)
        }
        !!onChangeMenu && onChangeMenu(index)
    }

    const getCellStyle = () => {
        if (size === 'small'){
            return {
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 4,
                paddingBottom: 4
            }
        } else {
            return {
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 5,
                paddingBottom: 5
            }
        }
    }

    const getTextStyle = () => {
        if (size === 'small'){
            return {
                fontSize: 11
            }
        } else {
            return {
                fontSize: 13
            }
        }
    }

    const getIconStyle = () => {
        if (size === 'small'){
            return {
                height: 13,
                width: 13
            }
        }
        return {
            height: 16,
            width: 16
        }
    }

    const getLeftMenuStyle = () => {
        const isHorizontal = mode === 'horizontal'
        return {
            borderTop: '1px solid #DDDDDD',
            borderLeft: '1px solid #DDDDDD',
            borderRight: '1px solid #DDDDDD',
            borderBottom: isHorizontal ? '1px solid #DDDDDD' : undefined,
            borderTopLeftRadius: 3,
            borderTopRightRadius: isHorizontal ? undefined : 3,
            borderBottomLeftRadius: isHorizontal ? 3 : undefined,
        }
    }

    const getRightMenuStyle = () => {
        const isHorizontal = mode === 'horizontal'
        return {
            borderTop: '1px solid #DDDDDD',
            borderRight: '1px solid #DDDDDD',
            borderLeft: '1px solid #DDDDDD',
            borderBottom: '1px solid #DDDDDD',
            borderTopRightRadius: isHorizontal ? 3 : 0,
            borderBottomRightRadius: 3,
            borderBottomLeftRadius: isHorizontal ? undefined : 3,
        }
    }

    const getCenterMenuStyle = () => {
        const isHorizontal = mode === 'horizontal'
        return {
            borderTop: '1px solid #DDDDDD',
            borderRight: isHorizontal ? undefined : '1px solid #DDDDDD',
            borderLeft: '1px solid #DDDDDD',
            borderBottom: isHorizontal ? '1px solid #DDDDDD' : undefined,
        }
    }

    const selectedStyle = {backgroundColor: '#111111', text: 'white'}
    const unSelectedStyle = {WebkitFilter: 'grayscale(100%)', filter: 'grayscale(100%)', opacity: 0.5 }
    return (
        <Container className="noselect" style={Object.assign({}, style, {flexDirection: mode === 'horizontal' ? 'row' : 'column'})}>
            {menu.map((line, index) => {
                const {type, content} = line
                
                let inside = null
                if (type === 'text')
                    inside = <Text style={getTextStyle()}>{content}</Text>
                else 
                    inside = <img src={content} style={getIconStyle()} alt={''} />

                if (index === 0){
                    return <CaseContainer 
                            key={index} 
                            style={Object.assign({}, getCellStyle(), indexSelected === index ? selectedStyle : unSelectedStyle, getLeftMenuStyle())} 
                            onClick={() => onClickMenu(index)} >{inside}</CaseContainer>
                }
                if (menu.length === index+1){
                    return <CaseContainer 
                        key={index} 
                        style={Object.assign({}, getCellStyle(), indexSelected === index ? selectedStyle : unSelectedStyle, getRightMenuStyle())} 
                        onClick={() => onClickMenu(index)}>{inside}</CaseContainer>
                }
                return <CaseContainer 
                    key={index} 
                    style={Object.assign({}, getCellStyle(), indexSelected === index ? selectedStyle : unSelectedStyle, getCenterMenuStyle())} 
                    onClick={() => onClickMenu(index)}>{inside}</CaseContainer>                   
            })}
        </Container>
        )
}

interface IMenuSection {
    type: 'text' | 'image'
    content: string
}

interface Props {
    mode: 'horizontal' | 'vertical'
    size: 'big' | 'small'
    locked?: boolean
    menu: IMenuSection[]
    defaultSelectedIndex?: number
    onChangeMenu?: (index: number) => any,
    style?: any
}

MenuSelect.defaultProps = {
    defaultSelectedIndex: 0,
    style: {},
    size: 'small',
    mode: 'horizontal'
} 

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const CaseContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;


const Text = styled.span`
    font-weight: 600;
    text-transform: uppercase;
    color: 'white';
`;



export default MenuSelect