import { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import Nav from "./Nav";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, auth } = rest;
    let b = !(Object.keys(auth).length === 0 && auth.constructor === Object)
    console.log('private rouuuuuuuuuuute', auth, b);

    return (
        <Route {...rest} render={props => (
            b ? (
                <div>
                    <Nav />
                    <Component {...props} />
                </div>
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
            )
        )}
        />
    );
};

/*

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
        isAuthenticated:
            !(Object.keys(authedUser).length === 0 && authedUser.constructor === Object)
    };
}
*/
export default PrivateRoute;