import React from 'react'
import IphoneDisplayer from './components/IphoneDisplayer/IphoneDisplayer'
import PixelDisplayer from './components/PixelDisplayer/PixelDisplayer'

function App() {
  return (
    <div className="App">
       <IphoneDisplayer  backgorundFill='#cacaca'/>
       <PixelDisplayer  backgorundFill='#cacaca'/>
    </div>
  );
}

export default App;
