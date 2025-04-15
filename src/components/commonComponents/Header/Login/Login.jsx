import useAuth from "../../../../hooks/useAuth";
import styles from "./Login.module.css";

const Login = () => {
  const { setEmail, setPassword, error, signIn } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.loginBackground}>
        <h1>Log Ind</h1>
        <form onSubmit={signIn} className={styles.form}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            className={styles.input}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
          <input
            className={styles.input}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <p className={styles.createAccount}>Ikke medlem? Opret en bruger. </p>
          <button className={styles.login} type="submit">Log ind</button>

        </form>

      </div>
    </div>
  );
};

export default Login;
