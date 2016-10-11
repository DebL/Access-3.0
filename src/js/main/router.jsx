var React = require('react'),
	ReactDom = require('react-dom'),
	ReactRouter = require('react-router'),
	Router = ReactRouter.Router,
	Route = ReactRouter.Route,
	IndexRoute = ReactRouter.IndexRoute,
	HashHistory = ReactRouter.hashHistory,
	LoginView = require('LoginView'),
	StudentDashboardView = require('StudentDashboardView'),
	
	App = React.createFactory(require('App'));

ReactDom.render((
	<Router history={HashHistory}>
		<Route path="/" component={App}>
			<IndexRoute components={{ main: LoginView }} />
			<Route path="login" components={{ main: LoginView }} />
			<Route path="studentDashboard" components={{ main: StudentDashboardView }} />
		</Route>
	</Router>
), document.getElementById('appContent'));
