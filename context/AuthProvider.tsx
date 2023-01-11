import { createContext, useState } from 'react'

interface Context {
  auth?: any
  setAuth?: CallableFunction
}

const context: Context = {}

const AuthContext = createContext(context)

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState('')
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
