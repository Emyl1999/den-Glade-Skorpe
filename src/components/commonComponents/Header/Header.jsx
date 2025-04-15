import { Link } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import styles from "./header.module.css";
import { useLocalStorage } from "@uidotdev/usehooks";

//Header component
const Header = () => {
  const [cart] = useLocalStorage("cart", []);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles.header}>
      <Link to="/">
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </Link>
      <div className={styles.rightSide}>
        <Link to="/basket" className={styles.cartContainer}>
          <img src="/basket_icon.png" alt="" className={styles.cartIcon}/>
          {totalQuantity > 0 && (
            <span className={styles.cartQuantity}>{totalQuantity}</span>
          )}
        </Link>
        <Navigation />
      </div>
    </div>
  );
};

export default Header;
