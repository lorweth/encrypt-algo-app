import React from 'react';
import { useAppSelector } from '../hooks/hook';
import './output-panel.css';

const OutputDisplay = () => {
  const output = useAppSelector(state => state.app.output);
  return (
    <div className="output-panel">
      <p>{output}</p>
    </div>
  );
};
export default OutputDisplay;
