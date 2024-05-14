'use client'
import { useSession } from "next-auth/react"

export default function ProfilePage() {
    const { data: session, status } = useSession()
    
  return (
    <div>
      <h1>{session?.user?.name??"No name"}</h1>
    </div>
  );
}