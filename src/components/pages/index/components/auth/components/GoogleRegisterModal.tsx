import TextInput from "@/src/components/common/inputs/TextInput";
import Loaders from "@/src/components/common/loaders/loaders";
import APP from "@/src/constants/app";
import { useMutation } from "@tanstack/react-query";
import { Fragment, type SubmitEvent, useState } from "react";
import authAPIAction from "../../../actions/authAPIAction";
import toast from "@/src/lib/toast";
import useAuthStore from "@/src/store/authStore";
import useUserStore from "@/src/store/userStore";
import { IoCloseOutline } from "react-icons/io5";
import BROWSER_STORAGE from "@/src/constants/browserStorage";
import useCompanyStore from "@/src/store/companyStore";
import { useRouter } from "next/navigation";
import useSchemaValidator from "@/src/hooks/useSchemaValidator";
import validationSchemas from "@/src/validationSchemas/validationSchema";

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
            const { accessToken, company, companySlug, email, name } = result?.data;

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
                    role: "admin"
                }
            });

            localStorage.setItem(BROWSER_STORAGE.LOCAL.USER_SIGNED_IN, '1');

            toast.success("Registration completed successfully!");

            // replace("/home"); 
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
        <div className='fixed top-0 left-0 h-screen w-full grid place-items-center bg-black/20'>
            <form className="p-6 max-w-100 w-full rounded-lg shadow-xl bg-white" onSubmit={handleSubmit}>

                <div className="flex justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Add your company name
                        </h1>

                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                            Just one more step! Enter your company name to complete your
                            employer account registration.
                        </p>
                    </div>

                    <div
                        className="size-10 min-h-10 min-w-10 grid place-items-center rounded-full cursor-pointer hover:bg-gray-50"
                        onClick={handleClose}
                    >
                        <IoCloseOutline size={24} />
                    </div>
                </div>

                <TextInput
                    label="Company name"
                    error={errors?.company}
                    value={company}
                    required
                    onChange={e => setCompany(e.target.value)}
                    placeholder={`e.g. ${APP.APP_NAME}`}
                />

                <button type="submit" className="btn mt-4" disabled={isPending}>
                    {isPending ? <Loaders.Spinner className="size-2" /> : (
                        <Fragment>
                            Register &nbsp;
                            <span aria-hidden="true"> →</span>
                        </Fragment>
                    )}
                </button>
            </form>
        </div>
    );
};

export default GoogleRegisterModal;