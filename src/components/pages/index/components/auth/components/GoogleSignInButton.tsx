import { FaGoogle } from 'react-icons/fa';

const GoogleSignInButton = () => {
    return (
        <div className="flex items-center justify-center p-3 gap-2 cursor-pointer text-sm rounded-md transition duration-200 border border-gray-300 hover:shadow-md">
            <FaGoogle />
            <span>Continue with Google</span>
        </div>
    );
};

export default GoogleSignInButton;