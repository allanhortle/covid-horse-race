import scrapeIt from 'scrape-it';
import type {NextApiRequest, NextApiResponse} from 'next';

var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export async function getData() {
    const {response, data} = await scrapeIt('https://covidlive.com.au/vaccinations', {
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

    const items = data.doses
        .flatMap((dd) => {
            return dd.days.map((ii) => ({...ii, name: dd.name}));
        })
        .sort((a, b) => parseInt(b.target) - parseInt(a.target));

    return groupBy(items, 'target');
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const group = await getData();
    res.status(200).json(group);
}
