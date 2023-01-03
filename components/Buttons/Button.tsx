import styles from '../../styles/Buttons.module.css'
import React, { MouseEventHandler, useState } from 'react'

interface Props {
  text: string
  action: MouseEventHandler<HTMLButtonElement> | any
  customStyles?: Object
}

const Button = ({ text, action, customStyles }: Props) => {
  return (
    <button className={styles.button} onClick={action} style={customStyles}>
      {text}
    </button>
  )
}

Button.defaultProps = {
  customStyles: {}
}

export default Button
