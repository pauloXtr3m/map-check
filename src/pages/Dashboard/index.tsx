import React from 'react';
import { Callout, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import * as Datefns from 'date-fns';
import {
  Container,
  MapContainer,
  RowBottom,
  Footnote,
  MarkerDetail,
  Annotation,
  ContainerLoading,
} from './styles';
import { colors } from '../../styles/colors';
import { ActionButton } from '../../components/ActionButton';
import { useLocation } from '../../hooks/location';
import { useNotes } from '../../hooks/notes';
import { Row } from '../../components/Row';
import TextTitle from '../../components/TextTitle';

const Dashboard: React.FC = () => {
  const { navigate } = useNavigation();
  const { location } = useLocation();
  const { notes, sync, loading } = useNotes();

  const fromStringToDate = datetime =>
    Datefns.parse(datetime, 'yyyy-MM-dd HH:mm:ss', new Date());

  if (loading) {
    return (
      <ContainerLoading>
        <Row center>
          <TextTitle>Sincronização em andamento</TextTitle>
        </Row>
        <Row center>
          <ActivityIndicator />
        </Row>
      </ContainerLoading>
    );
  }

  return (
    <Container>
      <MapContainer
        initialRegion={{
          latitude: location?.latitude || -16.67,
          longitude: location?.longitude || -49.255,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {notes.map(note => (
          <Marker
            key={note.id}
            coordinate={{ latitude: note.latitude, longitude: note.longitude }}
            pinColor={note.sync ? 'gray' : 'green'}
          >
            <Callout>
              <MarkerDetail>
                <View style={{ flexDirection: 'row', flexShrink: 1 }}>
                  <Icon name="book" />
                  <Annotation>{note.annotation}</Annotation>
                </View>
                <View>
                  <Row full>
                    <Icon name="calendar" />
                    <Footnote>
                      {Datefns.format(
                        fromStringToDate(note.datetime),
                        'dd/MM/yyyy',
                      )}
                    </Footnote>
                  </Row>
                  <Row>
                    <Icon name="clock" />
                    <Footnote>
                      {Datefns.format(
                        fromStringToDate(note.datetime),
                        'HH:mm:ss',
                      )}
                    </Footnote>
                  </Row>
                  <Row>
                    <Icon name="map" />
                    <View>
                      <Footnote>{`lat: ${note.latitude}`}</Footnote>
                    </View>
                    <View>
                      <Footnote>{`lon: ${note.longitude}`}</Footnote>
                    </View>
                  </Row>
                </View>
              </MarkerDetail>
            </Callout>
          </Marker>
        ))}
      </MapContainer>
      <RowBottom full withSpaceBetween>
        <ActionButton
          backgroundColor={colors.accent}
          onPress={async () => sync()}
        >
          <Icon name="refresh-cw" size={30} />
        </ActionButton>
        <ActionButton
          backgroundColor={colors.accent}
          onPress={() => navigate('CreateNote')}
        >
          <Icon name="plus" size={30} />
        </ActionButton>
      </RowBottom>
    </Container>
  );
};

export default Dashboard;
