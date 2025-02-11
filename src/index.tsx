import React from 'react';
import ReactDOM from 'react-dom';
import "@patternfly/react-core/dist/styles/base.css";
import App from "./app/app";
import {Services} from "./app/services";


const renderApp = () => ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
Services.getAuthService().authenticateAndRender(renderApp);

