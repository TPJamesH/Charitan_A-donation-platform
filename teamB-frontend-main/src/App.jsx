import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
//import { AuthStateProvider } from "./components/AppContext/Context";
import AppRouter from "./router/AppRouter";
import AppRouter_NoGuard from "./router/AppRouter_NoGuard";


const App = () => {

  return (
    <Router>
        <div className="flex flex-col h-screen">
          <AppRouter_NoGuard />   
          {/* <AppRouter />      */}
        </div>
    </Router>
  );
};

export default App;
