import { FaGoogle } from 'react-icons/fa';

const GoogleSignInButton = () => {
    return (
        <div className="flex items-center justify-center p-3 gap-2 cursor-pointer text-sm rounded-md transition duration-200 border border-gray-300 hover:bg-primary hover:border-black hover:text-white">
            <FaGoogle />
            <span>Continue with Google</span>
        </div>
    );
};

export default GoogleSignInButton;