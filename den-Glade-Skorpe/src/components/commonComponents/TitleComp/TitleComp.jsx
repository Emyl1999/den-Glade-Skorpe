import styles from "./titleComp.module.css";

const TitleComp = ({title}) => {
    return(
        <h1 className={styles.title}>{title}</h1>
    )
}

export default TitleComp;