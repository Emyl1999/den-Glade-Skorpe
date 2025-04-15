import { useState } from "react";
import styles from "./contactForm.module.css"
import ContactSuccess from "./ContactSuccess/ContactSuccess";
import TitleComp from "../../../commonComponents/TitleComp/TitleComp";
import TextComp from "../../../commonComponents/TextComp/TextComp";
import Hero from "../../../commonComponents/Hero/Hero";

const ContactForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const messageData = {
            name,
            subject,
            description,
        };

        try{
            const res = await fetch("http://localhost:3042/message", {
                method: "POST",
                body: JSON.stringify(messageData),
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (res.ok) {
                setIsSubmitted(true);
            } else{
                console.error("Error", res.statusText)
            }
        } catch (error){
            console.log("Error", error)
        }
    }
    
    const handleReset = () => {
        setIsSubmitted(false);
        setName("");
        setSubject("");
        setDescription("");
    };

    return(
        <div className={styles.container}>
            <div className={styles.content}>
                {isSubmitted ? (
                    <div className={styles.successMessage}>
                        <ContactSuccess name={name} onClose={handleReset}/>
                    </div>
                    ) : (
                    <section>
                        <Hero title={"SKORPE"}/>
                        <TitleComp title={"Har du spørgsmål eller ønsker du at bestille din favoritpizza?"}/>
                        <TextComp  text={"Udfyld formularen herunder, så vender vi hurtigt tilbage til dig. Vi glæder os til at høre fra dig!"}/>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <h3 className={styles.text}>Navn</h3>
                            <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            />
                            <h3 className={styles.text}>Emne</h3>
                            <input
                            type="text"
                            name="emne"
                            onChange={(e) => setSubject(e.target.value)}
                            required
                            />
                            <h3 className={styles.text}>Beskrivelse</h3>
                            <textarea
                            name="description"
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            ></textarea>
                            <div className={styles.center}>
                                <button type="submit">Send</button>
                            </div>
                        </form>
                    </section>
            
            )}
            </div>
        </div>
    )
}

export default ContactForm;