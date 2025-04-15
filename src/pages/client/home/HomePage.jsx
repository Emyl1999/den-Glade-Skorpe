import Hero from "../../../components/commonComponents/Hero/Hero";
import TextComp from "../../../components/commonComponents/TextComp/TextComp";
import TitleComp from "../../../components/commonComponents/TitleComp/TitleComp";
import Dishes from "../../../components/pageComponents/HomePageComps/Dishes/Dishes";

const HomePage = () => {
    return(
        <section>
            <Hero title={"SKORPE"}/>
            <TitleComp  title={"Velkommen til Den Glade Skorpe!"}/>
            <TextComp text={"Hos os handler det om den perfekte pizza med den sprødeste skorpe. Vi bruger kun de bedste råvarer til både klassiske favoritter og spændende specialiteter som \"Parma Drama\" og \"Rabbit Royale\". Uanset om du er til en lille, personlig pizza eller en stor familiedeling, så finder du det hos os. Kom forbi og nyd en pizza lavet med kærlighed, eller bestil den, hent den og nyd den derhjemme!"}/>
            <TitleComp  title={"Vælg kategori"}/>
            <Dishes/>
        </section>
    )
}

export default HomePage;