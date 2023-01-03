import { useState } from 'react'
import Image from 'next/image'
import styles from '../../styles/Forms.module.css'
import { SignIn, SignUp, AuthFormLogo } from '../../components'

interface TargetAuthForm {
  signIn: boolean
  signUp: boolean
}

const Index = () => {
  const [authForm, setAuthForm] = useState<TargetAuthForm>({
    signIn: true,
    signUp: false
  })

  // Const toggle active form
  const toggleActiveForm = (target: string): void => {
    const newState: TargetAuthForm = {
      signIn: false,
      signUp: false
    }

    for (const prop in authForm) {
      if (prop === target) {
        newState[prop] = true
      } else {
        newState[prop] = false
      }
    }

    setAuthForm(newState)
  }

  return (
    <div className={styles.auth_container}>
      <div className={styles.auth_form}>
        <AuthFormLogo logoUrl='logo' />
        {authForm.signIn && (
          <SignIn toggleAction={() => toggleActiveForm('signUp')} />
        )}
        {authForm.signUp && (
          <SignUp toggleAction={() => toggleActiveForm('signIn')} />
        )}
      </div>
    </div>
  )
}

export default Index
