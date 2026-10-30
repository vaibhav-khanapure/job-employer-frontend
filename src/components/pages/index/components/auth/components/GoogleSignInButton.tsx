"use client";

import API from "@/src/lib/API";
import { useGoogleLogin } from "@react-oauth/google";
import { Fragment, useState } from "react";
import { FaGoogle } from "react-icons/fa";

const GoogleSignInButton = () => {
    const [loading, setLoading] = useState(false);

    const login = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async ({ code, state, scope }) => {
            try {
                setLoading(true);

                const { data } = await API.post("/auth/google", { code });

                



                // Send the authorization code to your Express backend.
                // const response = await fetch(
                //     `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
                //     {
                //         method: "POST",
                //         headers: {
                //             "Content-Type": "application/json",
                //         },
                //         credentials: "include",
                //         body: JSON.stringify({ code }),
                //     }
                // );

                console.log({ code, state, scope });

                // if (!response.ok) {
                //     throw new Error("Google authentication failed");
                // }

                // Handle success using your existing auth flow.
                // window.location.assign("/dashboard");
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            };
        },
        onError: () => {
            setLoading(false);
            console.error("Google sign-in was unsuccessful");
        },
        onNonOAuthError: () => {
            setLoading(false);
        },
    });

    return (
        <button
            type="button"
            disabled={loading}
            onClick={() => login()}
            className="w-full flex items-center justify-center gap-3 rounded-md
                       border border-gray-300 bg-white px-4 py-2.5
                       font-medium text-gray-700 transition
                       hover:bg-gray-50 disabled:cursor-not-allowed
                       disabled:opacity-60"
        >
            {loading ? "Signing in..." : (
                <Fragment>
                    <FaGoogle />
                    <span>Continue with Google</span>
                </Fragment>
            )}
        </button>

        // <div className="flex items-center justify-center p-3 gap-2 cursor-pointer text-sm rounded-md transition duration-200 border border-gray-300 hover:shadow-md">
        //     <FaGoogle />
        //     <span>Continue with Google</span>
        // </div>
    );
};

export default GoogleSignInButton;