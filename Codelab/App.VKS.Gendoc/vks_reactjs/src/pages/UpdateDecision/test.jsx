import React from 'react';
import { useParams } from 'react-router-dom';

const UpdateDecisionTest = () => {
  const { id } = useParams();
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Test UpdateDecision</h1>
      <p>Case ID: {id}</p>
      <p>Component is working!</p>
    </div>
  );
};

export default UpdateDecisionTest;
