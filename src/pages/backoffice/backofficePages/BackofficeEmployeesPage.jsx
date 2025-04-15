import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

import BoEmployeeList from "../../../components/backoffice/Employees/lists/BoEmployeeList";
import useTinyFetch from "../../../hooks/tinyFetch.hook";


const BackofficeEmployeesPage = () => {
    const [employees, setEmployees] = useState([]); // State for employees, empty array as default.
    const { data, fetchData } = useTinyFetch(); // Fetch data from the API server.
    const navigate = useNavigate();
    const { token } = useAuth(); // Get token from useAuth hook.
  
    const headers = {
      Authorization: `Bearer ${token}`, // Include token in Authorization header
    };
  
    useEffect(() => {
      fetchData("/employees"); //Fetches employees from the /employees endpoint.
    }, []);
  
    useEffect(() => {
      setEmployees(data); // Sets the employees to the data we get from the endpoint API.
    }, [data]);
  
    // Function that adds a new employee to the database.
    const addEmployee = (formData) => {
      const addNewEmployee = async (formData) => {
        let response = await fetch("http://localhost:3042/employee", {
          // Fetches the data from the API server with the /employee endpoint.
          method: "POST", // Method is POST, because we are posting data to the server.
          body: formData, // We are posting data from a form.
          headers,
        });
  
        // If the response is ok, we fetch the data again, and navigate to the /backoffice/employees page.
        if (response.ok) {
          fetchData("/employees");
          navigate(`/backoffice/employees`);
        }
      };
  
      addNewEmployee(formData);
    };
  
    // Function that deletes a employee from the database.
    const deleteEmployee = (id) => {
      const delEmployee = async () => {
        // Fetches the data from the API server with the /employee/:id endpoint.
        await fetch(`http://localhost:3042/employee/${id}`, {
          method: "DELETE", // Method is DELETE, because we are deleting data from the server.
          headers,
        });
  
        fetchData("/employees"); // Fetches the data again, to update the list of employees.
      };
  
      delEmployee(id);
    };
  
    // Function that updates a employee in the database.
    const updateEmployee = (formData) => {
      const editEmployee = async (formData) => {
        let response = await fetch("http://localhost:3042/employee", {
          // Fetches the data from the API server with the /employee endpoint.
          method: "PUT", // Method is PUT, because we are updating data in the server.
          body: formData, // We are updating data from a form.
          headers,
        });
  
        const res = await response.json();
        // If the response is ok, we fetch the data again, and navigate to the /backoffice/employees page.
        if ((res.status = "ok")) {
          fetchData("/employees");
          navigate(`/backoffice/employees`);
        }
      };
  
      editEmployee(formData);
    };

  return (
    <div>
      <BoEmployeeList
        employees={employees}
        deleteEmployee={deleteEmployee}
      ></BoEmployeeList>
      <br />
      <br />
      <Outlet context={[employees, addEmployee, updateEmployee]}></Outlet>
    </div>
  );
}

export default BackofficeEmployeesPage;