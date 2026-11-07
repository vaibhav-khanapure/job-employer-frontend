import Loaders from "@/src/components/common/loaders/loaders";
import { Fragment } from "react";

interface Props {
    isPending: boolean;
    text: string;
};

const AuthButton = ({ isPending, text }: Props) => {
    return (
        <button type="submit" className="btn" disabled={isPending}>
            {isPending ? <Loaders.Spinner className="size-2" /> : (
                <Fragment>
                    {text} &nbsp;
                    {/* <span aria-hidden="true"> →</span> */}
                </Fragment>
            )}
        </button>
    );
};

export default AuthButton;