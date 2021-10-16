import {
    BorderProps,
    ColorProps,
    FlexboxProps,
    GridProps,
    LayoutProps,
    PositionProps,
    SpaceProps,
    TextStyleProps,
    TypographyProps,
    border,
    color,
    compose,
    flexbox,
    grid,
    layout,
    position,
    space,
    textStyle,
    typography
} from 'styled-system';

export default compose(
    border,
    color,
    flexbox,
    grid,
    layout,
    position,
    space,
    textStyle,
    typography
);

export interface StyledProps
    extends BorderProps,
        ColorProps,
        FlexboxProps,
        GridProps,
        LayoutProps,
        PositionProps,
        SpaceProps,
        TextStyleProps,
        TypographyProps {}
