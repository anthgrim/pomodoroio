import { ChangeEventHandler } from 'react'
import styles from '../../styles/Inputs.module.css'

interface Props {
  label: string
  inputName: string
  value: string
  type: string
  errorMessage: string
  handleChange: ChangeEventHandler<HTMLInputElement>
  placeholder: string
  min?: number
  max?: number
  disabled?: boolean
  customStyles?: object
}

const Input = ({
  label,
  inputName,
  value,
  type,
  errorMessage,
  handleChange,
  placeholder,
  min,
  max,
  disabled,
  customStyles
}: Props) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={inputName}>
        {label}
      </label>
      <div className={styles.input_container}>
        <input
          className={styles.input}
          style={customStyles}
          id={inputName}
          name={inputName}
          value={value}
          type={type}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete='false'
          disabled={disabled}
          min={min}
          max={max}
        />
        <span className={styles.error}>{errorMessage}</span>
      </div>
    </div>
  )
}

Input.defaultProps = {
  disabled: false,
  customStyles: {},
  min: 0,
  max: 100000
}

export default Input
