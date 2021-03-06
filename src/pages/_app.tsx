import type {AppProps} from 'next/app';
import {LightTheme} from '../components/Theme';
import {GlobalStyle} from '../components/Affordance';
import {ThemeProvider} from 'styled-components';
import {Box, Wrapper, Flex} from 'components/Layout';
import Text from 'components/Text';
import Clickable from 'components/Clickable';

export default function App({Component, pageProps}: AppProps) {
    return (
        <ThemeProvider theme={LightTheme}>
            <Box pb={5}>
                <GlobalStyle />
                <Box py={2} backgroundColor="black" color="bg">
                    <Wrapper>
                        <Text as="h1" fontSize={[2, 3, 5]} textAlign="center">
                            Covid Horse Race
                        </Text>
                    </Wrapper>
                </Box>
                <Component {...pageProps} />
            </Box>
        </ThemeProvider>
    );
}
