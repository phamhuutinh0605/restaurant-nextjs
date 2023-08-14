"use client"
import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { toast } from "react-hot-toast";
import {useEffect} from "react"

const UserLink = () => {
    const {status}=useSession()
   useEffect(()=>{
    if(status==="authenticated"){
      toast.success('Login success!',{
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    }
   },[status])
  return (
   <div>
     {status === "authenticated" ? (
        <div>
            <Link href="/orders">Orders</Link>
            <Link href="/" className="ml-10 py-2 px-4 bg-red-500 text-white rounded-md  hover:bg-white border-2 border-red-500 transition duration-300" onClick={()=>signOut()}><span className="hover:text-red-500 transition duration-300">Logout</span></Link>
        </div>
      ):(
        <Link href="/login" className="py-2 px-4 bg-red-500 text-white rounded-md">Login</Link>
      )}
   </div>
  )
}

export default UserLink