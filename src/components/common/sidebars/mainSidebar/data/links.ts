import {
    House,
    BriefcaseBusiness,
    UsersRound,
    MessageSquare,
    Bell,
    Building2,
    Settings,
} from "lucide-react";

const navLinks = [
    {
        name: "Home",
        path: "/home",
        icon: House,
    },
    {
        name: "Jobs",
        path: "/jobs",
        icon: BriefcaseBusiness,
    },
    {
        name: "Find Candidates",
        path: "/candidates",
        icon: UsersRound,
    },
    {
        name: "Messages",
        path: "/chat",
        icon: MessageSquare,
    },
    {
        name: "Notifications",
        path: "/notifications",
        icon: Bell,
    },
    {
        name: "Company",
        path: "/company",
        icon: Building2,
    },
    {
        name: "Settings",
        path: "/settings",
        icon: Settings,
    },
];

export default navLinks;