var React = require('react'),
    ReactDom = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    HashHistory = ReactRouter.hashHistory,
    LoginView = require('LoginView'),
    StudentDashboardView = require('StudentDashboardView'),
    StudentLessonPlansView = require('StudentLessonPlansView'),
    StudentHomeworkView = require('StudentHomeworkView'),
    StudentCalendarView = require('StudentCalendarView'),
    TeacherLessonPlansView = require('TeacherLessonPlansView'),
    TeacherCreateLessonPlansView = require('TeacherCreateLessonPlansView'),
    TeacherCalendarView = require('TeacherCalendarView'),
    TeacherHomeworkView = require('TeacherHomeworkView'),
	
    App = React.createFactory(require('App'));

ReactDom.render((
    <Router history={HashHistory}>
        <Route path="/" component={App}>
            <IndexRoute components={{ main: LoginView }} />
            <Route path="login" components={{ main: LoginView }} />
            <Route path="studentDashboard" components={{ main: StudentDashboardView }} />
            <Route path="studentLessonPlans" components={{ main: StudentLessonPlansView }} />
            <Route path="studentHomework" components={{ main: StudentHomeworkView }} />
            <Route path="studentCalendar" components={{ main: StudentCalendarView }} />
            <Route path="teacherLessonPlans" components={{ main: TeacherLessonPlansView }}/>
            <Route path="teacherLessonPlans/create" components={{ main: TeacherCreateLessonPlansView }}/>
            <Route path="teacherCalendar" components={{ main: TeacherCalendarView }}/>
            <Route path="teacherHomework" components={{ main: TeacherHomeworkView }}/>
        </Route>
    </Router>
), document.getElementById('appContent'));
