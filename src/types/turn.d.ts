declare module 'turn.js' {
  interface JQuery {
    turn(options?: any): JQuery;
    turn(command: string, value?: any): JQuery;
  }
} 