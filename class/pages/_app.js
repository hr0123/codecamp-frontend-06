import '../styles/globals.css'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

function MyApp({ Component, pageProps }) {
  
  const client = new ApolloClient({
    uri: "http://example.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache()
  })
  
  return (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
  )
}

export default MyApp  //function MyApp 앞에 쓰거나 여기에 쓰거나 둘다 가능
