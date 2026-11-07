import Auth from "./components/auth/Auth";
import FAQs from "./components/FAQs";
import Reviews from "./components/Reviews";

const Index = () => {
    return (
        <main>
            <Auth />
            <Reviews />
            <FAQs />
        </main>
    );
};

export default Index;