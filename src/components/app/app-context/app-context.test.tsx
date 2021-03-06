/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react'; // avoid circular dependency
import AppContext from './app-context';

jest.mock('../app-context-query/app-context-query', () => {
  return {
    __esModule: true,
    default: (props: any) => {
      return <div>app context query {props.children}</div>;
    }
  };
});

jest.mock('../app-context-auth/app-context-auth', () => {
  return {
    __esModule: true,
    default: (props: any) => {
      return <div>app context auth {props.children}</div>;
    }
  };
});

// Sets up the component under test with the desired values and renders it
const renderComponent = () => {
  render(
    <AppContext>
      <p>full context</p>
    </AppContext>
  );
};

describe('app context', () => {
  it('renders the app context query component', () => {
    renderComponent();
    expect(screen.getByText('app context query')).toBeInTheDocument();
  });

  it('renders the app context auth component', () => {
    renderComponent();
    expect(screen.getByText('app context auth')).toBeInTheDocument();
  });

  it('renders the app context text', () => {
    renderComponent();
    expect(screen.getByText('full context')).toBeInTheDocument();
  });
});
