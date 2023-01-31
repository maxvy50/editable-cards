import { PropsWithChildren } from "react"
import s from "./buttonGroup.module.css"

interface ButtonGroupProps extends PropsWithChildren {
    gap?: string
}

export function ButtonGroup({ children, gap }: ButtonGroupProps) {
    return (
        <div className={s.container} style={{gap: gap}}>
            {children}
        </div>
    )
}