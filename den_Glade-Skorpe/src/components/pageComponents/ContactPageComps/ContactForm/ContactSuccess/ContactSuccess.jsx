import styles from "./contactSuccess.module.css"
import { FaXmark } from "react-icons/fa6";

const ContactSuccess = ({name, onClose}) => {
    return(
        <section className={styles.successContainer}>
            <FaXmark className={styles.closeButton} onClick={onClose}/>
            <div className={styles.successMessage}>
                <h2>Tak for din besked {name}!</h2>
                <h2>Vi vender tilbage hurtigst muligt.</h2>
            </div>
        </section>
    )
}

export default ContactSuccess;