import styled from "styled-components";

export const Container = styled.div`
    padding: 32px;
    padding-top: 0;

    box-sizing: border-box;

    @media (max-width: 640px) {
        padding: 4px 4px;
    }

`

export const GitHubLink = styled.a`
    font-size: inherit;
`

export const GitHubLinkWrapper = styled.div`
    font-size: 40px;

    padding: 32px 0;

    @media (max-width: 640px) {
        font-size: 20px;
        padding: 16px 0;
    }
`

export const Title = styled.h1`
    font-size: 40px;

    @media (max-width: 640px) {
        font-size: 25px;
        margin-bottom: 16px;
    }
`