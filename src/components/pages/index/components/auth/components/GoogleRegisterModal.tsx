import TextInput from "@/src/components/common/inputs/TextInput";
import APP from "@/src/constants/app";
import { useMutation } from "@tanstack/react-query";
import { type SubmitEvent, useState } from "react";
import toast from "@/src/lib/toast";
import useAuthStore from "@/src/store/authStore";
import useUserStore from "@/src/store/userStore";
import { IoCloseOutline } from "react-icons/io5";
import BROWSER_STORAGE from "@/src/constants/browserStorage";
import useCompanyStore from "@/src/store/companyStore";
import { useRouter } from "next/navigation";
import useSchemaValidator from "@/src/hooks/useSchemaValidator";
import validationSchemas from "@/src/validationSchemas/validationSchema";
import authAPIAction from "@/src/actions/auth/authAPIAction";
import { LuBuilding2 } from "react-icons/lu";
import AuthButton from "./AuthButton";
import Modal from "@/src/components/common/modals/Modal";

const GoogleRegisterModal = () => {
    const [company, setCompany] = useState('');

    const { replace } = useRouter();

    const { errors, handleValidateSchema } = useSchemaValidator(validationSchemas.auth.googleAuthRegister, {
        company
    });

    const { isPending, mutate } = useMutation({
        mutationFn: async (company: string) => {
            const data = await authAPIAction("/google/register", { data: { company } });
            return data;
        },
        onError: (error) => toast.error(error?.errorMessage),
        onSuccess: (result) => {
            const { accessToken, company, companySlug, email, name, role } = result?.data;

            useAuthStore.setState({
                accessToken,
                isAuth: true,
                shouldRegenerateAccessToken: true
            });

            useCompanyStore.setState({
                company: {
                    name: company,
                    slug: companySlug
                },
            });

            useUserStore.setState({
                user: {
                    email,
                    name,
                    role
                }
            });

            localStorage.setItem(BROWSER_STORAGE.LOCAL.USER_SIGNED_IN, '1');

            toast.success("Registration completed successfully!");

            replace("/home");
        }
    });

    const handleClose = () => {
        toast.info("Registration process aborted");
        useAuthStore.setState({ showGoogleRegisterModal: false });
    };

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isPending) return;

        const { success, data } = handleValidateSchema();

        if (success && data) {
            mutate(data?.company);
        };
    };

    return (
        <Modal>
            <form onSubmit={handleSubmit}>
                {/* Close button */}
                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close"
                    className="absolute right-5 top-5 grid size-9 place-items-center rounded-full text-text-secondary transition-all hover:bg-bg-secondary hover:text-text-primary"
                >
                    <IoCloseOutline size={22} />
                </button>

                {/* Header icon */}
                <div className="mb-6 grid size-14 place-items-center rounded-2xl border border-border-primary text-text-tertiary">
                    <LuBuilding2 size={24} />
                </div>

                {/* Heading */}
                <div className="mb-7">
                    <h1 className="text-2xl font-bold tracking-tight text-text-primary">
                        Add your company name
                    </h1>

                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        You're almost there! Enter your company name to complete your
                        employer account registration and get started.
                    </p>
                </div>

                {/* Input */}
                <TextInput
                    label="Company name"
                    error={errors?.company}
                    value={company}
                    required
                    onChange={e => setCompany(e.target.value)}
                    placeholder={`e.g. ${APP.APP_NAME}`}
                />

                <AuthButton isPending={isPending} text="Complete registration" />

                <p className="mt-4 text-center text-xs text-text-secondary">
                    You can update your company details anytime.
                </p>
            </form>
        </Modal>
    );
};

export default GoogleRegisterModal;