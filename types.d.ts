export interface AuthFormProps {
  target: string
  buttonTitle: string
  toggleAction: CallableFunction
}

export interface FormInput {
  value: string
  error: string
  type: [string]
  required: boolean
  min?: number
  max?: number
}
