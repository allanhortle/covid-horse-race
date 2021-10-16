import {DefaultTheme} from 'styled-components';

export type ThemeType = DefaultTheme;

export type Color = keyof DefaultTheme['colors'];

function makeTheme(colors: any) {
    return {
        space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
        colors,
        fonts: {
            copy: 'Menlo, monospace'
        },
        borders: {
            outline: '1px solid'
        },
        textStyles: {
            heading1: {
                fontSize: '2rem',
                fontWeight: 800
            },
            heading2: {
                fontSize: '1.5rem',
                fontWeight: 800
            },
            heading3: {
                fontSize: '1.25rem',
                fontWeight: 800
            },
            em: {
                fontStyle: 'italic'
            },
            strong: {
                fontWeight: 800
            },
            nowrap: {
                whiteSpace: 'nowrap'
            }
        }
    };
}

export const LightTheme = makeTheme({
    fg: '#4f424c',
    bg: '#fff',
    bg1: '#e3e4ea',
    comment: '#a39e9b',
    black: 'black',
    blue: '#1d4ed8',
    orange: '#FB923C',
    green: '#48b685',
    yellow: '#155bf9',
    white: '#fff',
    red: '#155bf9',
    purple: '#6D28D9',
    muted: '#9e9e9e',
    lineHighlight: 'rgb(188, 217, 219)',
    AUS: '#000',
    NSW: '#96c8eb',
    VIC: '#052963',
    TAS: '#0d5c66',
    SA: '#fbc423',
    ACT: '#052e85',
    NT: '#e65901',
    WA: '#face00',
    QLD: '#711e45'
});
