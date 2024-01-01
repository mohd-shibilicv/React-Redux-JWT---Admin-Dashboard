import React, { useState } from 'react'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
    <h1 className='flex justify-center text-3xl mt-10 font-bold'>Sign Up</h1>
    <div className='flex justify-center mt-5'>
      <form className="w-full flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Username" />
          </div>
          <TextInput id="username" type="text" placeholder="Your username" color="warninig" required shadow />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput id="email" type="email" placeholder='Your Email' required shadow />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput id="password" type="password" placeholder='Your password' required shadow />
        </div>
        {/* <div className="flex items-center gap-2">
          <Checkbox id="agree" />
          <Label htmlFor="agree" className="flex">
            I agree with the&nbsp;
            <Link to="/" className="text-cyan-600 hover:underline dark:text-cyan-500">
              terms and conditions
            </Link>
          </Label>
        </div> */}
        <Button className='bg-gray-500 hover:bg-gray-600' type="submit">Register new account</Button>
      </form>
    </div>
    <div className='flex justify-center p-3'>
      <p className='text-sm'>Already have an account?&nbsp;&nbsp;</p>
      <Link to="/signin" className='text-sm hover:underline text-indigo-800'>Sign in</Link>
    </div>
    </>
  )
}
