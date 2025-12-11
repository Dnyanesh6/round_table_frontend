"use client";

import React, { useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
export default function SignIn() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: '',
        password: ''
    });
    const handlChnage =  (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }   
    
    const handleLogin = async  (e: React.MouseEvent<HTMLButtonElement,MouseEvent>) =>{
        e.preventDefault();
        try {   
            const res =await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/users/login`,
                user,
                {
                    withCredentials: true,
                }
            )

            if (res) {
            toast.success('Registered Successfully!');
            router.push(`/hero/${res.data.user._id}`)
        }
        } catch (error) {
            console.log("failed to login",error);
            throw new Error('Error logging in user');
        }
    }

    return (
            <div className='bg-white h-screen w-screen text-black flex justify-center items-center px-4'>
                <div className='flex flex-col justify-center items-center  border-2 border-gray-300 w-full sm:w-[400px] md:w-[500px] lg:w-[600px] rounded-lg gap-6'>
                    <div className='text-2xl pt-2 sm:text-3xl md:text-4xl text-center font-bold mb-8 text-left'>
                        Welcome Back
                    </div>

                        {/* // Email Sign Up Form */}
                        <div>
                            <form className='flex flex-col gap-4 py-4 pb-6'>
                                <input 
                                name="username"
                                onChange={handlChnage}
                                type="text" 
                                placeholder='Username' 
                                className='text-xl sm:text-3xl md:text-4xl text-center p-2 border border-2 border-gray-300 rounded-md' />
                                {/* <input type="email" placeholder='Email' className='text-xl sm:text-3xl md:text-4xl text-center p-2 border border-2 border-gray-300 rounded-md' /> */}

                                <input 
                                name="password"
                                onChange={handlChnage}
                                type="password" 
                                placeholder='Password' 
                                className='text-xl sm:text-3xl md:text-4xl text-center p-2 border border-2 border-gray-300 rounded-md' />

                                <button 
                                type="submit"
                                onClick={handleLogin}
                                className='p-2 border border-2 border-blue-500 bg-blue-200 rounded-full'>
                                Continue
                                </button>

                                <a href="/signup">Don&apos;t have an account? Sign Up</a>
                            </form>
                        </div>
                    </div>
                </div>
        )
    }
