import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  RenderResult,
} from '@testing-library/react';
import CheckChangeInfo from './CheckChangeInfo';
import { BrowserRouter as Router } from 'react-router-dom';
import { itJira } from 'services/jira';
import { partServices } from 'services';

const { getByTestId } = screen;

let container: RenderResult['container'];
let getPartsMock: object;

beforeEach(() => {
  getPartsMock = jest.spyOn(partServices, 'getParts');
  ({ container } = render(
    <Router>
      <CheckChangeInfo />
    </Router>
  ));
});

it('Renders correctly', () => {
  expect(container.firstChild).toMatchSnapshot();
});

describe('Brand List - ', () => {
  const UX4STAFF_1415 = 'UX4STAFF-1415';

  itJira(UX4STAFF_1415, 'User can filter by brand name', async () => {
    const dummyText = 'abc';
    fireEvent.change(getByTestId('query'), { target: { value: dummyText } });
    fireEvent.submit(getByTestId('form-filter'));
    await waitFor(() => {
      const params = {
        page: 1,
        pageSize: 10,
        query: dummyText,
      };
      expect(getPartsMock).toHaveBeenCalledWith(params);
    });
  });

  itJira(UX4STAFF_1415, 'User can filter by brand status', async () => {
    const dummyStatus = '1';
    fireEvent.change(getByTestId('isActive'), {
      target: { value: dummyStatus },
    });
    fireEvent.submit(getByTestId('form-filter'));
    await waitFor(() => {
      const params = {
        page: 1,
        pageSize: 10,
        isActive: dummyStatus,
      };
      expect(getPartsMock).toHaveBeenCalledWith(params);
    });
  });

  itJira(UX4STAFF_1415, 'User can go to other page', async () => {
    const dummyPage = 2;
    fireEvent.change(getByTestId('table-changer'), {
      target: {
        value: 1,
        payload: {
          pagination: { current: dummyPage, pageSize: 10 },
        },
      },
    });
    await waitFor(() => {
      const params = {
        page: dummyPage,
        pageSize: 10,
      };
      expect(getPartsMock).toHaveBeenCalledWith(params);
    });
  });
});
