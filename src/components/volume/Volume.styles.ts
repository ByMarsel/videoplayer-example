import styled from "styled-components";
import { StripValue, StripValueWrapper } from "../../styles/common.styles";

export const StyledStripeValue = styled(StripValue)<{width: number}>`
    width: ${({width}) => width}%;

    z-index: 1;
`

export const StyledStripValueWrapper = styled(StripValueWrapper)`
    background-color: rgba(64, 64, 64, 0.7);

    border-radius: 3px;
`