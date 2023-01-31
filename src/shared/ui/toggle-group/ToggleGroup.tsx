import styles from "./toggleGroup.module.css"

export type ToggleGroupOption = {
    label: string
    value: any
}

type ToggleGroupProps = {
    name: string
    options: ToggleGroupOption[]
    value: ToggleGroupOption
    onChange: (value: ToggleGroupOption) => void
    appearance: "vertical" | "horizontal"
}

export function ToggleGroup({ name, options, value, onChange, appearance }: ToggleGroupProps) {

    const classes = [styles.container]
    classes.push(
        appearance === "horizontal"
            ? styles.horizontal
            : styles.vertical
    )

    return (
        <div className={classes.join(" ")}>
            {options.map(o =>
                <label key={o.value}>
                    <input type="radio" name={name}
                        value={o.value}
                        checked={value.value === o.value}
                        onChange={() => onChange(o)}
                    />
                    {o.label}
                </label>
            )}
        </div>
    );
}