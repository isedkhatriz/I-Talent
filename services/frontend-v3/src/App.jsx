import React from "react";
import Routes from "./routes/Routes";
import AppProvider from "./utils/AppProvider";

import "./styling/accessibility.scss";
import "./styling/custom_antd.scss";
import "./styling/index.scss";

const App = () => (
  <AppProvider>
    <Routes />
  </AppProvider>
);

export default App;
