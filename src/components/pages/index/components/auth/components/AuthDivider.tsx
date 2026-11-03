const AuthDivider = () => {
    return (
        <div className="flex items-center gap-4">
            <hr className="flex-1 border-0 border-t border-border-primary" />
            <span className="text-sm tracking-wider text-text-muted">
                or
            </span>
            <hr className="flex-1 border-0 border-t border-border-primary" />
        </div>
    );
};

export default AuthDivider;