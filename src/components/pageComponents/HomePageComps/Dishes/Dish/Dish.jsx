import { useNavigate } from "react-router-dom";
import styles from "./dish.module.css";

const Dish = ({dish}) => {
    const { price, image, title, ingredients } = dish;

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/dish/${dish._id}`, { state: dish });
    };

    return (

            <div className={styles.dish}>
                <div className={styles.imageContainer} onClick={handleClick}>
                    <img src={image} className={styles.dishImage}  />
                    <p className={styles.dishImageTitle}>{title}</p>
                </div>
            </div>

    );
}

export default Dish;