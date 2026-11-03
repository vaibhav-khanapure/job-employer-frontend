import { type MouseEvent, useEffect, useRef, useState } from 'react';
import tabs from '../data/tabs'

interface Props {
    currentActiveTab: string;
    handleUpdateActiveTab: (tab: string) => void;
};

const Tabs = ({ currentActiveTab, handleUpdateActiveTab }: Props) => {
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });

    const tabsRef = useRef<HTMLUListElement>(null);

    const handleUpdateIndicator = (tab: string) => {
        const container = tabsRef?.current;
        if (!container) return;

        const activeTab = Array.from(container?.children).find(element => element.getAttribute("data-tab") === tab);

        if (!activeTab) return;

        const rect = activeTab?.getBoundingClientRect();
        const parentRect = container?.getBoundingClientRect();

        setIndicator({
            left: rect?.left - parentRect?.left,
            width: rect?.width
        });
    };

    useEffect(() => {
        handleUpdateIndicator(currentActiveTab);

        const handleResize = () => handleUpdateIndicator(currentActiveTab);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleChangeTab = (e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>, tab: string) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const containerRect = tabsRef.current?.getBoundingClientRect();

        if (containerRect) {
            setIndicator({
                left: rect.left - containerRect.left,
                width: rect.width,
            });
        };

        handleUpdateActiveTab(tab);
    };

    return (
        <ul
            className="relative flex items-center *:cursor-pointer *:px-5 *:py-3 *:font-medium *:transition-all"
            ref={tabsRef}
        >
            {tabs.map((tab, index) => (
                <li
                    key={`company-tab-${index}`}
                    data-tab={tab?.name}
                    className={currentActiveTab === tab.name ? 'text-black' : 'text-neutral-500 hover:text-black'}
                    onClick={(e) => handleChangeTab(e, tab?.name)}
                >
                    {tab?.name}
                </li>
            ))}

            <div
                className="absolute bottom-0 border-b-3 border-black transition-all duration-300 ease-in-out pointer-events-none"
                style={{
                    left: indicator.left,
                    width: indicator.width,
                }}
            />
        </ul>
    );
};

export default Tabs;