import React from 'react';
import { Callout, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Container, MapContainer, RowBottom, Footnote } from './styles';
import { colors } from '../../styles/colors';
import { ActionButton } from '../../components/ActionButton';
import { useLocation } from '../../hooks/location';
import { useNotes } from '../../hooks/notes';
import TextSubtitle from '../../components/TextSubtitle';
import { Row } from '../../components/Row';

const Dashboard: React.FC = () => {
  const { navigate } = useNavigation();
  const { location } = useLocation();
  const { notes, sync } = useNotes();
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
            coordinate={{ latitude: note.latitude, longitude: note.longitude }}
            pinColor={note.sync ? 'gray' : 'green'}
          >
            <Callout>
              <View style={{ minHeight: 100 }}>
                <Row>
                  <Icon name="book" />
                  <TextSubtitle>{note.annotation}</TextSubtitle>
                </Row>
                <Row>
                  <Icon name="clock" />
                  <Footnote>{note.datetime}</Footnote>
                </Row>
                <Row>
                  <Icon name="map" />
                  <View>
                    <Footnote>{`lat: ${note.latitude}`}</Footnote>
                  </View>
                  <View>
                    <Footnote>{`lat: ${note.longitude}`}</Footnote>
                  </View>
                </Row>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapContainer>
      <RowBottom full withSpaceBetween>
        <ActionButton backgroundColor={colors.accent} onPress={sync}>
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
