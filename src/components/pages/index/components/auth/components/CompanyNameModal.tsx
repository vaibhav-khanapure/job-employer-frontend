import FormError from "@/src/components/common/errors/FormError";
import TextInput from "@/src/components/common/inputs/TextInput";
import Loaders from "@/src/components/common/loaders/loaders";
import APP from "@/src/constants/app";
import { useMutation } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import authAPIAction from "../../../actions/authAPIAction";
import toast from "@/src/lib/toast";
import useAuthStore from "@/src/store/authStore";
import useUserStore from "@/src/store/userStore";
import { IoCloseOutline } from "react-icons/io5";

const CompanyNameModal = () => {
    const [company, setCompany] = useState('');

    const { error, isPending, mutate } = useMutation({
        mutationFn: async (company: string) => {
            const data = await authAPIAction("/google/register", { data: { company } });
            return data;
        },
        onError: (error) => toast.error(error?.errorMessage),
        onSuccess: (data, email) => {
            const { accessToken, name } = data;

            if (!accessToken) {
                toast.error("Something went wrong, please try again");
                return;
            };

            useAuthStore.setState({
                accessToken,
                isAuth: true,
                shouldRegenerateAccessToken: true
            });

            useUserStore.setState({
                name,
                email
            });

            localStorage.setItem('sha-log', '1');

            toast.success("Logged in successfully");

            // replace("/home");
        }
    });

    const handleClose = () => {
        toast.info("Registration process aborted");
    };

    return (
        <div className='fixed top-0 left-0 h-screen w-full grid place-items-center bg-black/20'>
            <div className="p-6 max-w-100 w-full rounded-lg shadow-xl bg-white">

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
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder={`e.g. ${APP.APP_NAME}`}
                />

                {error && <FormError message={error?.message} />}

                <button type="submit" className="btn mt-4" disabled={isPending}>
                    {isPending ? <Loaders.Spinner className="size-2" /> : (
                        <Fragment>
                            Register &nbsp;
                            <span aria-hidden="true"> →</span>
                        </Fragment>
                    )}
                </button>
            </div>
        </div >
    );
};

export default CompanyNameModal;