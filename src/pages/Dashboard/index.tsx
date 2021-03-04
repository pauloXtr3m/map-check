import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Container } from './styles';
import { colors } from '../../styles/colors';
import TextTitle from '../../components/TextTitle';

const Dashboard: React.FC = () => {
  return (
    <LinearGradient
      colors={colors.default}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextTitle>Dashboard</TextTitle>
      </Container>
    </LinearGradient>
  );
};

export default Dashboard;
