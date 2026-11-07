import Auth from "./components/auth/Auth";
import Customers from "./components/Customers";
import FAQs from "./components/FAQs";
import Reviews from "./components/Reviews";

const Index = () => {
    return (
        <main>
            <Auth />
            <Customers />
            <Reviews />
            <FAQs />
        </main>
    );
};

export default Index;