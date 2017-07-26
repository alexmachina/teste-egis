import React from 'react'
import { Route, IndexRoute, HashRouter } from 'react-router-dom'
import AxleGroupsTable from './components/axleGroupsTable.js'
import AxleGroupForm from './components/axleGroupForm.js'
import './css/styles.css'

export default class App extends React.Component {
  render() {
    return(
      <div>
        <HashRouter>
          <div>
            <Route exact path="/" component={AxleGroupsTable} />
            <Route exact path="/grupo-de-eixo" component={AxleGroupForm} />
            <Route exact path="/grupo-de-eixo/:id" component={AxleGroupForm} />
          </div>
        </HashRouter>
      </div>
    )
  }
}
