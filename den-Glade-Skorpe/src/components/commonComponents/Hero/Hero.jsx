import styles from "./hero.module.css"

const Hero = ({title}) => {
    return(
        <section className={styles.heroContainer}>
            <div className={styles.content}>
                <h4 className={styles.smallerText}>DEN</h4>
                <h2 className={styles.biggerText}>GLADE</h2>
                <h4 className={styles.smallerText}>{title}</h4>
            </div>
        </section>
    )
}

export default Hero;