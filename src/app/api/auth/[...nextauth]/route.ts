import { signInEmailPassword } from "@/auth/actions/auth-actions";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Prisma, PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient()


export const authOptions:NextAuthOptions ={
// Configure one or more authentication providers
adapter: PrismaAdapter(prisma) as Adapter,
providers: [
  GithubProvider({
    clientId: process.env.GITHUB_ID!,
    clientSecret: process.env.GITHUB_SECRET!,
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "Username", type: "email", placeholder: "jsmith@hotmail.com" },
      password: { label: "Password", type: "password", placeholder:'******' }
    },
    async authorize(credentials, req) {
      // Add logic here to look up the user from the credentials supplied
      const user = await signInEmailPassword(credentials!.email!, credentials!.password!)

      if (user) {
        // Any object returned will be saved in `user` property of the JWT
        return user
      } 
        // If you return null then an error will be displayed advising the user to check their details.
        return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      
    }
  }),
  // ...add more providers here
],

session:{
  strategy:'jwt'
},
callbacks:{
 async signIn({user, account, profile, email,credentials}) {
  return true
 },

 async jwt({token,user,account,profile}) {

  const dbUser = await prisma.user.findUnique({where:{email:token.email??""}})

  if (dbUser?.isActive===false) {
    throw Error ('Usuario no esta activo')
  }

  token.roles = dbUser?.roles ?? ['no-roles']

  token.id = dbUser?.id ?? 'no-uuid'

  return token 
 },

 async session({session, token, user}) {

  if (session && session.user) {
    session.user.roles = token.roles
    session.user.id = token.id
  }
  console.log(token)
  return session
 }

}

}

const handler = NextAuth (authOptions)
export {handler as GET, handler as POST}


  



