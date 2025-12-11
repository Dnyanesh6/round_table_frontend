"use client"
import axios from 'axios';

import React,{useState} from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
export default function SignUp(){
    const router = useRouter();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
        e.preventDefault();
        try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/users/register`, 
            user,
            {
                withCredentials: true,
            }
        );

        if (res) {
            toast.success('Registered Successfully!');
            router.push(`/hero/${res.data.user._id}`)
        }
        } catch (error) {
            console.log('Error registering user:', error);
            throw new Error('Error registering user');
        }
        console.log(user);
        // Add form submission logic here
    }

    return(
        <div className='bg-white h-screen w-screen text-black flex justify-center items-center px-4'>
            <div className='flex flex-col justify-center items-center  border-2 border-gray-300 w-full sm:w-[400px] md:w-[500px] lg:w-[600px] rounded-lg gap-6'>
                <div className='text-2xl pt-2 sm:text-3xl md:text-4xl text-center font-bold mb-8 text-left'>
                    Welcome
                </div>

                    {/* // Email Sign In Form */}
                    <div>
                        <form 
                        className='flex flex-col py-4  gap-4'>

                            <input
                            type="text"
                            onChange={handleChange}
                            name='username'
                            placeholder='Username' 
                            className='text-l sm:text-3xl md:text-xl text-center p-2 border border-2 border-gray-300 rounded-md' />

                            <input 
                            type="email" 
                            name='email'
                            onChange={handleChange}
                            placeholder='Email' 
                            className='text-l sm:text-3xl md:text-xl text-center p-2 border border-2 border-gray-300 rounded-md' />

                            <input 
                            type="password" 
                            name='password'
                            onChange={handleChange}
                            placeholder='Password' 
                            className='text-l sm:text-3xl md:text-xl text-center p-2 border border-2 border-gray-300 rounded-md' />

                            <input 
                            type="password"
                            name='confirmPassword'
                            onChange={handleChange}
                            placeholder='Confirm Password' 
                            className='text-l sm:text-3xl md:text-xl  text-center p-2 border border-2 border-gray-300 rounded-md' />

                            <button 
                            type="submit" 
                            onClick={handleSubmit}
                            className='p-2 border border-2 border-blue-500 bg-blue-200 rounded-full'>
                                Continue    
                            </button>
                            <a href="/signin">already have an account? Sign In</a>
                        </form>
                    </div>
                </div>
            </div>
    )
}