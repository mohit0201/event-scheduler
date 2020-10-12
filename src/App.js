import React from 'react'
import SignUp from './components/SignUp'
import Login from './components/Login'
import { Route, Switch } from 'react-router-dom'
import Welcome from './components/Welcome'
import AdminHome from './components/AdminHome'
import UserHome from './components/UserHome'
import { connect } from 'react-redux'

function App(props) {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        {props.isAuthenticated && props.role === 'ADMIN' && (
          <Route exact path="/adminhome" component={AdminHome} />
        )}
        {props.isAuthenticated && props.role === 'USER' && (
          <Route exact path="/userhome" component={UserHome} />
        )}
        <Route path="*" component={() => '404 NOT FOUND'}></Route>
      </Switch>
    </>
  )
}

function mapStateToProps(globalState) {
  return {
    isAuthenticated: globalState.isAuthenticated,
    role: globalState.role,
  }
}

export default connect(mapStateToProps, {})(App)
