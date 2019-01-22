import * as React from 'react';

import './App.css';
import HelpPage from './components/helpPage';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <HelpPage/>
      </div>
    );
  }
}

export default App;
