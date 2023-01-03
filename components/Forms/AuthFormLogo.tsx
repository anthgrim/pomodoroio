import React from 'react'
import styles from '../../styles/Forms.module.css'

interface Props {
  logoUrl: string
}

const AuthFormLogo = ({ logoUrl }: Props) => {
  return (
    <section id='logo' className={styles.auth_form_section}>
      {logoUrl}
    </section>
  )
}

export default AuthFormLogo
