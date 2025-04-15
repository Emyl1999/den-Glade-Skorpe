import Hero from "../../../components/commonComponents/Hero/Hero";
import TextComp from "../../../components/commonComponents/TextComp/TextComp";
import TitleComp from "../../../components/commonComponents/TitleComp/TitleComp";
import Employees from "../../../components/pageComponents/EmployeesPageComps/Employees/Employees";

const EmployeesPage = () => {
    return(
        <section>
            <Hero title={"SKORPE"}/>
            <TitleComp title={"Personalet hos Den Glade Skorpe"}/>
            <TextComp text={"Hos Den Glade Skorpe har vi et dedikeret og venligt personale, der altid går den ekstra mil for at sikre, at kunderne får den bedste oplevelse. Teamet består af erfarne pizzabagere, der med passion tilbereder lækre pizzaer med friske råvarer."}/>
            <Employees/>
        </section>
    )
}

export default EmployeesPage;