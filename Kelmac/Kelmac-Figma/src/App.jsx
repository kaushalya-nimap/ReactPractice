import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './component/Navbar'
import Page1 from './pages/page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page5 from './pages/Page5';
import Page6 from './pages/Page6';
import CardPage from './pages/CardPage';
import Page4 from './pages/Page4';
import CardPage2 from './pages/CardPage2';

const App = () => {
  return (
    <div className='global'>
      <Navbar/>
      <Page1/>
      <div className='bottom-margin'/>
      <Page2/>
      <div className='bottom-margin'/>
      <CardPage/>
      <Page3/>
      <Page4/>
      <CardPage2/>
      <Page5/>
      <Page6/>
    </div>
  )
}

export default App