export interface Log {
  type: 'warning' | 'error' | 'info' | 'success';
  message: string;
}

export interface Logger {
  log(log: Log): void;
}
