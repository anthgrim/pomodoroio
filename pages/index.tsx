import { Inter } from '@next/font/google'
import { Meta } from '../components'
import styles from '../styles/Home.module.css'
import Router from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Meta title='Pomodoro.io' description='Chill Pomodoro' />
      <main className={styles.main}>
        <button onClick={() => Router.push('/auth')}>Sign In</button>
      </main>
    </>
  )
}
