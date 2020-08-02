import React from 'react';
import './App.scss';
import Header from './Components/Header/Header.js';
import Footer from './Components/Footer/Footer.js';
import Submission from './Components/Submission/Submission.js';
function App() {
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

export default App;
