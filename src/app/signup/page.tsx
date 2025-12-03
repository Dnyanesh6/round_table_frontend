"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function SignUp(){
    
    // const router = useRouter();

const handleSignUp = () => {
    try {
        window.location.href = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/auth/google';
    } catch (error) {
        console.log('Error during sign-up:', error);
    }
}

    return(
        <div className='bg-white h-screen w-screen text-black flex justify-center items-center px-4'>
            <div className='flex flex-col justify-center items-center  border-2 border-gray-300 p-6 w-full sm:w-[400px] md:w-[500px] lg:w-[600px] rounded-lg gap-6'>
                <div className='text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-8 text-left'>
                    Welcome
                </div>

                {/* social sign in options */}
                <div className='flex flex-col justify-center items-center gap-2'>
                    <button 
                    onClick={handleSignUp}
                    className=' p-2 border border-2 border-gray-300 w-full rounded-md'>
                        Sign in with Google
                    </button>
                    <div className=' p-2 border border-2 border-gray-300 w-full rounded-md'>
                        Sign in with Apple
                    </div>

                    <div className='p-2 border border-2 border-gray-300 w-full rounded-md'>
                        Sign in with Twitter
                    </div>

                    <div className='flex flex-row justify-center items-center'>Or</div>

                    {/* // Email Sign In Form */}
                    <div>
                        <form className='flex flex-col gap-4'>
                            <input type="email" placeholder='Email' className='text-2xl sm:text-3xl md:text-4xl text-center p-2 border border-2 border-gray-300 rounded-md' />
                            <input type="password" placeholder='Password' className='text-2xl sm:text-3xl md:text-4xl text-center p-2 border border-2 border-gray-300 rounded-md' />
                            <input type="password" placeholder='Confirm Password' className='text-2xl sm:text-3xl md:text-4xl text-center p-2 border border-2 border-gray-300 rounded-md' />
                            <button type="submit" className='p-2 border border-2 border-blue-500 bg-blue-200 rounded-full'>Continue</button>
                        
                            <a href="/signin">already have an account? Sign In</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}