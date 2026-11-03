import EditActions from "@/src/components/common/edit/EditActions";
import InfoRow from "../inputs/InfoRow";
import { FiBriefcase, FiCalendar, FiGlobe, FiLayers, FiMapPin, FiUsers } from "react-icons/fi";
import CLIENT_ENV from "@/src/constants/env/clientEnv";
import { useEffect, useState } from "react";

const Info = () => {
    const [currentYear, setCurrentYear] = useState(0);

    useEffect(() => {
        setCurrentYear(new Date()?.getFullYear());
    }, []);

    return (
        <section>
            <EditActions
                handleOnSave={() => null}
                isLoading={false}
                title="Company Information"
            />

            <div className="space-y-6 my-6">
                <InfoRow
                    icon={<FiBriefcase />}
                    label="Industry"
                    value={""}
                    emptyValueInfo="Add Industry"
                    placeholder="e.g. Tech"
                    error={""}
                    isEditing={false}
                    onChange={(v) => null}
                />

                <InfoRow
                    icon={<FiLayers />}
                    label="Company Type"
                    value={""}
                    error={""}
                    placeholder="e.g. Public company"
                    emptyValueInfo="Add company type"
                    isEditing
                    onChange={(v) => null}
                />

                <InfoRow
                    icon={<FiUsers />}
                    label="Company size"
                    value={""}
                    placeholder="e.g. 450"
                    emptyValueInfo="Add company size"
                    error={""}
                    isEditing={true}
                    onChange={(v) => null}
                />

                <InfoRow
                    icon={<FiCalendar />}
                    label="Founded year"
                    placeholder="e.g. 2024"
                    emptyValueInfo="Add founded year"
                    maxLength={4}
                    min={1600}
                    max={currentYear}
                    value={""}
                    error={""}
                    isEditing
                    onChange={(v) => null}
                />

                <InfoRow
                    icon={<FiMapPin />}
                    label="Headquarters"
                    placeholder="e.g. Mumbai, India"
                    emptyValueInfo="Add headquarters"
                    value={""}
                    error={""}
                    isEditing
                    onChange={(v) => null}
                />

                <InfoRow
                    icon={<FiGlobe />}
                    label="Website"
                    placeholder={`e.g. ${CLIENT_ENV.SITE_URL}`}
                    emptyValueInfo="Add company website"
                    value={""}
                    error={""}
                    isEditing
                    onChange={(v) => null}
                />
            </div>
        </section>
    );
};

export default Info;