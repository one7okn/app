import { Alert, AlertTitle } from '@mui/material';
import { FC, ReactNode } from 'react';

export interface ErrorPage {
  title?: ReactNode;
  children: any;
}

export const ErrorPage: FC<ErrorPage> = (props) => {
  const { title, children } = props;
  return (
    <Alert severity="error">
      <AlertTitle>{title}</AlertTitle>
      {children}
    </Alert>
  );
};
