import { useSession, signIn, signOut } from 'next-auth/react'

const LoginButton = () => {
  const { data: session } = useSession()

  return (
    <>
      {session ? (
        <>
          Signed in as {session?.user?.email} <br />
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign In</button>
        </>
      )}
    </>
  )
}

export default LoginButton
