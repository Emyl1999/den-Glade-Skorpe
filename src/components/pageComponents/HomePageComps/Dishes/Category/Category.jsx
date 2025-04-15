import { useState } from "react";
import styles from "./category.module.css";

const Category = ({ dishes, onCategoryClick }) => {
    // Get one random dish per category for preview
    const getRandomDishByCategory = (category) => {
        const categoryDishes = dishes.filter(dish => dish.category === category);
        const randomDish = categoryDishes[Math.floor(Math.random() * categoryDishes.length)];
        return randomDish;
    };

    // Get random dishes for each category
    const pizzaDish = getRandomDishByCategory("Pizzaer");
    const indbagtePizzaDish = getRandomDishByCategory("Indbagte pizzaer");
    const durumRullerDish = getRandomDishByCategory("Durum ruller");

    return (
        <div className={styles.categoryPreviews}>
            <div
                className={styles.categoryPreview}
                onClick={() => onCategoryClick("Pizzaer")}
            >
                {pizzaDish && (
                    <div className={styles.imageContainer}>
                        <img
                            src={pizzaDish.image}
                            alt="Pizzaer"
                            className={styles.categoryImage}/>
                        <p className={styles.categoryImageTitle}>Pizzaer</p>
                    </div>
                )}
            </div>

            <div
                className={styles.categoryPreview}
                onClick={() => onCategoryClick("Indbagte pizzaer")}
            >
                {indbagtePizzaDish && (
                    <div className={styles.imageContainer}>
                        <img
                            src={indbagtePizzaDish.image}
                            alt="Indbagte pizzaer"
                            className={styles.categoryImage}
                        />
                        <p className={styles.categoryImageTitle}>Indbagte Pizzaer</p>
                    </div>
                )}
            </div>

            <div
                className={styles.categoryPreview}
                onClick={() => onCategoryClick("Durum ruller")}
            >
                {durumRullerDish && (
                    <div className={styles.imageContainer}>
                        <img
                            src={durumRullerDish.image}
                            alt="Durum ruller"
                            className={styles.categoryImage}
                        />  
                        <p className={styles.categoryImageTitle}>Durum Roller</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Category;
