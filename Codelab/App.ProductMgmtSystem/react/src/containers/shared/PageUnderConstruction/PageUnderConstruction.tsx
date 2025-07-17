import React from 'react';
import AppContainer from 'containers/AppLayout/AppContainer';
import underConstruction from 'assets/images/UnderConstruction.jpeg';

const PageUnderConstruction: React.FC = () => {
  return (
    <AppContainer title="">
      <div className="d-flex justify-content-center">
        <img src={underConstruction} alt="under-construction" />
      </div>
    </AppContainer>
  );
};

export default PageUnderConstruction;
