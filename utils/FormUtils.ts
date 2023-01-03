import generalFormatter from 'general-formatter'
import { SignInForm, SignUpForm } from '../types'

interface ValidateInputResponse {
  form: SignInForm | SignUpForm | Object
  hasErrors: boolean
}

/**
 * @description Validates all the inputs passed in the form object and sets the validated form in the form state
 * @param {Object} form
 * @param {CallableFunction} stateSetter
 * @returns {ValidateInputResponse} Response object containing validated form with the found errors, and the isValid boolean
 */
export const validateAuthInputs = (
  form: SignInForm | SignUpForm,
  stateSetter: CallableFunction
): ValidateInputResponse => {
  let hasErrors: boolean = false

  const validatedForm: Object = {}

  for (const key in form) {
    validatedForm[key] = form[key]

    if (validatedForm[key].required) {
      // Validate strings
      if (validatedForm[key].type.includes('string')) {
        if (validatedForm[key].value.trim() === '') {
          validatedForm[key].error = 'Required'
          hasErrors = true
        }
      }

      // Validate email
      if (
        validatedForm[key].type.includes('email') &&
        validatedForm[key].value.trim() !== ''
      ) {
        if (!generalFormatter.validateEmailFormat(validatedForm[key].value)) {
          validatedForm[key].error = 'Invalid email'
          hasErrors = true
        }
      }
    }
  }

  // Set new state for the form
  stateSetter(validatedForm)

  return {
    form: validatedForm,
    hasErrors
  }
}

/**
 * @description Handle input changes by passing event, form and form state setter
 * @param {React.ChangeEvent<HTMLInputElement>} e
 * @param {Object} form - state
 * @param {CallableFunction} stateSetter - setState
 * @returns {void} void
 */
export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  form: Object,
  stateSetter: CallableFunction
): void => {
  const { name, value } = e.target

  const newKeyData = form[name]
  newKeyData.value = value
  newKeyData.error = ''

  stateSetter((prev: any) => ({ ...prev, [name]: newKeyData }))
}
