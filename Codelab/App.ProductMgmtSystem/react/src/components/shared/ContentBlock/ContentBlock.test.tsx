import React from 'react';
import { render } from '@testing-library/react';
import ContentBlock from './ContentBlock';

it('Renders correctly', () => {
  const { container } = render(<ContentBlock />);
  expect(container.firstChild).toMatchSnapshot();
});
