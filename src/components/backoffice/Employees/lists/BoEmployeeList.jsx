import { useNavigate } from "react-router-dom";
import styles from "./boEmployeeList.module.css";
import Swal from "sweetalert2";

// This component shows the list of all our employees in the backoffice section.
const BoEmployeeList = ({ employees, deleteEmployee }) => {
  const navigate = useNavigate();

  // Function that navigates to the edit/update page of the employee
  const editEmployee = (id) => {
    navigate(`/backoffice/employees/edit/${id}`);
  };

  // Function that navigates to the add/create page of the employee
  const createEmployee = () => {
    navigate(`/backoffice/employees/add`);
  };

  const handleDelete = (id, title) => {
    Swal.fire({
      title: `Vil du slette, "${title}"?, fra databasen?`,
      text: "Denne handling kan ikke fortrydes!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ja, slet den ansatte!",
      cancelButtonText: "Annuller",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmployee(id);
        Swal.fire("Slettet!", "Den ansatte er blevet slettet.", "success");
      }
    });
  };

  return (
    <div className={styles.list}>
      <table>
        <thead>
          <tr>
            <th>image</th>
            <th>name</th>
            <th>position</th>
          </tr>
        </thead>
        <tbody className={styles.backofficeList}>
          {employees.map((employee) => {
            let { _id, name, position, image } = employee;

            // Lists the information of each employee in the backoffice section, based on id's
            return (
              <tr key={_id} className={styles.item}>
                <td>
                  <img src={image}></img>
                </td>
                <td>{name}</td>
                <td>{position}</td>
                <td className={styles.actions}>
                  <button className={styles.action} onClick={() => editEmployee(_id)}>REDIGÈR</button>{" "}
                  {/* Clicking the button, runs the editEmployee function above. */}
                  <button className={styles.action} onClick={() => handleDelete(_id, name)}>SLET</button>{" "}
                  {/* Clicking the button, runs the deleteEmployee function that we get as a prop from BackofficeEmployeesPage. */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={createEmployee}>OPRET</button>{" "}
      {/* Clicking the button, runs the createEmployee function above. */}
    </div>
  );
};
export default BoEmployeeList;
