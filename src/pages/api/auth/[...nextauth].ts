import nextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

//Next Auth options.
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],

  callbacks: {
    //Set the user data from the provider in the jwt token.
    jwt: ({ token, account, user }) => {
      if (account) {
        token.user = user;
      }
      return token;
    },
    //Set the user data from the provider in the session.
    session: ({ session, token }) => {
      if (token.user) {
        session.user.id = token.user?.id;
        session.user.email = token?.user?.email || '';
        session.user.name = token?.user?.name || '';
      }
      return session;
    }
  }
};

export default nextAuth(authOptions);
