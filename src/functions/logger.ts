import { addLog, clearLog } from '../reducers/appReducer';
import { AppDispatch } from '../store';

export default class Logger {
  dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  add(message: string) {
    this.dispatch(addLog(message));
  }

  clear() {
    this.dispatch(clearLog());
  }
}
