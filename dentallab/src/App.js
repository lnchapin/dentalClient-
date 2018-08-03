import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Quiz from './components/Quiz'
import Footer from './components/Footer'

class App extends Component {
  render() {
    return (
      <div className="App Site">
        <div className='Site-content'>
            <div >
                <Header />
            </div>
            <div className="main">
                <Quiz />
            </div>
        </div>
        <Footer />
    </div>
    );
  }
}

export default App;
