import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import React, { Component, Fragment } from 'react'
import Dashboard from './Dashboard'
import { LoadingBar } from 'react-redux-loading'
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom'
import QuestionView from './QuestionView'
import LeaderBoard from './LeaderBoard'
import NewQuestion from './NewQuestion'
import NotFound from './NotFound'
import Login from './Login'
import { history } from './History'
import PrivateRoute from './PrivateRoute'


class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  isAuthenticated = () => {
    const auth = this.props.authedUser
    console.log("authhhhhhh", auth, !(Object.keys(auth).length === 0 && auth.constructor === Object))

    return !(Object.keys(auth).length === 0 && auth.constructor === Object)
  }
  render() {
    return (
      <BrowserRouter history={history} >
        <Fragment>
          <LoadingBar />
          <div className='container'>
            {this.props.loading === true
              ? null
              :
              <div>
                <Switch>
                  <Route path='/login' component={Login} />
                  <PrivateRoute
                    exact
                    path="/"
                    component={Dashboard}
                    isAuthenticated={this.isAuthenticated()}
                    auth={this.props.authedUser}
                  />
                  <PrivateRoute
                    path='/questions/:id'
                    isAuthenticated={this.isAuthenticated()}
                    auth={this.props.authedUser}
                    component={QuestionView}
                  />
                  <PrivateRoute
                    path='/leaderboard'
                    component={LeaderBoard}
                    isAuthenticated={this.isAuthenticated()}
                    auth={this.props.authedUser}
                  />
                  <PrivateRoute
                    path='/add'
                    isAuthenticated={this.isAuthenticated()}
                    component={NewQuestion}
                    auth={this.props.authedUser}
                  />
                  <Route component={NotFound} />
                </Switch>
              </div>
            }
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser
  }
}

export default connect(mapStateToProps)(App)