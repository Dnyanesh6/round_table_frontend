"use client";

import React, { useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
    export default function SignIn() {
    const [session, setSession] = React.useState<any>(null);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
        }

        if (session) {
            console.log("User is already signed in, redirecting to /hero");
            window.location.href = "/hero";
        }
    }, []);

    // sign in function (google)
    const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/hero`, // optional but good practice
        },
    });
    
    if (data) {
        console.log("Google sign-up data:", data);
    //   setSession(data.session);
    }
    if (error) {
        console.error("Google sign-up error:", error.message);
    } else {
        console.log("Redirecting to Google OAuth...");
    }
};

        return (
            <div className='bg-white h-screen w-screen text-black flex justify-center items-center px-4'>
                <div className='flex flex-col justify-center items-center  border-2 border-gray-300 w-full sm:w-[400px] md:w-[500px] lg:w-[600px] rounded-lg gap-6'>
                    <div className='text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-8 text-left'>
                        Welcome Back
                    </div>


                    {/* social sign up options */}
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div
                        onClick={handleSignIn}
                        className=' p-2 border border-2 w-full border-gray-300 rounded-md'>
                            Sign In with Google
                        </div>

                        <div className=' p-2 border border-2 border-gray-300 w-full rounded-md'>
                            Sign In with Apple
                        </div>

                        <div className='p-2 border border-2 border-gray-300 w-full rounded-md'>
                            Sign In with Twitter
                        </div>

                        <div className='flex flex-row justify-center items-center'>Or</div>

                        {/* // Email Sign Up Form */}
                        <div>
                            <form className='flex flex-col gap-4'>
                                <input type="email" placeholder='Email' className='text-xl sm:text-3xl md:text-4xl text-center p-2 border border-2 border-gray-300 rounded-md' />
                                <input type="password" placeholder='Password' className='text-xl sm:text-3xl md:text-4xl text-center p-2 border border-2 border-gray-300 rounded-md' />
                                <button type="submit" className='p-2 border border-2 border-blue-500 bg-blue-200 rounded-full'>Continue</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
