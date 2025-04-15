import styles from "./orderSuccess.module.css"
import { FaXmark } from "react-icons/fa6";

const OrderSuccess = ({onClose}) => {
    return(
        <section className={styles.successContainer}>
            <FaXmark className={styles.closeButton} onClick={onClose}/>
            <div className={styles.successMessage}>
                <h2>Tak for din bestilling!</h2>
            </div>
        </section>
    )
}

export default OrderSuccess;