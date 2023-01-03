import styles from '../../styles/Forms.module.css'
import React, { MouseEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import { AuthFormHeader, Input, Button, Meta } from '../index'
import { AuthFormProps, SignUpForm } from '../../types'
import { validateAuthInputs, handleInputChange } from '../../utils/FormUtils'

const SignUp = ({ toggleAction }: AuthFormProps) => {
  const [formData, setFormData] = useState<SignUpForm>({
    name: {
      value: '',
      error: '',
      type: ['string'],
      required: true
    },
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
    },
    confirmPassword: {
      value: '',
      error: '',
      type: ['string'],
      required: true
    }
  })

  // Handle Sign In
  const handleSignUp = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      // Validate form data
      const formValidation = validateAuthInputs(formData, setFormData)

      let errors = formValidation.hasErrors

      const { name, email, password, confirmPassword } = formData

      if (confirmPassword.value.trim() !== password.value.trim()) {
        errors = true
      }

      if (errors) return

      // Create sign up payload
      const signUpPayload = {
        name: name.value,
        email: email.value.trim().toLowerCase(),
        password: password.value.trim()
      }

      console.log(signUpPayload)
    } catch (error) {
      console.log(error)
      return
    }
  }

  return (
    <>
      <Meta title='Sign Up - Pomodoro.io' />
      <form id='sign-up-form'>
        {/* Form header */}
        <AuthFormHeader title='Sign Up' subtitle='Welcome!' />

        {/* Form Inputs */}
        <section id='inputs' className={styles.auth_form_section}>
          <Input
            customStyles={{ width: '300px' }}
            label='Name'
            inputName='name'
            value={formData.name.value}
            type='text'
            errorMessage={formData.name.error}
            handleChange={(e) => handleInputChange(e, formData, setFormData)}
            placeholder='Name'
          />
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
          <Input
            customStyles={{ width: '300px' }}
            label='Confirm Password'
            inputName='confirmPassword'
            value={formData.confirmPassword.value}
            type='confirmPassword'
            errorMessage={formData.confirmPassword.error}
            handleChange={(e) => handleInputChange(e, formData, setFormData)}
            placeholder='Confirm Password'
          />
        </section>

        {/* Form Button */}
        <section id='actions' className={styles.auth_form_section}>
          <Button
            text='Sign Up'
            action={(e) => handleSignUp(e)}
            customStyles={{ marginBottom: '15px' }}
          />
          <div>
            <span>
              Already have an account?{' '}
              <span className={styles.link_span} onClick={toggleAction}>
                Sign in here
              </span>
            </span>
          </div>
        </section>

        {/* Next Auth Button */}
        <section className={styles.auth_form_section}>
          <Button text='Sign up with GitHub' action={signIn} />
        </section>
      </form>
    </>
  )
}

export default SignUp
