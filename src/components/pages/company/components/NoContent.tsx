import type { ReactNode } from "react";

interface Props {
    action?: ReactNode;
    icon: ReactNode;
    title: string;
    subtitle: string;
};

const NoContent = ({ action, icon, subtitle, title }: Props) => {
    return (
        <div className='p-6 mt-6 mb-3 flex flex-col gap-4 items-center rounded-md border border-dashed border-border-primary'>
            <div className="size-14 grid place-items-center rounded-full bg-bg-secondary text-text-secondary">
                {icon}
            </div>

            <h4 className="font-medium text-lg">{title}</h4>
            <p className="text-sm text-text-tertiary -mt-2">{subtitle}</p>

            {action}
        </div>
    );
};

export default NoContent;