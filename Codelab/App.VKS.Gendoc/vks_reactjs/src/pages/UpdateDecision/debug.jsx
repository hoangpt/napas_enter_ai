import React from 'react';
import { useParams } from 'react-router-dom';

const UpdateDecisionDebug = () => {
  const { id } = useParams();
  
  console.log('UpdateDecision component is rendering');
  console.log('Params:', { id });
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Debug UpdateDecision</h1>
      <p>Case ID: {id}</p>
      <p>Component is working!</p>
    </div>
  );
};

export default UpdateDecisionDebug;
