import nextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  // Secret: process.env.JWT_SECRET
  callbacks: {
    jwt: ({ token, account, user }) => {
      if (account) {
        token.id = user?.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.id;

      return session;
    }
  }
};

export default nextAuth(authOptions);
