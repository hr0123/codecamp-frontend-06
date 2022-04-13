import "antd/dist/antd.css";
// import "../styles/globals.css";
import Layout from "../src/components/commons/layout";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import { RecoilRoot } from "recoil";
import ApolloSetting from "../src/components/commons/apollo";

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
  return (
    <RecoilRoot>
      <ApolloSetting>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloSetting>
    </RecoilRoot>
  );
}
export default MyApp; //function MyApp 앞에 쓰거나 여기에 쓰거나 둘다 가능
