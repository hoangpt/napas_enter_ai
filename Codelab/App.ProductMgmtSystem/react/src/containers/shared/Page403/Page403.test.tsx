import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Page403 from './Page403';

it('Renders correctly', () => {
  render(
    <Router>
      <Page403 />
    </Router>
  );
});
