import React from 'react';
import { Button } from 'reactstrap';
import { clearLog } from '../../reducers/appReducer';
import { useAppDispatch, useAppSelector } from '../../store';

const ConsoleScene = () => {
  const dispatch = useAppDispatch();
  const logList = useAppSelector(state => state.app.log);

  const onClick = () => {
    dispatch(clearLog());
  };

  return (
    <div className="terminal-display">
      <Button color="info" onClick={onClick}>
        clear
      </Button>
      <div className="terminal-display__content">
        {logList.map((line, index) => (
          <p key={index} className="terminal-display__line">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ConsoleScene;
