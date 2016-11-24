var React = require('react'),
    Reflux = require('reflux'),
    ColorTable = require('ColorTable'),
    Colors = require('colors'),
    Button = require('react-bootstrap/lib/Button'),
    TeacherLessonPlanStore = require('TeacherLessonPlanStore');

/* Main page content */
module.exports = React.createClass({

    displayName: 'TeacherLessonPlansView',

    mixins: [
        Reflux.connect(TeacherLessonPlanStore, 'tLessonPlanSt')
    ],

    createLesson: function() {
        this.props.history.push('/teacherLessonPlans/create');
    },

    render: function() {
        var tableRows = [];
        for (var i=0; i<this.state.tLessonPlanSt.allLessonPlans.length; i++) {
            var elem = this.state.tLessonPlanSt.allLessonPlans[i];
            tableRows.push({
                title: elem.name.toUpperCase(),
                date: elem.date,
                color: Colors.colorsArray[i],
                details: true,
                selectable: false
            });
        }

        return (
            <div id="teacherLessonPlanView">
                <div className='pageItem'>
                    <div id='titleHeader'>
                        <div className='pageHeader'>{'MY LESSON PLANS'}</div>
                        <Button bsStyle="info" onClick={this.createLesson}>{'CREATE LESSON'}</Button>
                    </div>
                </div>
                <div className='pageItem'>
                    <ColorTable rows={tableRows}/>
                </div>
            </div>
        );
    }
});
