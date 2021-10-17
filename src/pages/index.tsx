import {useState} from 'react';
import Head from 'next/head';
import Text from 'components/Text';
import Button from 'components/Button';
import {Wrapper, Box, Flex, Grid, Relative, Absolute} from 'components/Layout';
import {getData, Horse} from './api/horses';

export default function Home(props: {horses: Record<string, Horse[]>}) {
    const [race, setRace] = useState('90%');
    return (
        <Box>
            <Head>
                <title>Covid Horse Race</title>
            </Head>

            <Wrapper p={[2, 3, 4]}>
                <Flex>
                    <Text mr={2}>Race: </Text>
                    {Object.keys(props.horses).map((key) => (
                        <Button
                            key={key}
                            mr={2}
                            onClick={() => setRace(key)}
                            color={key === race ? 'blue' : 'muted'}
                        >
                            {key}
                        </Button>
                    ))}
                </Flex>
                <Box my={4}>
                    <Race data={props.horses[race]} />
                </Box>
            </Wrapper>
        </Box>
    );
}

function Race(props: {data: Horse[]}) {
    const data = props.data;
    const max = Math.max(...data.map((hh) => hh.count));
    const columns = `repeat(${max + 1}, 1fr)`;

    return (
        <Grid gridTemplateRows={columns} gridGap={1}>
            <Box
                gridRow={1}
                gridColumn={1}
                children="State"
                position="sticky"
                top={0}
                backgroundColor="white"
            />
            <Box
                gridRow={2}
                gridColumn={1}
                children="Dose"
                position="sticky"
                top={3}
                backgroundColor="white"
            />
            {[...Array(max + 1)].map((_, index) => {
                const days = index;
                const borderColor = days === 0 ? 'green' : days % 10 === 0 ? '#000' : '#ccc';
                const y = index + 3;
                const x = data.length + 2;
                return (
                    <Box
                        key={index}
                        style={{gridColumnStart: 1, gridColumnEnd: x}}
                        gridRow={y}
                        borderTop="1px solid"
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
                const y = ii.count + 3;
                const x = index + 2;
                const title = name
                    .replace(/Doses/g, '')
                    .replace('First', '1st Dose')
                    .replace('Second', '2nd Dose');
                return (
                    <>
                        {name.includes('First') && (
                            <Box
                                gridRow={1}
                                textAlign="center"
                                gridColumn={`${x} / ${x + 2}`}
                                children={id}
                                position="sticky"
                                top={0}
                                backgroundColor="white"
                            />
                        )}
                        <Box
                            gridRow={2}
                            gridColumn={x}
                            position="sticky"
                            textAlign="center"
                            top={3}
                            backgroundColor="white"
                        >
                            {name.includes('First') ? '1' : '2'}
                        </Box>
                        <Box
                            key={ii.name}
                            gridColumn={x}
                            gridRow={`${y} / ${max + 4}`}
                            backgroundColor={id}
                        >
                            <Box textAlign="center" fontSize={['6px', 1, 2]} children={'🐎'} />
                        </Box>
                    </>
                );
            })}
        </Grid>
    );
}

export async function getStaticProps() {
    const horses = await getData();
    return {props: {horses}};
}
