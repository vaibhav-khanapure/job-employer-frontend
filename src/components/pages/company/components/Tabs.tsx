import tabs from '../data/tabs'

interface Props {
    currentActiveTab: string;
    handleUpdateActiveTab: (tab: string) => void;
};

const Tabs = ({ currentActiveTab, handleUpdateActiveTab }: Props) => {
    return (
        <div className="">
            <ul className="flex items-center *:cursor-pointer *:px-5 *:py-3 *:font-medium *:transition-all">
                {tabs.map((tab, index) => (
                    <li
                        key={`company-tab-${index}`}
                        onClick={() => handleUpdateActiveTab(tab?.name)}
                        className={`border-b-3 ${currentActiveTab === tab?.name ? "border-black text-black" : "border-transparent text-neutral-500 hover:text-black"}`}
                    >
                        {tab?.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tabs;