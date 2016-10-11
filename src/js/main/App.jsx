/* Main React App Component */
var React = require('react'),
	Router = require('react-router'),
    Reflux = require('reflux'),
    NavStore = require('NavStore'),
	Mast = require('Mast'),
	NavPane = require('NavPane');

module.exports = React.createClass({

	displayName: 'App',

    mixins: [
        Reflux.connect(NavStore, 'navSt')
    ],

	render: function() {
		const DEFAULT_ROUTE_LOGIN = "/";
        var navClass = this.state.navSt.navPaneFull ? 'navFull' : 'navSmall';
        navClass = this.props.location.pathname === DEFAULT_ROUTE_LOGIN ? '' : navClass;

		return (
			<div>
				{this.props.location.pathname !== DEFAULT_ROUTE_LOGIN ? <Mast /> : null}

				{this.props.location.pathname !== DEFAULT_ROUTE_LOGIN ?
                    <NavPane 
                        pageRoutes={this.props.routes}
                        pages={[
                            {title: 'HOME', route: '/studentDashboard', icon: 'home'},
                            {title: 'LESSON PLANS', route: '', icon: 'file'},
                            {title: 'HOMEWORK', route: '', icon: 'pencil'},
                            {title: 'CALENDAR', route: '', icon: 'calendar-o'},
                        ]}
                    />
                : null}

                <div id="containerView" className={navClass}>
				    {this.props.main}
                </div>
			</div>
		);
	}
});
