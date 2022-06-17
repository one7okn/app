import { Component, ReactNode } from 'react';
import { withTranslation, TFunction } from 'react-i18next';
import { HttpError } from '../services';
import { ErrorPage } from './error-page';

export interface ErrorBoundaryState {
  error: Error | undefined;
}

class ErrorBoundaryInt extends Component<Record<string, unknown>, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    error: undefined,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  public render(): ReactNode {
    const { error } = this.state;
    const t = this.props.t as TFunction;
    // if (!error) return this.props.children;
    switch (error?.constructor) {
      case HttpError:
        return <ErrorPage title={t('errorHttp')}>{t(`http${(error as HttpError).status}`, { ns: 'error' })}</ErrorPage>;
      default:
        return <ErrorPage title={t('errorUnexpected')}>{error?.message}</ErrorPage>;
    }
  }
}

export const ErrorBoundary = withTranslation()(ErrorBoundaryInt);
