import React from 'react';
import { useAppSelector } from '../../store';

const OutputScene = () => {
  const output = useAppSelector(state => state.app.output);
  return (
    <div className="output-panel">
      <p>{output}</p>
    </div>
  );
};
export default OutputScene;
