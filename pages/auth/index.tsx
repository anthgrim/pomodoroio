import { useState } from 'react'
import styles from '../../styles/Forms.module.css'
import { Meta, SignIn, SignUp } from '../../components'

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
    <>
      <Meta title='Sign In - Pomodoro.io' />
      <div className={styles.auth_container}>
        <section id='form'>
          {authForm.signIn && (
            <SignIn
              target={'signUp'}
              buttonTitle={'Sign up here!'}
              toggleAction={toggleActiveForm}
            />
          )}
          {authForm.signUp && (
            <SignUp
              target={'signIn'}
              buttonTitle={'Sign in here!'}
              toggleAction={toggleActiveForm}
            />
          )}
        </section>
        <section id='image'>Image</section>
      </div>
    </>
  )
}

export default Index
