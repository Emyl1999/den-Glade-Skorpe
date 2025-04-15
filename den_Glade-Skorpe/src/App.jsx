import { useRoutes } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import HomePage from "./pages/client/home/HomePage";
import EmployeesPage from "./pages/client/employees/EmployeesPage";
import ContactPage from "./pages/client/contact/ContactPage";
import Login from "./components/commonComponents/Header/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import BackofficePage from "./pages/backoffice/BackofficePage";
import BackofficeEmployeesPage from "./pages/backoffice/backofficePages/BackofficeEmployeesPage";
import BoEmployeesForm from "./components/backoffice/Employees/outlet/BoEmployeesForm";
import Header from "./components/commonComponents/Header/Header";
import BasketPage from "./pages/client/basket/BasketPage";
import BoDishesForm from "./components/backoffice/Dishes/outlet/BoDishForm";
import BackofficeDishesPage from "./pages/backoffice/backofficePages/BackofficeDishesPage";
import DetailsPage from "./pages/client/details/DetailsPage";
import Footer from "./components/commonComponents/Footer/Footer";
import BackofficeMessagesPage from "./pages/backoffice/backofficePages/BackofficeMessagesPage";

function App() {
  const { signedIn, user } = useAuth();

  //Used to check whether we're on backoffice and hiding the client navigation if we are.
  const isBackoffice = location.pathname.startsWith("/backoffice")

  const routes = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/dish/:id",
      element: <DetailsPage />,
    },
    {
      path: "/basket",
      element: <BasketPage />,
    },
    {
      path: "/employees",
      element: <EmployeesPage />,
    },
    {
      path: "/contact",
      element: <ContactPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <div>NOT 404 FOUND</div>,
    },
    {
      path: "/backoffice",
      element: (
        //You're only able to navigate to backoffice, if you're signed in and your user role is "admin".
        <ProtectedRoute isAllowed={signedIn} role={user?.role}>
          <BackofficePage />
        </ProtectedRoute>
      ),
      children: [
      {
        path: "/backoffice/employees",
        element: <BackofficeEmployeesPage />,
        children: [
          {
            path: "/backoffice/employees/add",
            element: <BoEmployeesForm />,
          },
          {
            path: "/backoffice/employees/edit/:id",
            element: <BoEmployeesForm />,
          },
        ],
      },
      {
        path: "/backoffice/dishes",
        element: <BackofficeDishesPage />,
        children: [
          {
            path: "/backoffice/dishes/add",
            element: <BoDishesForm />,
          },
          {
            path: "/backoffice/dishes/edit/:id",
            element: <BoDishesForm />,
          },
        ],
      },
      {
        path: "/backoffice/messages",
        element: <BackofficeMessagesPage />,
      },
  ]}
    
  ])

  return (
    <>
      <div>
        {!isBackoffice && <Header />}
        <div className="globale-page-wrapper">{routes}</div>
        {!isBackoffice && <Footer />}
        
      </div>
    </>
  )
}

export default App
