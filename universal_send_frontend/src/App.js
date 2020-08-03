import React, {Component} from 'react';
import './App.scss';
import Header from './Components/Header/Header.js';
import Footer from './Components/Footer/Footer.js';
import Submission from './Components/Submission/Submission.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      submitted: false
    }
  }
  render(){
  return (
    <>
      <div class="App">
          <Header/>
          <div class="body">
            <Submission/>
            
          </div>
          <Footer/>
      </div>
    </>
  );
  }
}

export default App;
