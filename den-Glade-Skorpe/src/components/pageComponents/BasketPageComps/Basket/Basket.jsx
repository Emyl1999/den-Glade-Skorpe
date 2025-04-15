import { useLocalStorage } from "@uidotdev/usehooks";
import styles from "./basket.module.css";
import { useState } from "react";
import OrderSuccess from "./OrderSuccess/OrderSuccess";
import Hero from "../../../commonComponents/Hero/Hero";
import TitleComp from "../../../commonComponents/TitleComp/TitleComp";

const Basket = () => {
    const [cart, setCart] = useLocalStorage("cart", []);
    const [comment, setComment] = useState("");
    const [orderSuccess, setOrderSuccess] = useState(false);

    /* Removes the dish from the cart, taking into account for both the id and size of it. */
    const removeFromCart = (id, size) => {
        setCart(cart.filter(item => !(item._id === id && item.size === size)));
    };

    /* Calculates the totalprice of every dish in the cart, taking into account for the prices, sizes and quantity chosen */
    const totalPrice = cart.reduce((acc, dish) => {
        return acc + (dish.price[dish.size] * dish.quantity);
    }, 0);
    
    /* Handles the comment that the user inputs, that goes with the order */
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    /* Handles the Order submission */
    const handleSubmitOrder = async () => {
        /* We map over the cart array (from localStorage). Each object is a dish that the user added to the cart. */
        const dishes = cart.map((dish) => {
            if (dish._id) {
                return {
                    dish: dish._id.toString(),
                    amount: dish.quantity,
                    size: dish.size,
                    extraIngredients: dish.extraIngredients || [],
                };
            } else {
                console.error("Dish ID is missing", dish);
                return null;
            }
        }).filter(item => item !== null);
    
        /* The orderData that will be sent to the server, consists of dishes (the order itself), a comment and a totalPrice of all the orders combined. */
        const orderData = {
            dishes: dishes,
            comment: comment,
            totalPrice: totalPrice,
        };
    
        try {
            /* We POST data, as we submit an order. Type is JSON. */
            const res = await fetch("http://localhost:3042/order", {
                method: "POST",
                body: JSON.stringify(orderData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            const responseBody = await res.json();
            console.log("Response:", responseBody);
    
            /* If successful, the cart and comment input is cleared and orderSuccess is set to true, which will be used to display a success component. */
            if (res.ok) {
                setCart([]); 
                setComment(""); 
                setOrderSuccess(true);
            } else {
                console.error("Fejl:", res.statusText, responseBody);
                alert("Der opstod en fejl. Prøv igen.");
            }
        } catch (error) {
            console.log("Fejl:", error);
            alert("Der opstod en fejl. Prøv igen.");
        }
    };

    /* Used to close the orderSuccess component. */
    const handleCloseOrderSuccess = () => {
        setOrderSuccess(false);
    };

    return (
        <div className={styles.basketContainer}>
            {orderSuccess ? (
                <OrderSuccess onClose={handleCloseOrderSuccess} /> // Pass the close handler to the success component
            ) : (
                cart.length === 0 ? (
                    <section>
                        <Hero title={"SKORPE"}/>
                        <TitleComp title={"Bestilling"}/>
                        <p className={styles.emptyCart}>Kurven er tom.</p>
                    </section>
                ) : (
                    <div className={styles.cartList}>
                        <Hero title={"SKORPE"}/>
                        <TitleComp title={"Bestilling"}/>
                        {cart.map((dish, index) => (
                            <div key={index} className={styles.cartItem}>
                                <div className={styles.topPart}>
                                    {dish.quantity} X 
                                    <img src={dish.image} className={styles.cartImage} alt={dish.title} />
                                    {dish.title}
                                </div>
                                <div className={styles.size}>
                                    <h2 className={styles.text}>Størrelse: </h2>
                                    <h2 className={styles.textItem}>{dish.size.charAt(0).toUpperCase() + dish.size.slice(1)}</h2>
                                </div>
                                <div className={styles.price}>
                                    <h2 className={styles.text}>Pris: </h2>
                                    <h2 className={styles.textItem}>{dish.price[dish.size] * dish.quantity},-</h2>
                                </div>
                                <button className={styles.removeButton} onClick={() => removeFromCart(dish._id, dish.size)}>
                                        Fjern
                                </button>    
                            </div>
                        ))}
                        <h2>I alt: {totalPrice},-</h2>
                        <div className={styles.comment}>
                            <textarea
                                className={styles.commentInput}
                                value={comment}
                                onChange={handleCommentChange}
                                placeholder="Kommentar til ordren"
                            />
                        </div>
                        <button type="button" className={styles.sendOrderButton} onClick={handleSubmitOrder}>
                            Afgiv Ordre
                        </button>
                    </div>
                )
            )}
        </div>
    );
};

export default Basket;
