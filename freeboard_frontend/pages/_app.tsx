import "../styles/globals.css";
import "antd/dist/antd.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Layout from "../src/components/commons/layout";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { AppProps } from "next/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4sFbUoW7ICAkt2gw43yQBzBlrJkqSvNc",
  authDomain: "hrsite220406.firebaseapp.com",
  projectId: "hrsite220406",
  storageBucket: "hrsite220406.appspot.com",
  messagingSenderId: "500883261638",
  appId: "1:500883261638:web:2ce55707bc033ee82d6fc7",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "http://backend06.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp; //function MyApp 앞에 쓰거나 여기에 쓰거나 둘다 가능
