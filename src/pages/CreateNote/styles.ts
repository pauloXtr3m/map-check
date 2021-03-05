import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { Row } from '../../components/Row';

export const Container = styled.View`
  flex: 1;
  padding: ${Platform.OS === 'android' ? 0 : 32}px 16px
    ${Platform.OS === 'android' ? 150 : 40}px;
  justify-content: space-evenly;
  align-items: center;
`;

export const RowBottom = styled(Row)`
  position: absolute;
  align-self: center;
  margin-bottom: 20%;
  width: 90%;
  bottom: 0;
`;
