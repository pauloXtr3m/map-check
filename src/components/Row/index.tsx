import styled from 'styled-components/native';
import { css } from 'styled-components';

interface RowProps {
  full?: boolean;
  withSpaceBetween?: boolean;
  center?: boolean;
  width?: string;
  height?: string;
}

export const Row = styled.View<RowProps>`
  ${props =>
    props.height &&
    css`
      height: ${props.height};
    `}

  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}

  ${props =>
    props.full &&
    css`
      width: 100%;
    `}
  flex-direction: row;
  align-items: center;
  ${props =>
    props.withSpaceBetween &&
    css`
      justify-content: space-between;
    `}

  ${props =>
    props.center &&
    css`
      justify-content: center;
      align-items: center;
    `}
`;
