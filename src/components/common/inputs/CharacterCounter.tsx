interface Props {
    text: string;
    maxLength: number;
    trim?: boolean;
    excludeSpaces?: boolean;
};

const CharacterCounter = ({ maxLength, text, excludeSpaces = true, trim = true }: Props) => {
    let chars = text;

    if (trim) chars = chars.trim();

    if (excludeSpaces) chars = chars.replace(/\s/g, "");

    return (
        <p className="text-right text-xs text-text-muted">
            {chars.length} / {maxLength}
        </p>
    );
};

export default CharacterCounter;