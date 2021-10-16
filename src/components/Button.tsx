import styled from 'styled-components';
import styledProps, {StyledProps} from 'components/StyledProps';
import {color} from './Affordance';
import {Color} from './Theme';

export default styled.button<Omit<StyledProps, 'color'> & {color: Color}>`
    ${styledProps}
    -webkit-appearance: none;
    border: none;
    padding: 0;
    overflow: visible;
    font: inherit;
    background-color: ${(p) => p.theme.colors[p.color || 'blue']};
    color: ${color('bg')};
    padding: 0.5rem 1rem;
    cursor: pointer;
`;
