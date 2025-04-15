import { useEffect, useState } from "react";
import useTinyFetch from "../../../../hooks/tinyFetch.hook";
import Dish from "./Dish/Dish";
import styles from "./dishes.module.css";
import Category from "./Category/Category";

const Dishes = () => {
    const [dishes, setDishes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { data, fetchData, loading, error, noDataMessage } = useTinyFetch();

    useEffect(() => {
        fetchData("/dishes");
    }, []);

    useEffect(() => {
        setDishes(data);
    }, [data]);

    /* Category selection */
    const handleCategoryClick = (category) => {
        // If the clicked category is already selected, reset it to show all dishes
        if (selectedCategory === category) {
            setSelectedCategory(null); // Show all dishes
        } else {
            setSelectedCategory(category); // Filter dishes by category
        }
    };

    const filteredDishes = selectedCategory
        ? dishes.filter(dish => dish.category === selectedCategory)
        : dishes; // Show all dishes if no category is selected

    return(
        <div>
            <Category dishes={dishes} onCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} />
            
            <div className={styles.dishes}>
                {loading && <p>Loading...</p>}
                {noDataMessage && <p>{noDataMessage}</p>}
                {filteredDishes.length > 0 && filteredDishes.map((dish) => (
                    <Dish key={dish._id} dish={dish} />
                ))}
            </div>
    </div>
    )
}

export default Dishes;