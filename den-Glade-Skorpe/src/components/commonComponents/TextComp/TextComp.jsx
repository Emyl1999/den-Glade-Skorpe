import styles from "./textComp.module.css";

const TextComp = ({text}) => {
    return(
        <p className={styles.text}>{text}</p>
    )
}

export default TextComp;