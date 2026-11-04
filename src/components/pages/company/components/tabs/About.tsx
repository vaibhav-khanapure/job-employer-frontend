import EditActions from "@/src/components/common/edit/EditActions";
import NoContent from "../NoContent";
import { MdOutlineDescription } from "react-icons/md";
import NoContentButton from "../buttons/NoContentButton";
import TipTapTextEditor from "@/src/components/common/textEditors/tiptap/TipTapTextEditor";
import { useState } from "react";

const About = () => {
    const [description, setDescription] = useState("");

    return (
        <section>
            <EditActions
                handleOnSave={() => null}
                isLoading={false}
                title="About your company"
                subtitle="Share your company's story, mission, and what makes it a great place to work."
            />

            <div
                className="mt-3 text-text-tertiary"
                dangerouslySetInnerHTML={{ __html: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione eveniet dolores blanditiis expedita doloribus dolorum totam reprehenderit obcaecati perferendis adipisci, accusantium mollitia suscipit nemo omnis. Nulla libero nisi expedita odio? Quam delectus reiciendis illum reprehenderit totam doloremque aliquam, sapiente sint tempora saepe facilis autem enim quibusdam a ab inventore quasi." }}
            />

            <NoContent
                icon={<MdOutlineDescription size={24} />}
                title="Tell your company’s story"
                subtitle="Tell candidates what your company does, what drives your team, and what makes your workplace unique."
                action={<NoContentButton text="Write your company story" onClick={() => { }} />}
            />

            <TipTapTextEditor
                value={description}
                onChange={setDescription}
                placeholder="Write about your company, culture and more..."
                maxCharacters={1200}
            />

        </section>
    );
};

export default About;