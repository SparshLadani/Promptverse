import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@utils/database";
import user from "@models/user";

const options = {
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await user.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        const userExists = await user.findOne({ email: profile.email });

        if (!userExists) {
          await user.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture
          });
        }

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};

const authHandler = (req, res) => NextAuth(req, res, options);

export { authHandler as GET, authHandler as POST };
