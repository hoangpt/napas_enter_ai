import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import PageUnderConstruction from './PageUnderConstruction';

it('Renders correctly', () => {
  render(
    <Router>
      <PageUnderConstruction />
    </Router>
  );
});
