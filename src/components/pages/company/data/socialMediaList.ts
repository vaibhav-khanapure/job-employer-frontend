import {
    LuFacebook,
    LuInstagram,
    LuLinkedin,
    LuYoutube,
    LuTwitter,
    LuGithub,
} from "react-icons/lu";
import { SiX, SiThreads, SiTiktok } from "react-icons/si";

const socialMediaList = [
    { name: "LinkedIn", icon: LuLinkedin, placeholder: "https://linkedin.com/company/yourcompany" },
    { name: "Instagram", icon: LuInstagram, placeholder: "https://instagram.com/yourcompany" },
    { name: "Facebook", icon: LuFacebook, placeholder: "https://facebook.com/yourcompany" },
    { name: "X", icon: SiX, placeholder: "https://x.com/yourcompany" },
    { name: "YouTube", icon: LuYoutube, placeholder: "https://youtube.com/@yourcompany" },
    { name: "TikTok", icon: SiTiktok, placeholder: "https://tiktok.com/@yourcompany" },
    { name: "GitHub", icon: LuGithub, placeholder: "https://github.com/yourcompany" },
    { name: "Threads", icon: SiThreads, placeholder: "https://threads.net/@yourcompany" },
    { name: "Twitter", icon: LuTwitter, placeholder: "https://twitter.com/yourcompany" },
];

export default socialMediaList;