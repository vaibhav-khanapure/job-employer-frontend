import EditActions from "@/src/components/common/edit/EditActions";
import NoContent from "../NoContent";
import NoContentButton from "../buttons/NoContentButton";
import { MdOutlineShare } from "react-icons/md";
import SocialMediaModal from "../modals/SocialMediaModal";

const SocialMedias = () => {
    return (
        <section>
            <EditActions
                handleOnSave={() => null}
                isLoading={false}
                title="Social media presence"
                subtitle="Connect your company's social media profiles to help candidates discover your brand, explore your culture, and stay connected with your business."
            />

            <NoContent
                icon={<MdOutlineShare size={24} />}
                title="Connect your social media profiles"
                subtitle="Showcase your company's online presence by adding links to your LinkedIn, Instagram, Facebook, and other social media profiles."
                action={<NoContentButton text="Add social media profiles" onClick={() => { }} />}
            />

            <SocialMediaModal />
        </section>
    );
};

export default SocialMedias;