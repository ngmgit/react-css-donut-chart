import {Badge, Button} from 'antd';
import * as React from 'react';

import './App.css';
import HelpPage from './components/helpPage';

class App extends React.Component {
  constructor(props:any) {
    super(props);
  }

  public render() {
    return (
      <div className="App">
        <HelpPage/>
      </div>
    );
  }
}

export default App;
