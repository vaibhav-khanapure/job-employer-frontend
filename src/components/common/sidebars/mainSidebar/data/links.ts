import CLIENT_ENV from "@/src/constants/env/clientEnv";
import {
    LuHouse,
    LuBriefcaseBusiness,
    LuUsers,
    LuMessageCircle,
    LuBell,
    LuBuilding2,
    LuSettings,
    LuExternalLink,
    LuRocket,
} from "react-icons/lu";

const navLinks = [
    {
        title: "Workspace",
        links: [
            { name: "Home", path: "/home", icon: LuHouse },
            { name: "Jobs", path: "/jobs", icon: LuBriefcaseBusiness },
            { name: "Find Candidates", path: "/candidates", icon: LuUsers },
            { name: "Messages", path: "/chat", icon: LuMessageCircle },
            { name: "Notifications", path: "/notifications", icon: LuBell },
            { name: "Company", path: "/company", icon: LuBuilding2 },
            { name: "Settings", path: "/settings", icon: LuSettings },
        ]
    },
    {
        title: "Explore",
        links: [
            {
                name: "Looking for a job?",
                path: CLIENT_ENV.HIRE_SITE_URL,
                icon: LuExternalLink,
                external: true
            },
            {
                name: "Explore Freelancing",
                path: CLIENT_ENV.FREELANCE_SITE_URL,
                icon: LuRocket,
                external: true,
            }
        ]
    }
];

export default navLinks;