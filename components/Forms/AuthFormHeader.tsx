import styles from '../../styles/Forms.module.css'

interface Props {
  title: String
  subtitle: String
  customStyles?: Object
}

const FormHeader = ({ title, subtitle, customStyles }: Props) => {
  return (
    <section
      id='form-header'
      className={styles.auth_form_section}
      style={customStyles}
    >
      <div className={styles.auth_form_header}>
        <h1 className={styles.auth_form_title}>{title}</h1>
        <h2 className={styles.auth_form_subtitle}>{subtitle}</h2>
      </div>
    </section>
  )
}

export default FormHeader
