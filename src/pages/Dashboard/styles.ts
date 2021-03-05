import styled from 'styled-components/native';
import { Platform, Text, View } from 'react-native';
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

export const ContainerLoading = styled(Container)`
  justify-content: space-evenly;
`;

export const MapContainer = styled(MapView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Annotation = styled(Text)`
  flex-shrink: 1;
  flex-direction: row;
  font-size: 10px;
  padding: 4px;
  margin-left: 8px;
  background-color: #e5e5e5;
  overflow: hidden;
  border-radius: 6px;
`;

export const Footnote = styled(Text)`
  margin-left: 6px;
  font-size: 9px;
  color: #585858;
`;

export const RowBottom = styled(Row)`
  position: absolute;
  align-self: center;
  margin-bottom: 20%;
  width: 90%;
  bottom: 0;
`;

export const MarkerDetail = styled(View)`
  flex-shrink: 1;
  justify-content: space-around;
  align-items: flex-start;
  min-height: 100px;
  padding: 8px;
`;
