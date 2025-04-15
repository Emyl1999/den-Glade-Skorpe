import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useTinyFetch from "../../../hooks/tinyFetch.hook";
import BoMessageList from "../../../components/backoffice/Messages/lists/BoMessageList";

const BackofficeMessagesPage = () => {
    const [messages, setMessages] = useState([]); // State for messages, empty array as default.
    const { data, fetchData } = useTinyFetch(); // Fetch data from the API server.
    const navigate = useNavigate();
    const { token } = useAuth(); // Get token from useAuth hook.
  
    const headers = {
      Authorization: `Bearer ${token}`, // Include token in Authorization header
      'Content-Type': 'application/json',
    };
  
    useEffect(() => {
      fetchData("/messages"); //Fetches messages from the /messages endpoint.
    }, []);
  
    useEffect(() => {
      setMessages(data); // Sets the messages to the data we get from the endpoint API.
    }, [data]);
  
    // Function that adds a new message to the database.
    const addMessage = (formData) => {
      const addNewMessage = async (formData) => {
        let response = await fetch("http://localhost:3042/message", {
          // Fetches the data from the API server with the /message endpoint.
          method: "POST", // Method is POST, because we are posting data to the server.
          body: JSON.stringify(formData), // We are posting data from a form.
          headers,
        });
  
        // If the response is ok, we fetch the data again, and navigate to the /backoffice/messages page.
        if (response.ok) {
          fetchData("/messages");
          navigate(`/backoffice/messages`);
        }
      };
  
      addNewMessage(formData);
    };
  
    // Function that deletes a message from the database.
    const deleteMessage = (id) => {
      const delMessage = async () => {
        // Fetches the data from the API server with the /message/:id endpoint.
        await fetch(`http://localhost:3042/message/${id}`, {
          method: "DELETE", // Method is DELETE, because we are deleting data from the server.
          headers,
        });
  
        fetchData("/messages"); // Fetches the data again, to update the list of messages.
      };
  
      delMessage(id);
    };
  
    // Function that updates a message in the database.
    const updateMessage = (formData) => {
      const editMessage = async (formData) => {
        let response = await fetch("http://localhost:3042/message", {
          // Fetches the data from the API server with the /message endpoint.
          method: "PUT", // Method is PUT, because we are updating data in the server.
          body: JSON.stringify(formData), // We are updating data from a form.
          headers,
        });
  
        const res = await response.json();
        // If the response is ok, we fetch the data again, and navigate to the /backoffice/messages page.
        if ((res.status = "ok")) {
          fetchData("/messages");
          navigate(`/backoffice/messages`);
        }
      };
  
      editMessage(formData);
    };

  return (
    <div>
      <BoMessageList
        messages={messages}
        deleteMessage={deleteMessage}
      ></BoMessageList>
      <br />
      <br />
      <Outlet context={[messages, addMessage, updateMessage]}></Outlet>
    </div>
  );
}

export default BackofficeMessagesPage;