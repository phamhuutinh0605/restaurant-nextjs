"use client"
import React, { useEffect, useState } from 'react'

interface Props{
    children:React.ReactNode
}
const ClientOnly = ({children}:Props) => {
    const [isClient, setIsClient] = useState(false)
    console.log("use client component")
    useEffect(() => {
      setIsClient(true)
    }, [])
   
    return <div>{isClient&&children}</div>
}

export default ClientOnly