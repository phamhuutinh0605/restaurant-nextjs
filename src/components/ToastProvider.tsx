"use client"
import { Toaster } from "react-hot-toast";

interface Props {
    children:React.ReactNode
}

export const ToastProvider: React.FC<Props> = ({children}:Props) => {
    return <div>{children} <Toaster  position="top-right"/></div>
};