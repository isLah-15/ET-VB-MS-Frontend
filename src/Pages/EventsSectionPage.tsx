import FeaturedEvents from "../Components/Event/EventsSection";
import Footer from "../Components/Footer/FooterSection";
import Navbar from "../Components/Nav/Navbar";

const EventsPage = () => {
    return (
        <div>
            <Navbar/>
            <FeaturedEvents />
            <Footer/>

        </div>
    )
}

export default EventsPage;