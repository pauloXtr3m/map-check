import styled from 'styled-components/native';
import { Platform, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Row } from '../../components/Row';

export const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: ${Platform.OS === 'android' ? 0 : 16}px 16px
    ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const MapContainer = styled(MapView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Footnote = styled(Text)`
  font-size: 10px;
  color: gray;
`;

export const RowBottom = styled(Row)`
  position: absolute;
  align-self: center;
  margin-bottom: 20%;
  width: 90%;
  bottom: 0;
`;
