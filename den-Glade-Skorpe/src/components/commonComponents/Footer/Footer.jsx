import styles from "./footer.module.css";

const Footer = () => {
    return(
        <section className={styles.footer}>
            <img src="/logo.png" alt="Logo" className={styles.logo} />
            <div className={styles.contactInfo}>
                <p>Email: gladskorpe@pizzaglad.dk</p>
                <p>Tlf: 12345678</p>
                <p>Adresse: Skorpevej 42, 1234 Pizzabyen</p>
            </div>
        </section>
    )
}

export default Footer;