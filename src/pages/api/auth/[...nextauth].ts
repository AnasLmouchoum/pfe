import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default nextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@gmail.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const res = await fetch("http://localhost:1000/api/v1/users/"+credentials?.email+"/"+credentials?.password, {
          method: 'GET',
        })
        const user = await res.json() 
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
    // KeycloakProvider({
    //   clientId: process.env.KEYCLOAK_ID ?? "",
    //   clientSecret: process.env.KEYCLOAK_SECRET ?? "",
    //   issuer: process.env.KEYCLOAK_ISSUER,
    // }),

  ],
  // theme: {
  //   colorScheme: "light",
  // },
  // callbacks: {
  //   jwt({ token, account }) {
  //     if (account) {
  //       //console.log("token ? ", token);
  //       //console.log("account ? ", account);
  //       token.accessToken = account.access_token;
  //       token.id_token = account?.id_token;
  //     }
  //     token.userRole = "admin";
  //     return token;
  //   },
  //   session({ session, token }) {
  //     //console.log("session ??", session, token);
  //     // Send properties to the client, like an access_token from a provider.
  //     session.accessToken = token.accessToken;
  //     // session.id_token = token.id_token;
  //     return session;
  //   },
  // },
});
// export default NextAuth({

// https://next-auth.js.org/configuration/providers/oauth
// providers: [
//   KeycloakProvider({
//     // clientId: process.env.KEYCLOAK_ID ?? "client",
//     // clientSecret: process.env.KEYCLOAK_SECRET ?? "vJHaEwb4ZBeGpe1FenBfbwlMZG7SMVGZ",
//     // issuer: process.env.KEYCLOAK_ISSUER,http://localhost:8080/auth/realms/Gescom
//     clientId: "client",
//     clientSecret: "r9p2O8LH5rdMK8jJ0HHbRZLI7Tnf7zF3",
//     issuer:"http://localhost:8080/realms/gescom"

//   }),
// ],
// pages: {
//   signIn: '/auth/signin',
// },
// theme: {
//   colorScheme: "light",
// },
// callbacks: {
//   jwt({ token, account }) {
//     // console.log("token ? ", token)
//     // console.log("account ? ", account)
//     if (account) {
//       token.accessToken = account.access_token;
//     }
//     token.userRole = "admin";
//     return token;
//   },

//   session({ session, token }) {
//     // Send properties to the client, like an access_token from a provider.
//     session.accessToken = token.accessToken;
//     return session;
//   },
// },
// });
