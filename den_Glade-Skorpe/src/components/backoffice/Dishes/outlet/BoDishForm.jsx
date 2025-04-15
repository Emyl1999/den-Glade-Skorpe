import { useEffect, useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import styles from "../../boForm.module.css";

const BoDishesForm = () => {
  // We get the id from the URL.
  const { id } = useParams();

  // We reference to a form.
  const formRef = useRef();

  // We get the dishes, addDish and updateDish from the context.
  const [dishes, addDish, updateDish] = useOutletContext();

  // Determines whether we're in editmode or 'createmode' of a dish. False as default.
  const [editMode, setEditMode] = useState(false);

  // useState for the dish.
  const [dish, setDish] = useState(
    // If we have an id, we filter the dishes and get the first one. Otherwise we set it to null.
    id ? dishes?.filter((p) => p._id === id)[0] : null
  );

  // useState for the image, null as default value.
  const [image, setImage] = useState();

  useEffect(() => {
    //If we have an id, we find the dish with that id, otherwise we set it to null.
    const foundDish = id ? dishes.find((p) => p._id === id) : null;

    // We set the dish to the foundDish.
    setDish(foundDish);

    // We set the editMode to true if we have an id, otherwise false.
    setEditMode(!!id);

    // The useEffect only runs when the id or dishes change.
  }, [id, dishes]);

  // Function that handles the change of the image.
  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Function that handles the submit of the form.
  const onHandleSubmit = async (e) => {
    e.preventDefault();
  
    let formData = new FormData();
  
    if (dish) {
      formData.append("title", dish.title);
      formData.append("price", JSON.stringify(dish.price));
      formData.append("category", dish.category);
      formData.append("ingredients", dish.ingredients);
      if (editMode) formData.append("id", dish._id);
    }
  
    if (image) formData.append("file", image);
  
    formData.forEach((value, key) => {
      console.log(key, value);
    });
  
    try {
      // Wait for the response from either addDish or updateDish
      const response = await (editMode ? updateDish(formData) : addDish(formData));
      console.log('Dish saved successfully!', response);
    } catch (error) {
      console.error('Error submitting dish:', error);
    }
  };

  return (
    <div className={styles.content}>
      <h2>{editMode ? "Redigér Produkt" : "Opret Produkt"}</h2>
      <form onSubmit={onHandleSubmit} ref={formRef} className={styles.form}>
        <label>
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : "http://localhost:3042/dishes/no-dish.jpg"
            }
            width={200}
          ></img>
          <input className={styles.input} type="file" name={"file"} onChange={onImageChange}></input>
        </label>
        <label>
          {" "}
          Title
          <input
            className={styles.input}
            type="text"
            value={dish?.title || ""}
            onChange={(e) =>
              setDish({ ...dish, title: e.target.value })
            }
          ></input>
        </label>
        {/* <label>
          {" "}
          Price
          <input
            className={styles.input}
            type="text"
            value={dish?.price || ""}
            onChange={(e) =>
              setDish({ ...dish, price: e.target.value })
            }
          ></input>
        </label> */}
        <label>
          Normal Price
          <input
            className={styles.input}
            type="number"
            value={dish?.price?.normal || ""}
            onChange={(e) =>
              setDish({
                ...dish,
                price: { ...dish.price, normal: Number(e.target.value) }
              })
            }
          />
        </label>

        <label>
          Family Price
          <input
            className={styles.input}
            type="number"
            value={dish?.price?.family || ""}
            onChange={(e) =>
              setDish({
                ...dish,
                price: { ...dish.price, family: Number(e.target.value) }
              })
            }
          />
        </label>
        <label>
          {" "}
          Category
          <input
            className={styles.input}
            type="text"
            value={dish?.category || ""}
            onChange={(e) =>
              setDish({ ...dish, category: e.target.value })
            }
          ></input>
        </label>
        <label>
          {" "}
          Ingredients
          <input
            className={styles.input}
            type="text"
            value={dish?.ingredients || ""}
            onChange={(e) =>
              setDish({ ...dish, ingredients: e.target.value })
            }
          ></input>
        </label>
      
        <div className={styles.buttons}>
          <button className={styles.button}>{editMode ? "Redigér Produkt" : "Opret Produkt"}</button>{" "}
          <button className={styles.button} type="reset">RESET</button>
        </div>
      </form>
    </div>
  );
};
export default BoDishesForm;
