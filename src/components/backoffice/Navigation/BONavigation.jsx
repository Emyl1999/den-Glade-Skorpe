import { Link, NavLink } from "react-router-dom";
import styles from "./boNavigation.module.css";
import useAuth from "../../../hooks/useAuth";

// Backoffice Navigation
const BONavigation = () => {
    const { signOut, user } = useAuth();

  return (
    <div className={styles.navigation}>
      <div className={styles.brand}>
        <Link to={"/"} className={styles.banner}>
          Tilbage til forsiden
        </Link>
      </div>

      <div>
        <div className={styles.routes}>
          <NavLink
            to="/backoffice/employees"
            className={({ isActive }) => (isActive ? styles.active : null)}
          >
            <span className={styles.title}>Employees</span>
          </NavLink>
          <NavLink
            to="/backoffice/dishes"
            className={({ isActive }) => (isActive ? styles.active : null)}
          >
            <span className={styles.title}>Dishes</span>
          </NavLink>
          <NavLink
            to="/backoffice/messages"
            className={({ isActive }) => (isActive ? styles.active : null)}
          >
            <span className={styles.title}>Messages</span>
          </NavLink>
        </div>
        
      </div>
      <div className={styles.welcomeMSG}>
        <h1 className={styles.welcome}>Hej {user.name} - Rolle: {user.role}</h1>
        <button onClick={() => signOut()}>Log Ud</button>
      </div>
    </div>
  );
};
export default BONavigation;
