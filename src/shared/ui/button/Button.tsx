import s from './button.module.css'
import editIcon from "shared/assets/edit_icon.svg"
import deleteIcon from "shared/assets/delete_icon.svg"

interface ButtonProps extends 
                    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
                    React.AriaAttributes {
    appearance?: "toggled" | "accept" | "icon" | "outlined"
}

export function Button({ children, appearance, ...props }: ButtonProps) {

    const classes = [s.button]
    if (appearance) 
        classes.push(s[appearance])
    else
        classes.push(s["default"])

    return (
        <button className={classes.join(" ")} {...props}>
            {children}
        </button>
    )
}

export { editIcon, deleteIcon }
