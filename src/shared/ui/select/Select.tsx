import { SyntheticEvent, useEffect, useState } from 'react';
import styles from './select.module.css';


export type SelectOption = {
    label: string,
    value: any 
}
type SingleSelectProps = {
    isMultiple?: false,
    value: SelectOption | null,
    onChange: (value: SelectOption | null) => void
}
type MultiSelectProps = {
    isMultiple: true,
    value: SelectOption[],
    onChange: (value: SelectOption[]) => void
}
type SelectProps = {
    options: SelectOption[]
    label?: string
} & (SingleSelectProps | MultiSelectProps)



export function Select({ isMultiple, value, onChange, options, label }: SelectProps) {

    const [isVisible, setIsVisible] = useState(false);
    const [hoverIndex, setHoverIndex] = useState(0);

    const clearOptions = (e: SyntheticEvent): void => {
        e.stopPropagation();
        isMultiple ? onChange([]) : onChange(value);
    }
    const select = (o: SelectOption, e: SyntheticEvent): void => {
        e.stopPropagation();
        if (isMultiple) {
            if (value.includes(o)) {
                onChange(value.filter(option => o !== option))
            } else {
                onChange([...value, o])
            }
        } else {
            if (o !== value) onChange(o);
        }

    }
    const isSelected = (o: SelectOption): boolean => {
        return isMultiple ? value.includes(o) : o === value;
    }
    const isHover = (index: number): boolean => {
        return index === hoverIndex;
    }
    useEffect(() => {
        if (isVisible) setHoverIndex(0);
    }, [isVisible]);


    return (
        <div className={styles.container}>
            <span className={styles.label}>{label}</span>
            <div className={styles.select}
                tabIndex={0}
                onClick={() => setIsVisible(prev => !prev)}
                onBlur={() => setIsVisible(false)}
            >
                <span className={styles.value}>
                    {isMultiple
                        ? value.map(
                            o => (
                                <button key={o.value}
                                    className={styles['option-badge']}
                                    onClick={(e) => { select(o, e) }}
                                >
                                    {o.label}
                                    <span className={styles['remove-btn']}>&times;</span>
                                </button>)
                        )
                        : (value ? value.label : "---###---")
                    }
                </span>
                {isMultiple && <button className={styles['clear-btn']}
                    onClick={e => { clearOptions(e) }}>&times;</button>}
                <div className={styles.divider}></div>
                <div className={styles.caret}></div>
                <ul className={`${styles.options} ${isVisible ? styles.visible : ''}`}>
                    {options.map((option, i) =>
                        <li key={i}
                            onMouseEnter={() => setHoverIndex(i)}
                            className={`${styles.option} ${isSelected(option) ? styles.selected : ''} ${isHover(i) ? styles.hover : ''}`
                            }
                            onClick={(e) => {
                                select(option, e);
                                setIsVisible(false);
                            }}
                        >
                            {option.label}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}