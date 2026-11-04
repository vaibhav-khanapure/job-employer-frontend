interface Props {
    text: string;
    onClick: () => void;
};

const NoContentButton = ({ onClick, text }: Props) => {
    return (
        <button className="btn max-w-max text-xs transition duration-200 hover:-translate-y-1" onClick={onClick}>
            {text}
        </button>
    );
};

export default NoContentButton;