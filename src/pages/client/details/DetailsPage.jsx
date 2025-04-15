import { useLocation } from "react-router-dom";
import Hero from "../../../components/commonComponents/Hero/Hero";
import { useState } from "react";
import styles from "./detailsPage.module.css";
import TitleComp from "../../../components/commonComponents/TitleComp/TitleComp";
import { useLocalStorage } from "@uidotdev/usehooks";

const DetailsPage = () => {
  const { state: dish } = useLocation();
  const [size, setSize] = useState("normal"); //Contains the size of the dish. Normal as default, as every dish has a normal size
  const [cart, setCart] = useLocalStorage("cart", []); //Contains the dishes that the user has added to their cart.
  const [addedToCart, setAddedToCart] = useState(false); //Boolean that decides whether a dish was added to cart. Used for a user friendly message, letting them know it was added.

  if (!dish) {
    return <div>Error: No data found for this dish.</div>;
  }

  // Checks if a dish has both a normal and family size
  const hasMultipleSizes = dish.price.normal && dish.price.family;

  const addToCart = () => {
    setCart((prevCart) => {
      // Checks if the item with the same ID and size already exists in the cart
      const existingItemIndex = prevCart.findIndex(
        (item) => item._id === dish._id && item.size === size
      );

      if (existingItemIndex !== -1) {
        // If the item with the same ID and size already exists, we update its' quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        // If the item doesn't exist, we add it to the cart,
        return [...prevCart, { ...dish, size, quantity: 1 }];
      }
    });

    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  return (
    <section>
      <Hero title={dish.title} />
      <div>
        <div className={styles.center}>
          <img src={dish.image} className={styles.dishImage} />
        </div>
        <div className={styles.dishInfo}>
          <p className={styles.dishTitle}>{dish.title}</p>
          {/* Puts the ingredients on their own line by mapping a <p> */}
          {dish.ingredients.map((ingredient, index) => (
            <p key={index} className={styles.dishIngredients}>
              {ingredient}
            </p>
          ))}
        </div>

        {/* If a dish has multiple sizes, it displays a select where you can choose a size of said dish. Otherwise it's not displayed at all. */}
        {hasMultipleSizes && (
          <>
            <TitleComp title={"Vælg størrelse"} />
            <div className={styles.center}>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className={styles.dishSize}
              >
                <option value="normal">Normal</option>
                <option value="family">Family</option>
              </select>
            </div>
          </>
        )}

        <h1 className={styles.dishPriceText}>Pris</h1>
        <p className={styles.dishPrice}>{dish.price[size]},-</p>

        <div className={styles.center}>
          <button className={styles.dishToCart} onClick={addToCart}>
            Tilføj {dish.title} til kurven
          </button>
        </div>

        {addedToCart && (
          <p className={styles.successfullyAdded}>
            {" "}
            {dish.title} er blevet tilføjet til kurven!
          </p>
        )}
      </div>
    </section>
  );
};

export default DetailsPage;
