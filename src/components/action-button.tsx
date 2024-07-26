import styled from 'styled-components'
import { BLACK, CLEAR_BLACK } from '../constants'
import Loading from './loader'

const ActionButton = (props: IProps) => {
    const { loading, icon , disabled, iconStyle} =props

    const size = props.size || 'big'
    const isBig = size === 'big'


    let fontSize = isBig ? 11.5 : 10
    let title = props.title.trim()
    if (title.length > 8)
        fontSize = isBig ? 11 : 9
    if (title.length > 10)
        fontSize = isBig ? 10 : 8
    if (title.length > 12)
        fontSize = isBig ? 9 : 8
    if (title.length > 14)
        fontSize = isBig ? 8 : 7
        if (title.length > 16)
        fontSize = 7

    const iconSize = props.iconSize  || 'regular'
    let iconSizeValue = '50%'
    if (iconSize === 'small')
        iconSizeValue = '40%'
    if (iconSize === 'large')
        iconSizeValue = '60%'

    return (
        <IconApp className="noselect" style={props.style} isLoading={loading || disabled} onClick={() => !loading && !disabled  && props.onClick && props.onClick()}>
            <ImgWrapper style={{width: isBig ? 40 : 30, height: isBig ? 40 : 30, borderRadius: isBig ? 8 : 6}} isLoading={loading || disabled}>
            {!loading && <img style={Object.assign({width: iconSizeValue, height: iconSizeValue}, iconStyle)} src={`/images/${icon}`}/>}
            {loading && <Loading size={isBig ? 20 : 15} />}
            </ImgWrapper>
            {title && <span style={{fontSize, marginTop: isBig? 4 :3}}>{title}</span>}
        </IconApp>
    )
}

interface IProps {
    loading?: boolean
    onClick?: () => void
    title: string
    icon: string
    iconSize?: 'small' | 'large' | 'regular'
    style?: any
    iconStyle?: any
    size?: 'big' | 'small'
    disabled?: boolean
}

const ImgWrapper = styled.div<any>`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.isLoading ? CLEAR_BLACK : BLACK} ;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.09);
    transition: transform .2s; /* Animation */
    :hover {
        transform: ${props => props.isLoading ? 'none' : 'scale(0.9)'};
    }
`

const IconApp = styled.div<any>`

    cursor: ${props => props.isLoading ? 'default' : 'pointer'};
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
        color: 'white';
        font-weight: 500;
    }
`
export default ActionButton