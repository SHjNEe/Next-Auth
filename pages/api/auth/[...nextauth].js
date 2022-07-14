import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { comparePassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");
        const users = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!users) {
          client.close();
          throw new Error("User not found");
        }
        const isValid = await comparePassword(
          credentials.password,
          users.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Invalid password");
        }

        return {
          email: users.email,
        };

        client.close();
      },
    }),
  ],
});
