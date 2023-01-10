import styles from '../../styles/Forms.module.css'
import React, { MouseEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import { AuthFormHeader, Input, Button, Meta } from '../index'
import { AuthFormProps, SignInForm } from '../../types'
import axios from 'axios'
import { validateAuthInputs, handleInputChange } from '../../utils/FormUtils'

const SignIn = ({ toggleAction }: AuthFormProps) => {
  const [formData, setFormData] = useState<SignInForm>({
    email: {
      value: '',
      error: '',
      type: ['string', 'email'],
      required: true
    },
    password: {
      value: '',
      error: '',
      type: ['string'],
      required: true
    }
  })

  // Handle Sign In
  const handleSignIn = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      // Validate form data
      const formValidation = validateAuthInputs(formData, setFormData)

      if (formValidation.hasErrors) return

      const { email, password } = formData

      // Create sign in payload
      const signInPayload = {
        email: email.value.trim().toLowerCase(),
        password: password.value.trim()
      }

      const res = await axios.post('/api/user/signIn', signInPayload)

      console.log(res)
    } catch (error) {
      console.log(error)
      return
    }
  }

  return (
    <>
      <Meta title='Sign In - Pomodoro.io' />
      <form id='sign-in-form'>
        {/* Form header */}
        <AuthFormHeader title='Sign In' subtitle='Welcome back!' />

        {/* Form Inputs */}
        <section id='inputs' className={styles.auth_form_section}>
          <Input
            customStyles={{ width: '300px' }}
            label='Email'
            inputName='email'
            value={formData.email.value}
            type='text'
            errorMessage={formData.email.error}
            handleChange={(e) => handleInputChange(e, formData, setFormData)}
            placeholder='Email Address'
          />
          <Input
            customStyles={{ width: '300px' }}
            label='Password'
            inputName='password'
            value={formData.password.value}
            type='password'
            errorMessage={formData.password.error}
            handleChange={(e) => handleInputChange(e, formData, setFormData)}
            placeholder='Password'
          />
        </section>

        {/* Form Button */}
        <section id='actions' className={styles.auth_form_section}>
          <Button
            text='Sign In'
            action={(e) => handleSignIn(e)}
            customStyles={{ marginBottom: '15px' }}
          />
          <div>
            <span>
              No account yet?{' '}
              <span className={styles.link_span} onClick={toggleAction}>
                Sign up here
              </span>
            </span>
          </div>
        </section>

        {/* Next Auth Button */}
        <section className={styles.auth_form_section}>
          <Button text='Sign In with GitHub' action={signIn} />
        </section>
      </form>
    </>
  )
}

export default SignIn
