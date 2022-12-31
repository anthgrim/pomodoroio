import styles from '../../styles/Forms.module.css'
import { useState } from 'react'
import { AuthFormHeader, Input } from '../index'
import { AuthFormProps, FormInput } from '../../types'
import { validateInputs, handleInputChange } from '../../utils/FormUtils'

interface FormData {
  email: FormInput
  password: FormInput
}

const SignIn = ({ target, buttonTitle, toggleAction }: AuthFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    email: {
      value: '',
      error: '',
      type: ['string'],
      required: true
    },
    password: {
      value: '',
      error: '',
      type: ['string'],
      required: true
    }
  })

  return (
    <form className={styles.auth_form}>
      <section id='logo' className={styles.auth_form_section}>
        Logo
      </section>

      <AuthFormHeader title='Sign In' subtitle='Welcome back!' />

      <section id='inputs' className={styles.auth_form_section}>
        <Input
          label='Email'
          inputName='email'
          value={formData.email.value}
          type='text'
          errorMessage={formData.email.error}
          handleChange={(e) => handleInputChange(e, formData, setFormData)}
          placeholder='Email Address'
        />
        <Input
          label='Password'
          inputName='password'
          value={formData.password.value}
          type='password'
          errorMessage={formData.password.error}
          handleChange={(e) => handleInputChange(e, formData, setFormData)}
          placeholder='Password'
        />
      </section>

      <section className={styles.auth_form_section}>Next Auth</section>
    </form>
  )
}

export default SignIn
