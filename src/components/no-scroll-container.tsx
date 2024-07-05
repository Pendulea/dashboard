import React, { useEffect, useMemo } from 'react';

const NoScrollWrapper = (props: Props) => {

    const { lock, style } = props
    
    const lockView = () => {
        const e = document.getElementsByTagName("body")[0]
        e.style.overflowY = 'hidden'
        e.style.height = '100%'
        return true        
    }

    const unlockView = () => {
        const e = document.getElementsByTagName("body")[0]
        e.style.overflowY = 'scroll'
        e.style.height = '100%'
        return true        
    }

    useMemo(() => {
        lock === true && lockView() && props.willLock && props.willLock()
        // eslint-disable-next-line
    }, [lock])
    
    useEffect(() => {
        !lock && unlockView() &&props.didUnlock && props.didUnlock()
        // eslint-disable-next-line
    }, [lock])

    return (
        <div style={Object.assign({}, style)}>
            {props.children}
        </div>
    )
}


interface Props {
    lock?: boolean,
    style?: any,
    children:  React.ReactNode
    willLock?: () => any
    didUnlock?: () => any
}

export default NoScrollWrapper