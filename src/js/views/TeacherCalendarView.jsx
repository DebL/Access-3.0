var React = require('react'),
    Moment = require('moment'),
    EventCalendar = require('react-big-calendar');

/* Teacher Calendar content */
module.exports = React.createClass({

    displayName: 'TeacherCalendarView',

    componentWillMount: function() {
        EventCalendar.momentLocalizer(Moment);
    },

    render: function() {
        return (
            <div id="teacherCalendarView">
                <div className='pageItem'>
                    <div className='pageHeader'>{'CALENDAR'}</div>
                </div>
                <div className='pageItem'>
                    <EventCalendar
                        events={[]}
                        startAccessor='startDate'
                        endAccessor='endDate'
                        timeslots={12}
                    />
                </div>
            </div>
        );
    }
});
