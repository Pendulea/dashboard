import BackgroundShadow from './background-shadow'

interface IProps {
    onClose: () => void
    children:  React.ReactNode
}

const Modal = (props: IProps) => {
    return (
        <div style={{position: 'fixed', zIndex: 1000, width: '100%', height: '100%', top: 0, left: 0}}>
            <BackgroundShadow onClick={props.onClose} />
            <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', zIndex: 1001}}>
                <div style={{zIndex: 1002}}>
                    {props.children}
                </div>
            </div>
        </div>
    )

}

export default Modal