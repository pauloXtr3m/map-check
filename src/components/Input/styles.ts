import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { css } from 'styled-components';
import { colors } from '../../styles/colors';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  isMultiline: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #ffffff;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #ffffff;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isMultiline &&
    css`
      height: 200px;
      padding-top: 20px;
      align-items: flex-start;
    `}

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: ${colors.accent};
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #676767;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  ${props =>
    props.multiline &&
    css`
      height: 200px;
    `}
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
