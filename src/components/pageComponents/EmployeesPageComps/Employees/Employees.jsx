import { useEffect, useState } from "react";
import useTinyFetch from "../../../../hooks/tinyFetch.hook";
import styles from "./employees.module.css";

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const { data, fetchData, loading, error, noDataMessage } = useTinyFetch();

    useEffect(() => {
        fetchData("/employees");
    }, []);

    useEffect(() => {
        setEmployees(data);
    }, [data]);

    return (
        <div className={styles.employees}>

            {loading && <p>Loading...</p>}

            {noDataMessage && <p>{noDataMessage}</p>}

            {employees.map((employee) => (
                <div key={employee._id} className={styles.employeeCard}>
                    <img
                        src={employee.image}
                        alt={employee.name}
                        className={styles.employeeImage}
                    />
                    <h2 className={styles.employeeName}>{employee.name}</h2>
                    <h3 className={styles.employeePosition}>{employee.position}</h3>
                </div>
            ))}
        </div>
    );
}

export default Employees;