export interface AuthFormProps {
  toggleAction: MouseEventHandler<HTMLSpanElement>
}

export interface FormInput {
  value: string
  error: string
  type: Array<string>
  required: boolean
  min?: number
  max?: number
}

export interface SignInForm {
  email: FormInput
  password: FormInput
}

export interface SignUpForm {
  name: FormInput
  email: FormInput
  password: FormInput
  confirmPassword: FormInput
}
