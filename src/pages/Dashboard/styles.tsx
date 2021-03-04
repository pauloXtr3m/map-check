import styled from 'styled-components/native';
import { Platform } from 'react-native';
import React from 'react';
import Button, { ButtonProps } from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  padding: ${Platform.OS === 'android' ? 0 : 16}px 16px
    ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const ActionButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Button
    {...props}
    style={{
      height: 60,
      width: 60,
      borderRadius: 60 / 2,
      backgroundColor: 'rgba(255,255,255,0.3)',
    }}
  >
    {children}
  </Button>
);
