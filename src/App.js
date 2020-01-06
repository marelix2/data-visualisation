import React from 'react'
import IphoneDisplayer from './components/IphoneDisplayer/IphoneDisplayer'
import PixelDisplayer from './components/PixelDisplayer/PixelDisplayer'
import ViewSwitcher from './components/ViewSwitcher/ViewSwitcher'
import DataContext from './context/context'
import contextState from './context/state'
import HarmonicMean from './components/HarmonicMean/HarmonicMean'
import StandardDeviation from './components/StandardDeviation/StandardDeviation'
import KurtozConcentration from './components/KurtozConcentration/KurtozConcentration'
import AsymmetryMeasure from './components/AsymmetryMeasure/AsymmetryMeasure'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function App() {

  return (
    <div className="App" style={{ display: 'flex'}}>
      <Router>
        <DataContext.Provider value={contextState}>
          <Switch>
            <Route path='/harmonic-mean'>
              <HarmonicMean/>
           </Route>
           <Route path='/standard-deviation'>
              <StandardDeviation/>
           </Route>
           <Route path='/kurtoz-concentration'>
              <KurtozConcentration/>
           </Route>
           <Route path='/asymmetry-measure'>
              <AsymmetryMeasure/>
           </Route>
            <Route exact path="/">
              <IphoneDisplayer backgorundFill='#cacaca' />
              <PixelDisplayer backgorundFill='#cacaca' />
              <ViewSwitcher />
            </Route>
          </Switch>
        </DataContext.Provider>
      </Router>
    </div>
  );
}

export default App;
