import React from "react";
import styles from "./boMessageList.module.css";

const MessageModal = ({ message, closeModal }) => {
  if (!message) return null;

  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div>
          <h3>Besked fra: {message.name}</h3>
          <h4>Omhandler: {message.subject}</h4>
        </div>
        <p className={styles.messageDescription}>{message.description}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default MessageModal;
