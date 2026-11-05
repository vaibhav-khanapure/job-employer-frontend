import { useEffect } from "react";

interface Props {
    isSuccess?: boolean;
    isError?: boolean;
    isFetching?: boolean;

    onBefore?: () => void;
    onSuccess?: () => void;
    onError?: () => void;
    onCompleted?: () => void;
};

const useQueryResponseHandler = ({
    isSuccess,
    isError,
    isFetching,
    onBefore,
    onCompleted,
    onError,
    onSuccess
}: Props) => {
    useEffect(() => {
        if (isSuccess) onSuccess?.();
    }, [isSuccess, onSuccess]);

    useEffect(() => {
        if (isError) onError?.();
    }, [isError, onError]);

    useEffect(() => {
        if (isFetching) {
            onBefore?.();
        } else if (isSuccess || isError) {
            onCompleted?.();
        };
    }, [isFetching, isSuccess, isError, onBefore, onCompleted]);
};

export default useQueryResponseHandler;