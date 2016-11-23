/* Main React App Component */
var React = require('react'),
    Router = require('react-router'),
    Reflux = require('reflux'),
    NavStore = require('NavStore'),
    UserStore = require('UserStore'),
    Mast = require('Mast'),
    NavPane = require('NavPane');

module.exports = React.createClass({

    displayName: 'App',

    mixins: [
        Reflux.connect(NavStore, 'navSt'),
        Reflux.connect(UserStore, 'userSt')
    ],

    getPages: function() {
        var userRole = this.state.userSt.userType;
        var arr;

        if (userRole === 'student') {
            var arr = [
                {title: 'HOME', route: '/studentDashboard', icon: 'home'},
                {title: 'LESSON PLANS', route: '/studentLessonPlans', icon: 'file'},
                {title: 'HOMEWORK', route: '/studentHomework', icon: 'pencil'},
                {title: 'CALENDAR', route: '/studentCalendar', icon: 'calendar-o'},
            ];

            return arr;
        } else if (userRole === 'teacher') {
            var arr = [
                {title: 'LESSON PLANS', route: '/teacherLessonPlans', icon: 'file'},
                {title: 'HOMEWORK', route: '/teacherHomework', icon: 'pencil'},
                {title: 'CALENDAR', route: '/teacherCalendar', icon: 'calendar-o'},
            ];
            
            return arr;
        }

        // we should never hit this case.
        return [];
    },

    render: function() {
        const DEFAULT_ROUTE_LOGIN = "/";
        var navClass = this.state.navSt.navPaneFull ? 'navFull' : 'navSmall';
        navClass = this.props.location.pathname === DEFAULT_ROUTE_LOGIN ? '' : navClass;
        var pages = this.getPages();

        return (
            <div>
                {this.props.location.pathname !== DEFAULT_ROUTE_LOGIN ? <Mast /> : null}

                {this.props.location.pathname !== DEFAULT_ROUTE_LOGIN ?
                    <NavPane 
                        pageRoutes={this.props.routes}
                        pages={pages}
                    />
                : null}

                <div id="containerView" className={navClass}>
                    {this.props.main}
                </div>
            </div>
        );
    }
});
