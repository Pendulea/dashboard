import styled from 'styled-components'

const BackgroundShadow = (props: any) => {
    return <Container {...props} />
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    opacity: 0.5;
    z-index: 1000;
`

export default BackgroundShadow