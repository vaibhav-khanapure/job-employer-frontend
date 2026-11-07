import toast from "@/src/lib/toast";
import type { ChangeEvent } from "react";

const handleSelectLogo = (e: ChangeEvent<HTMLInputElement>, updateProfile: (img: string) => void) => {
    try {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            return toast.error("Please select an image");
        };

        if (file.size > 500 * 1024) {
            return toast.error("Image must be smaller than 500 kb");
        };

        updateProfile(URL.createObjectURL(file));
    } catch (error) {
        return toast.error("Something went wrong");
    };
};

export default handleSelectLogo;