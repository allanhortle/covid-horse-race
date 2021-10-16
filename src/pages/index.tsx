import Head from 'next/head';
import Text from 'components/Text';
import {Wrapper, Box, Grid, Relative, Absolute} from 'components/Layout';
import {getData} from './api/horses';

export default function Home(props: any) {
    console.log(props.horses);
    return (
        <Box>
            <Head>
                <title>Covid Horse Race</title>
            </Head>

            <Wrapper px={4} py={5} pt={4}>
                {Object.entries(props.horses).map(([target, items]) => {
                    return (
                        <Box key={target} my={4}>
                            <Text textStyle="heading1">{target}</Text>
                            <Race data={items} />
                        </Box>
                    );
                })}
            </Wrapper>
        </Box>
    );
}

function Race({data}) {
    const max = 51;
    console.log(100);
    //<Grid my={4} gridTemplateColumns={{md: 'repeat(3, 1fr)'}} gridGap={3}>
    const columns = `repeat(${max}, 1fr)`;

    return (
        <Grid gridTemplateColumns={columns} gridGap={1} gridAutoRows="1rem">
            {[...Array(max)].map((_, index) => {
                const days = max - index - 1;
                const borderColor = days === 0 ? 'green' : days % 10 === 0 ? '#000' : '#ccc';
                return (
                    <Box
                        key={index}
                        style={{gridRowStart: 1, gridRowEnd: data.length + 2}}
                        gridColumn={index + 1}
                        borderLeft="1px solid"
                        borderColor={borderColor}
                        color={borderColor}
                    >
                        {days === 0 ? 'Finish!' : days}
                    </Box>
                );
            })}
            {data.map((ii, index) => {
                const {count, name} = ii;
                const id = ii.name.replace(/(First|Second) Doses/g, '').trim();
                return (
                    <Box key={ii.name} gridRow={index + 2} gridColumn={Math.max(1, max - ii.count)}>
                        <Relative>
                            <Absolute
                                pl={1}
                                textStyle="nowrap"
                                borderLeft="4px solid"
                                borderColor={id}
                            >
                                {name
                                    .replace(/Doses/g, '')
                                    .replace('First', '1st')
                                    .replace('Second', '2nd')}
                                {count >= 50 ? `(${count})` : ''}
                            </Absolute>
                        </Relative>
                    </Box>
                );
            })}
        </Grid>
    );
}

export async function getStaticProps() {
    const horses = await getData();
    return {props: {horses}};
}
