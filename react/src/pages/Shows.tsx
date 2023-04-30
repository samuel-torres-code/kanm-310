import React from 'react';
import { useParams } from 'react-router-dom';

function Shows() {
  const { id } = useParams<{id: string}>();
  
  return (
    <div>
      <h1>Shows</h1>
      <p>ID: {id}</p>
    </div>
  );
}

export default Shows;