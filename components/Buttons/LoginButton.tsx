import styles from '../../styles/Buttons.module.css'
import { useSession, signIn, signOut } from 'next-auth/react'

const LoginButton = () => {
  const { data: session } = useSession()

  return (
    <>
      {session ? (
        <>
          Signed in as {session?.user?.email} <br />
          <button className={styles.button} onClick={() => signOut()}>
            Sign Out
          </button>
        </>
      ) : (
        <>
          Not signed in <br />
          <button className={styles.button} onClick={() => signIn()}>
            Sign In
          </button>
        </>
      )}
    </>
  )
}

export default LoginButton
