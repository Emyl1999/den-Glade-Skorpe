import { Outlet } from "react-router-dom";
import BONavigation from "../../components/backoffice/Navigation/BONavigation";

const BackofficePage = () => {
    return(
        <div>
            <BONavigation/>
            <Outlet></Outlet>
        </div>
    )
    
}

export default BackofficePage;