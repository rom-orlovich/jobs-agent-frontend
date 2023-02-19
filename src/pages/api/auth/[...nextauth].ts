import nextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  secret: process.env.JWT_SECRET
};

export default nextAuth(authOptions);
