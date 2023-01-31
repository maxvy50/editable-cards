import React from 'react'
import s from './input.module.css'

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string
  prefix?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, prefix, ...props }, ref) => {

  const classes = [s.input]
  if (prefix) classes.push(s.shortened)

  return (
    <div className={s.container}>
      <span className={s.label}>{label}</span>
      {prefix &&
        <span className={s.prefix}>
          {prefix}
        </span>}
      <input className={classes.join(" ")}
        ref={ref} {...props}
      />
    </div>
  )
})
