import EditActions from "@/src/components/common/edit/EditActions";
import NoContent from "../NoContent";
import { MdOutlineDescription } from "react-icons/md";
import NoContentButton from "../buttons/NoContentButton";

const About = () => {
    return (
        <section>
            <EditActions
                handleOnSave={() => null}
                isLoading={false}
                title="About your company"
                subtitle="Share your company's story, mission, and what makes it a great place to work."
            />

            <NoContent
                icon={<MdOutlineDescription size={24} />}
                title="Tell your company’s story"
                subtitle="Tell candidates what your company does, what drives your team, and what makes your workplace unique."
                action={<NoContentButton text="Add about yourself" onClick={() => { }} />}
            />

        </section>
    );
};

export default About;