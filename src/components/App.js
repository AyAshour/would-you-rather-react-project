import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import React, { Component } from 'react'
import Dashboard from './Dashboard'
import { LoadingBar } from 'react-redux-loading'
import { Router, Route, Switch } from 'react-router-dom'
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
    return !(Object.keys(auth).length === 0 && auth.constructor === Object)
  }
  render() {
    return (
      <Router history={history} >
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
                />
                <PrivateRoute
                  path='/questions/:id'
                  component={QuestionView}
                  isAuthenticated={this.isAuthenticated()}
                />
                <PrivateRoute
                  path='/leaderboard'
                  component={LeaderBoard}
                  isAuthenticated={this.isAuthenticated()}
                />
                <PrivateRoute
                  path='/add'
                  component={NewQuestion}
                  isAuthenticated={this.isAuthenticated()}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          }
        </div>
      </Router>
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