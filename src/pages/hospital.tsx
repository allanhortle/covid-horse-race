import {useRef, useLayoutEffect, useState, useEffect} from 'react';
import {getData} from './api/hospital';
import Text from 'components/Text';
import {Box, Grid} from 'components/Layout';
import {
    GroupedSeries,
    layout,
    ContinuousScale,
    CategoricalScale,
    ColorScale,
    Chart,
    Axis,
    Line,
    Column
} from 'pnut';

function useDimensions(targetRef) {
    const getDimensions = () => {
        return {
            width: targetRef.current ? targetRef.current.offsetWidth : 0,
            height: targetRef.current ? targetRef.current.offsetHeight : 0
        };
    };

    const [dimensions, setDimensions] = useState(getDimensions);

    const handleResize = () => {
        setDimensions(getDimensions());
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useLayoutEffect(() => {
        handleResize();
    }, []);

    return dimensions;
}

export default function Hospital(props) {
    return (
        <Box p={3}>
            <Grid gridTemplateColumns="1fr 1fr 1fr">
                {props.hospital
                    .sort((aa, bb) => {
                        const a = Math.max(...aa[1].map((ii) => ii.value));
                        const b = Math.max(...bb[1].map((ii) => ii.value));
                        return b - a;
                    })
                    .map(([state, data]) => (
                        <Box key={state}>
                            <Box mb={3}>
                                <Text textStyle="heading1">{state}</Text>
                            </Box>
                            <Graph hospital={data} />
                        </Box>
                    ))}
            </Grid>
        </Box>
    );
}

function Graph(props) {
    const sizeRef = useRef();
    const {width} = useDimensions(sizeRef);
    const {hospital} = props;
    const data = [...hospital].reverse().map((ii) => ({...ii, date: new Date(ii.date)}));
    const series = new GroupedSeries({groupKey: 'type', pointKey: 'date', data});
    const ll = layout({width, height: 320, left: 0, bottom: 64, top: 32, right: 64});

    const x = new ContinuousScale({series, key: 'date', range: ll.xRange});
    const y = new ContinuousScale({series, key: 'value', range: ll.yRange, zero: true});
    const color = new ColorScale({
        series,
        key: 'color'
    });

    const scales = {series, x, y, color};
    return (
        <Box ref={sizeRef}>
            <Chart {...ll}>
                <Axis
                    scales={scales}
                    position="bottom"
                    renderText={(tt) => (
                        <text {...tt.position}>
                            {new Intl.DateTimeFormat('en-AU', {
                                day: 'numeric',
                                month: 'numeric',
                                year: '2-digit'
                            }).format(tt.tick)}
                        </text>
                    )}
                />
                <Axis scales={scales} position="right" />
                <Line scales={scales} strokeWidth="2" />
            </Chart>
        </Box>
    );
}

export async function getStaticProps() {
    const hospital = await getData();
    return {props: {hospital}};
}
