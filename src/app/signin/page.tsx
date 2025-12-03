"use client";

import React, { useEffect } from "react";

    export default function SignIn() {
    const [session, setSession] = React.useState<any>(null);

    // sign in function (google)

        return (
            <div className='bg-white h-screen w-screen text-black flex justify-center items-center px-4'>
                <div className='flex flex-col justify-center items-center  border-2 border-gray-300 w-full sm:w-[400px] md:w-[500px] lg:w-[600px] rounded-lg gap-6'>
                    <div className='text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-8 text-left'>
                        Welcome Back
                    </div>


                    {/* social sign up options */}
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div
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
