import React from 'react';
import Button, { ButtonProps } from '../Button';

interface Props extends ButtonProps {
  backgroundColor?: string;
}

export const ActionButton: React.FC<Props> = ({
  children,
  backgroundColor = 'white',
  ...props
}) => (
  <Button
    {...props}
    style={{
      height: 60,
      width: 60,
      borderRadius: 60 / 2,
      backgroundColor,
    }}
  >
    {children}
  </Button>
);
