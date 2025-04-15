import { useEffect, useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import styles from "../../boForm.module.css";

const BoMessagesForm = () => {
  // We get the id from the URL.
  const { id } = useParams();

  // We reference to a form.
  const formRef = useRef();

  // We get the messages, addMessage and updateMessage from the context.
  const [messages, addMessage, updateMessage] = useOutletContext();

  // Determines whether we're in editmode or 'createmode' of an message. False as default.
  const [editMode, setEditMode] = useState(false);

  // useState for the message.
  const [message, setMessage] = useState(
    // If we have an id, we filter the messages and get the first one. Otherwise we set it to null.
    id ? messages?.filter((p) => p._id === id)[0] : null
  );

  useEffect(() => {
    //If we have an id, we find the message with that id, otherwise we set it to null.
    const foundMessage = id ? messages.find((p) => p._id === id) : null;

    // We set the message to the foundMessage.
    setMessage(foundMessage);

    // We set the editMode to true if we have an id, otherwise false.
    setEditMode(!!id);

    // The useEffect only runs when the id or messages change.
  }, [id, messages]);

  // Function that handles the submit of the form.
  const onHandleSubmit = (e) => {
    e.preventDefault();

    // We create a new FormData object.
    let formData = new FormData();

    // We append the name and text to the formData.
    formData.append("name", message.name);
    formData.append("subject", message.subject);
    formData.append("description", message.description);

    // If we're in editMode, we append the id to the formData.
    editMode && formData.append("id", message?._id);

    // If we're in editMode, we update the message, otherwise we add the message.
    editMode ? updateMessage(formData) : addMessage(formData);
  };

  return (
    <div className={styles.content}>
      <h2>{editMode ? "Redigér Message" : "Opret Message"}</h2>
      <form onSubmit={onHandleSubmit} ref={formRef} className={styles.form}>
        <label>
          {" "}
          Name
          <input
            className={styles.input}
            type="text"
            value={message?.name || ""}
            onChange={(e) =>
              setMessage({ ...message, name: e.target.value })
            }
          ></input>
        </label>
        <label>
          {" "}
          Subject
          <input
            className={styles.input}
            type="text"
            value={message?.subject || ""}
            onChange={(e) =>
              setMessage({ ...message, subject: e.target.value })
            }
          ></input>
        </label>
        <label>
          {" "}
          Description
          <input
            className={styles.input}
            type="text"
            value={message?.description || ""}
            onChange={(e) =>
              setMessage({ ...message, description: e.target.value })
            }
          ></input>
        </label>
      
        <div className={styles.buttons}>
          <button className={styles.button}>{editMode ? "Redigér Message" : "Opret Message"}</button>{" "}
          <button className={styles.button} type="reset">RESET</button>
        </div>
      </form>
    </div>
  );
};
export default BoMessagesForm;
