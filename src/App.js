import Rotas from './routes/Rotas';

import { ToastContainer } from 'react-toastify';
import { Segment } from "semantic-ui-react";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Rotas />

      <div style={{ marginTop: "6%" }}>
        <Segment vertical color="grey" size="tiny" textAlign="center">
          &copy; 2023 - Projeto WEB III - IFPE Jaboatão dos Guararapes
        </Segment>
      </div>
    </div>
  );
}

export default App;
