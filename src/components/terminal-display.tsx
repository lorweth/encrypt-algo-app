import React, { useContext } from 'react';
import { useAppSelector } from '../store';
import './terminal-style.css';

const TerminalDisplay = () => {
  const log = useAppSelector(state => state.app.log);
  return (
    <div className="terminal-display">
      <div className="terminal-display__content">
        {log.map((line, index) => (
          <p key={index} className="terminal-display__line">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TerminalDisplay;
