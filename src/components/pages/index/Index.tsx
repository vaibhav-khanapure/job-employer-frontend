import Auth from "./components/auth/Auth";
import Customers from "./components/Customers";
import FAQs from "./components/FAQs";
import Reviews from "./components/Reviews";
import Services from "./components/Services";

const Index = () => {
    return (
        <main>
            <Auth />
            <Services />
            <Customers />
            <Reviews />
            <FAQs />
        </main>
    );
};

export default Index;