import React from 'react'
import IphoneDisplayer from './components/IphoneDisplayer/IphoneDisplayer'
import PixelDisplayer from './components/PixelDisplayer/PixelDisplayer'
import DataContext from './context/context'
import contextState from './context/state'

function App() {

  return (
    <div className="App">
      <DataContext.Provider value={contextState}>
       <IphoneDisplayer  backgorundFill='#cacaca'/>
       <PixelDisplayer  backgorundFill='#cacaca'/>
       </DataContext.Provider>
    </div>
  );
}

export default App;
