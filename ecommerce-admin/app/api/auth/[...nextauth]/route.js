import NextAuth, { getServerSession } from 'next-auth'

import GoogleProvider from 'next-auth/providers/google'
import clientPromise from "../../../../lib/mongodb"
import { MongoDBAdapter } from "@auth/mongodb-adapter"

const adminEmails = ['ejahmed999@gmail.com'];

export const authOptions = {
  providers: [
      // OAuth authentication providers...
      
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
      }),
    ],
  
  adapter: MongoDBAdapter(clientPromise),

  callbacks:{
    session: (session,token,user)=>{
        if(adminEmails.includes(session?.user?.email)){
          return session;
        }else{
          return false;
        }
    },
  },
}

const handler = NextAuth(authOptions)

export async function isAdminReq(){
  const session = await getServerSession(authOptions);
  if(!adminEmails.includes(session?.user?.email)){
    throw "not admin";
  }
}

export { handler as GET, handler as POST }
