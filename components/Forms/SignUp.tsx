import { AuthFormProps } from '../../types'

const SignUp = ({ target, buttonTitle, toggleAction }: AuthFormProps) => {
  return (
    <>
      <h1>Sign Up</h1>
      <div>
        <span>Already have an account?</span>
        <button onClick={() => toggleAction(target)}>{buttonTitle}</button>
      </div>
    </>
  )
}

export default SignUp
