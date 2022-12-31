interface ValidateInputResponse {
  form: Object
  isValid: boolean
}

/**
 * @description Validates all the inputs passed in the form object and sets the validated form in the form state
 * @param {Object} form
 * @param {CallableFunction} stateSetter
 * @returns {ValidateInputResponse} Response object containing validated form with the found errors, and the isValid boolean
 */
export const validateInputs = (
  form: Object,
  stateSetter: CallableFunction
): ValidateInputResponse => {
  let isValid: boolean = true

  const validatedForm: Object = {}

  for (const key in form) {
    validatedForm[key] = form[key]

    if (form[key].required) {
      if (form[key].type.includes('string')) {
        if (form[key].value.trim() === '') {
          form[key].error = 'Required'
        }
      }
    }
  }

  // Set new state for the form
  stateSetter(validatedForm)

  return {
    form: validatedForm,
    isValid
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
