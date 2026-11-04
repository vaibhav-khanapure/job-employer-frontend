import EditActions from "@/src/components/common/edit/EditActions";
import InfoRow from "../inputs/InfoRow";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import APP from "@/src/constants/app";

const Contact = () => {
    return (
        <section>

            <EditActions
                handleOnSave={() => null}
                isLoading={false}
                title="Contact & location"
                subtitle="Manage your company's contact details, office address, and social media links so candidates can easily connect with your business."
            />

            <div className="space-y-6 my-6">
                <InfoRow
                    icon={<IoCallOutline />}
                    label="Phone number"
                    value={""}
                    placeholder="e.g. +XX XXXXX XXXX"
                    emptyValueInfo="Add phone number"
                    error={""}
                    isEditing
                    onChange={(v) => null}
                />

                <InfoRow
                    icon={<MdOutlineMail />}
                    label="Company email"
                    value={""}
                    placeholder={`e.g. ${APP.SUPPORT_MAIL}`}
                    emptyValueInfo="Add company email"
                    error={""}
                    isEditing
                    onChange={(v) => null}
                />

                <InfoRow
                    icon={<HiOutlineLocationMarker />}
                    label="Office address"
                    value={""}
                    placeholder="e.g. 123 Business Park, Pune, Maharashtra"
                    emptyValueInfo="Add office address"
                    error={""}
                    isEditing
                    onChange={(v) => null}
                />
            </div>
        </section>
    );
};

export default Contact;