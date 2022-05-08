import React from "react"
import MainRoutes from "routes/main-routes";
import { SessionContextProvider } from './hooks/session-context/session-context-provider';

function App() {
  return (
    <div className="App">
      <SessionContextProvider>
        <MainRoutes />
      </SessionContextProvider>
    </div>
  );
}

export default App;
