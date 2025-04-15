import React, { useState } from "react";
import styles from "./boMessageList.module.css";
import Swal from "sweetalert2";
import MessageModal from "./MessageModel";

const BoMessageList = ({ messages, deleteMessage }) => {
  const [selectedMessage, setSelectedMessage] = useState(null); //Holds the message for the modal.

  const handleDelete = (id, name) => {
    Swal.fire({
      title: `Vil du slette beskeden fra "${name}"?`,
      text: "Denne handling kan ikke fortrydes!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ja, slet beskeden!",
      cancelButtonText: "Annuller",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMessage(id);
        Swal.fire("Slettet!", "Beskeden er blevet slettet.", "success");
      }
    });
  };

  const openModal = (message) => {
    
    setSelectedMessage(message);
  };

  const closeModal = () => {
    setSelectedMessage(null);
  };

  return (
    <div className={styles.list}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => {
            let { _id, name, status, subject } = message;

            const statusText = status ? "Read" : "Unread";
            return (
              <tr key={_id}>
                <td>{name}</td>
                <td>{subject}</td>
                <td>{statusText}</td>
                <td className={styles.actions}>
                  <button onClick={() => openModal(message)}>View</button>{" "}
                  <button onClick={() => handleDelete(_id, name)}>SLET</button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <MessageModal message={selectedMessage} closeModal={closeModal} />
    </div>
  );
};

export default BoMessageList;
