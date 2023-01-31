import { ReactNode } from 'react'
import s from './modal.module.css'

type ModalProps = {
    children?: ReactNode,
    visible: boolean,
    onShadowClick?: () => void,
}

export function Modal(props: ModalProps) {

    const classes = [s['modal']]
    if (props.visible) classes.push(s['visible'])

    return (
        <div className={classes.join(' ')} onClick={props?.onShadowClick}>
            <div className={s.content} onClick={(e) => e.stopPropagation()}>
                {props?.children}
            </div>
        </div>
    )
}