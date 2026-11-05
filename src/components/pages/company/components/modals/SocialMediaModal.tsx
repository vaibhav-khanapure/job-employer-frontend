import Modal from "@/src/components/common/modals/Modal";
import socialMediaList from "../../data/socialMediaList";
import { useState } from "react";

interface Props {
    handleClose: () => void;
};

const SocialMediaModal = ({ handleClose }: Props) => {
    const [selectedSocialMedia, setSelectedSocialMedia] = useState("");

    return (
        <Modal title="Add social media" handleClose={handleClose}>
            {!selectedSocialMedia ? (
                <div className="flex flex-col mt-2 max-h-100 overflow-auto">
                    {socialMediaList.map((media, index) => (
                        <div
                            key={`company-social-media-option-${index}`}
                            className="flex items-center gap-3 p-3 rounded-md cursor-pointer transition duration-500 text-text-secondary hover:bg-bg-secondary"
                            onClick={() => setSelectedSocialMedia(media?.name)}
                        >
                            <media.icon size={16} />
                            <h3 className="font-medium text-sm text-text-secondary">{media?.name}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <div></div>
            )}
        </Modal>
    );
};

export default SocialMediaModal;