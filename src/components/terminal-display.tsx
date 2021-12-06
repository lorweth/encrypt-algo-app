import React, { useContext } from 'react';
import { useAppSelector } from '../hooks/hook';
import './terminal-style.css';

const TerminalDisplay = () => {
  const log = useAppSelector(state => state.app.log);
  return (
    <div className="terminal-display">
      <div className="terminal-display__content" dangerouslySetInnerHTML={{ __html: log }}></div>
    </div>
  );
};

export default TerminalDisplay;
