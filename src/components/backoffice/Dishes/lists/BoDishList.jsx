import { useNavigate } from "react-router-dom";
import styles from "./boDishList.module.css";
import Swal from "sweetalert2";

// This component shows the list of all our dishes in the backoffice section.
const BoDishList = ({ dishes, deleteDish }) => {
  const navigate = useNavigate();

  // Function that navigates to the edit/update page of the dish
  const editDish = (id) => {
    navigate(`/backoffice/dishes/edit/${id}`);
  };

  // Function that navigates to the add/create page of the dish
  const createDish = () => {
    navigate(`/backoffice/dishes/add`);
  };

  const handleDelete = (id, title) => {
    Swal.fire({
      title: `Vil du slette, "${title}"?, fra databasen?`,
      text: "Denne handling kan ikke fortrydes!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ja, slet produktet!",
      cancelButtonText: "Annuller",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDish(id);
        Swal.fire("Slettet!", "Produktet er blevet slettet.", "success");
      }
    });
  };

  return (
    <div className={styles.list}>
      <table>
        <thead>
          <tr>
            <th>image</th>
            <th>title</th>
            <th>price</th>
            <th>category</th>
            <th>ingredients</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => {
            let { _id, title, price, image, category, ingredients } = dish;

            // Lists the information of each dish in the backoffice section, based on id's
            return (
              <tr key={_id}>
                <td>
                  <img src={image}></img>
                </td>
                <td>{title}</td>
                <td>{price.normal} / {price.family}</td>
                <td>{category}</td>
                <td>
                  {ingredients.map((ingredient, index) => (
                    <div key={index}>{ingredient}</div>
                  ))}
                </td>
                <td className={"table-actions"}>
                  <button onClick={() => editDish(_id)}>REDIGÈR</button>{" "}
                  {/* Clicking the button, runs the editDish function above. */}
                  <button onClick={() => handleDelete(_id, title)}>SLET</button>{" "}
                  {/* Clicking the button, runs the deleteDish function that we get as a prop from BackofficeDishPage. */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={createDish}>OPRET</button>{" "}
      {/* Clicking the button, runs the createDish function above. */}
    </div>
  );
};
export default BoDishList;
