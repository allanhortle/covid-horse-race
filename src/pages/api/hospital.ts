import scrapeIt from 'scrape-it';
import type {NextApiRequest, NextApiResponse} from 'next';

var groupBy = function (xs: any, key: string) {
    return xs.reduce((rv: any, x: any) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export type Horse = {
    name: string;
    count: number;
    done: boolean;
    date: string;
    target: string;
};

async function scrape(path: string, query: any) {
    return scrapeIt<any>(`https://covidlive.com.au/report${path}`, query);
}

const number = (selector) => ({selector, convert: (x) => parseInt(x.replace(/,/g, ''), 10)});
const date = (selector) => ({selector, convert: (x) => x});

export async function getData() {
    const states = ['act', 'vic', 'tas', 'sa', 'wa', 'nt', 'qld', 'nsw'];
    const raw = await Promise.all(
        states
            .flatMap<[string, any]>((state) => [
                [
                    `/daily-hospitalised/${state}`,
                    {
                        state: {selector: '.TH', convert: () => state},
                        items: {
                            listItem: '.DAILY-HOSPITALISED .even,.odd',
                            data: {
                                date: date('.DATE'),
                                state: {selector: '', convert: () => state},
                                type: {selector: '', convert: () => 'hospitalised'},
                                color: {selector: '', convert: () => 'red'},
                                value: number('.HOSP')
                                //icu: number('.ICU'),
                                //vent: number('.VENT')
                            }
                        }
                    }
                ],
                [
                    `/daily-cases/${state}`,
                    {
                        state: {selector: '.TH', convert: () => state},
                        items: {
                            listItem: '.DAILY-CASES .even,.odd',
                            data: {
                                date: date('.DATE'),
                                state: {selector: '', convert: () => state},
                                type: {selector: '', convert: () => 'cases'},
                                color: {selector: '', convert: () => '#ccc'},
                                value: number('.NET')
                            }
                        }
                    }
                ]
            ])
            .map((args) => scrape(...args))
    );

    const sliced = raw.map((ii) => ii.data);

    return Object.entries(groupBy(sliced, 'state')).map(([key, lists]) => {
        const dates: Map<string, any> = new Map();

        lists.forEach((aa) =>
            aa.items.forEach((bb) => {
                const key = bb.date;
                const previous = dates.get(key);
                dates.set(key, previous ? [...previous, bb] : [bb]);
            })
        );

        const sorted = [...dates.entries()]
            .sort((aa, bb) => new Date(bb[0]) - new Date(aa[0]))
            //.slice(0, 200)
            .flatMap((ii) => ii[1]);

        //console.log(dates);

        return [key, sorted];
    }, [] as any[]);
}

export default async function hospitalData(req: NextApiRequest, res: NextApiResponse) {
    const group = await getData();
    res.status(200).json(group);
}
