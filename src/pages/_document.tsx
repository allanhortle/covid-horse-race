import Document, {Html, Head, Main, NextScript} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

export default class MyDocument extends Document {
    static async getInitialProps(ctx: any) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    // eslint-disable-next-line
                    enhanceApp: (App: any) => (props: any) =>
                        sheet.collectStyles(<App {...props} />)
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            };
        } finally {
            sheet.seal();
        }
    }
    render() {
        const url = 'https://covid-horse-race.vercel.app/';
        const img = `${url}bgop-og2.png`;
        const title = 'Covid Horse Race!';
        const description = "It's not a race.";
        return (
            <Html>
                <Head>
                    <meta name="title" content={title} />
                    <meta name="description" content={description} />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={url} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:image" content={img} />

                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content={url} />
                    <meta property="twitter:title" content={title} />
                    <meta property="twitter:description" content={description} />
                    <meta property="twitter:image" content={img} />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="anonymous"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;800&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
