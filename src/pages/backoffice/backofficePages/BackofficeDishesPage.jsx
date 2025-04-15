import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useTinyFetch from "../../../hooks/tinyFetch.hook";
import BoDishList from "../../../components/backoffice/Dishes/lists/BoDishList";


const BackofficeDishesPage = () => {
    const [dishes, setDishes] = useState([]); // State for dishes, empty array as default.
    const { data, fetchData } = useTinyFetch(); // Fetch data from the API server.
    const navigate = useNavigate();
    const { token } = useAuth(); // Get token from useAuth hook.
  
    const headers = {
      Authorization: `Bearer ${token}`, // Include token in Authorization header
    };
  
    useEffect(() => {
      fetchData("/dishes"); //Fetches dishes from the /dishes endpoint.
    }, []);
  
    useEffect(() => {
      setDishes(data); // Sets the dishes to the data we get from the endpoint API.
    }, [data]);
  
    // Function that adds a new dish to the database.
    const addDish = (formData) => {
      const addNewDish = async (formData) => {
        let response = await fetch("http://localhost:3042/dish", {
          // Fetches the data from the API server with the /dish endpoint.
          method: "POST", // Method is POST, because we are posting data to the server.
          body: formData, // We are posting data from a form.
          headers,
        });
  
        // If the response is ok, we fetch the data again, and navigate to the /backoffice/dishes page.
        if (response.ok) {
          fetchData("/dishes");
          navigate(`/backoffice/dishes`);
        }
      };
  
      addNewDish(formData);
    };
  
    // Function that deletes a dish from the database.
    const deleteDish = (id) => {
      const delDish = async () => {
        // Fetches the data from the API server with the /dish/:id endpoint.
        await fetch(`http://localhost:3042/dish/${id}`, {
          method: "DELETE", // Method is DELETE, because we are deleting data from the server.
          headers,
        });
  
        fetchData("/dishes"); // Fetches the data again, to update the list of dishes.
      };
  
      delDish(id);
    };
  
    // Function that updates a dish in the database.
    const updateDish = (formData) => {
      const editDish = async (formData) => {
        let response = await fetch("http://localhost:3042/dish", {
          // Fetches the data from the API server with the /dish endpoint.
          method: "PUT", // Method is PUT, because we are updating data in the server.
          body: formData, // We are updating data from a form.
          headers,
        });
  
        const res = await response.json();
        // If the response is ok, we fetch the data again, and navigate to the /backoffice/dishes page.
        if ((res.status = "ok")) {
          fetchData("/dishes");
          navigate(`/backoffice/dishes`);
        }
      };
  
      editDish(formData);
    };

  return (
    <div>
      <BoDishList
        dishes={dishes}
        deleteDish={deleteDish}
      ></BoDishList>
      <br />
      <br />
      <Outlet context={[dishes, addDish, updateDish]}></Outlet>
    </div>
  );
}

export default BackofficeDishesPage;