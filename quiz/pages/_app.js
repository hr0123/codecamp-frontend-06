import "antd/dist/antd.css";
// import "../styles/globals.css";
import Layout from "../src/components/commons/layout";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import { RecoilRoot } from "recoil";
import ApolloConfig from "../src/components/commons/apollo";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ApolloConfig>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloConfig>
    </RecoilRoot>
  );
}

export default MyApp; //function MyApp 앞에 쓰거나 여기에 쓰거나 둘다 가능
