var React = require('react'),
    ColorTable = require('ColorTable'),
    Colors = require('colors'),
    Button = require('react-bootstrap/lib/Button');

/* Main page content */
module.exports = React.createClass({

    displayName: 'TeacherLessonPlansView',

    createLesson: function() {
        this.props.history.push('/teacherLessonPlans/create');
    },

    render: function() {
        return (
            <div id="teacherLessonPlanView">
                <div className='pageItem'>
                    <div id='titleHeader'>
                        <div className='pageHeader'>{'MY LESSON PLANS'}</div>
                        <Button bsStyle="info" onClick={this.createLesson}>{'CREATE LESSON'}</Button>
                    </div>
                </div>
                <div className='pageItem'>
                    <ColorTable rows={[
                        {'title': 'title 1', 'date': '1/2/16', 'color': Colors.teal, 'selectable': true},
                        {'title': 'title 2', 'color': Colors.peach, 'selectable': false}
                    ]}/>
                </div>
            </div>
        );
    }
});
