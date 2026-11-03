import type { AuthFormType } from "../../../types/auth.types";

interface Props {
    info: string;
    link: AuthFormType;
    linkText: string;
    handleChangeForm: (formType: AuthFormType) => void;
};

const AuthFormFooter = ({ handleChangeForm, info, link, linkText }: Props) => {
    return (
        <p className="text-sm text-center text-text-muted">
            {info}{' '}
            <span
                onClick={() => handleChangeForm(link)}
                className="label cursor-pointer underline text-text-tertiary hover:text-text-primary"
            >
                {linkText}
            </span>
        </p>
    );
};

export default AuthFormFooter;