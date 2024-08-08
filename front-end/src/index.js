import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './Css/component/loading.css'
// import './Css/component/form.css'
import './Css/component/button.css'
import './Css/component/Alert.css'
import './Css/component/google.css'
import './Pages/Auth/Auth.css'
import './Pages/Dashboard/dashboard.css'
import './Components/Dashboard/bars.css'





// react bootstrap
import MenuContext from './Context/MenuContext';
import WindowContext from './Context/WindowContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/base/msJob.css'
import './Css/component/cardjob.css'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <WindowContext>
        <MenuContext>
              <BrowserRouter>
                   <App />
                </BrowserRouter>
        </MenuContext>
   </WindowContext>
      
  </React.StrictMode>
);

