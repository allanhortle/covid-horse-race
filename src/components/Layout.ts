import styled from 'styled-components';
import styledProps, {StyledProps} from './StyledProps';

export const Box = styled.div<StyledProps>({display: 'block'}, styledProps);
export const Flex = styled.div<StyledProps>({display: 'flex'}, styledProps);
export const Fixed = styled.div<StyledProps>({position: 'fixed'}, styledProps);
export const Relative = styled.div<StyledProps>({position: 'relative'}, styledProps);
export const Absolute = styled.div<StyledProps>({position: 'absolute'}, styledProps);
export const Grid = styled.div<StyledProps>({display: 'grid'}, styledProps);

export const Wrapper = styled(Box)`
    margin: auto;
    max-width: 60rem;
`;
