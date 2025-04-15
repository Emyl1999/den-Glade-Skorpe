import { useEffect, useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import styles from "../../boForm.module.css";

const BoEmployeesForm = () => {
  // We get the id from the URL.
  const { id } = useParams();

  // We reference to a form.
  const formRef = useRef();

  // We get the employees, addEmployee and updateEmployee from the context.
  const [employees, addEmployee, updateEmployee] = useOutletContext();

  // Determines whether we're in editmode or 'createmode' of an employee. False as default.
  const [editMode, setEditMode] = useState(false);

  // useState for the employee.
  const [employee, setEmployee] = useState(
    // If we have an id, we filter the employees and get the first one. Otherwise we set it to null.
    id ? employees?.filter((p) => p._id === id)[0] : null
  );

  // useState for the image, null as default value.
  const [image, setImage] = useState();

  useEffect(() => {
    //If we have an id, we find the employee with that id, otherwise we set it to null.
    const foundEmployee = id ? employees.find((p) => p._id === id) : null;

    // We set the employee to the foundEmployee.
    setEmployee(foundEmployee);

    // We set the editMode to true if we have an id, otherwise false.
    setEditMode(!!id);

    // The useEffect only runs when the id or employees change.
  }, [id, employees]);

  // Function that handles the change of the image.
  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Function that handles the submit of the form.
  const onHandleSubmit = (e) => {
    e.preventDefault();

    // We create a new FormData object.
    let formData = new FormData();

    // We append the name and position to the formData.
    formData.append("name", employee.name);
    formData.append("position", employee.position);

    // If we're in editMode, we append the id to the formData.
    editMode && formData.append("id", employee?._id);

    // If we have an image, we append the image to the formData.
    image && formData.append("file", image);

    // If we're in editMode, we update the employee, otherwise we add the employee.
    editMode ? updateEmployee(formData) : addEmployee(formData);
  };

  return (
    <div className={styles.content}>
      <h2>{editMode ? "Redigér Employee" : "Opret Employee"}</h2>
      <form onSubmit={onHandleSubmit} ref={formRef} className={styles.form}>
        <label>
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : "http://localhost:3042/employees/no-employee.jpg"
            }
            width={200}
          ></img>
          <input className={styles.input} type="file" name={"file"} onChange={onImageChange}></input>
        </label>
        <label>
          {" "}
          Name
          <input
            className={styles.input}
            type="text"
            value={employee?.name || ""}
            onChange={(e) =>
              setEmployee({ ...employee, name: e.target.value })
            }
          ></input>
        </label>
        <label>
          {" "}
          Position
          <input
            className={styles.input}
            type="text"
            value={employee?.position || ""}
            onChange={(e) =>
              setEmployee({ ...employee, position: e.target.value })
            }
          ></input>
        </label>
      
        <div className={styles.buttons}>
          <button className={styles.button}>{editMode ? "Redigér Employee" : "Opret Employee"}</button>{" "}
          <button className={styles.button} type="reset">RESET</button>
        </div>
      </form>
    </div>
  );
};
export default BoEmployeesForm;
