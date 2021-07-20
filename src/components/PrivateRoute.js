import { Redirect, Route } from "react-router-dom";
import Nav from "./Nav";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = rest;
    return (
        <Route {...rest} render={props => (
            isAuthenticated ? (
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