import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import '../public/font.css';

const theme = extendTheme({
  fonts: {
    heading: 'Saira',
    body: 'Saira',
  },
});

function MyApp({ Component, pageProps }) {
  return <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp;