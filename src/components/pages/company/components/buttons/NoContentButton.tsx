interface Props {
    text: string;
    onClick: () => void;
};

const NoContentButton = ({ onClick, text }: Props) => {
    return (
        <button className="btn max-w-max text-xs" onClick={onClick}>
            {text}
        </button>
    );
};

export default NoContentButton;