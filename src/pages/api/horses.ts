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

export async function getData(): Promise<Record<string, Horse[]>> {
    const {response, data} = await scrapeIt<any>('https://covidlive.com.au/vaccinations', {
        doses: {
            listItem:
                '.table-info.DAYS-UNTIL-VACCINATION-FIRST, .table-info.DAYS-UNTIL-VACCINATION-SECOND',
            data: {
                name: 'h2',
                days: {
                    listItem: '.DAYS',
                    data: {
                        count: {selector: '.touch', texteq: 0, convert: (x) => parseInt(x) || 0},
                        done: {
                            selector: '.img',
                            convert: Boolean
                        },
                        date: '.tooltip',
                        target: '.SECOND, .FIRST'
                    }
                }
            }
        }
    });

    const items: Horse[] = data.doses
        .flatMap((dd: any) => {
            return dd.days.map((ii: any) => ({...ii, name: dd.name}));
        })
        .sort((a: any, b: any) => parseInt(b.target) - parseInt(a.target));

    return groupBy(items, 'target');
}

export default async function GetHorses(req: NextApiRequest, res: NextApiResponse) {
    const group = await getData();
    res.status(200).json(group);
}
