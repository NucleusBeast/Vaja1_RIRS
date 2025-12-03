import { createContext } from 'react';

 export const ThreadContext = createContext({
     thread: null,
     setThreadContext: () => {}
 });