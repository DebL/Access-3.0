/* view for the teachers list of currently created lesson plans */
var React = require('react'),
    Reflux = require('reflux'),
    FaIcon = require('react-fa');

/* Main page content */
module.exports = React.createClass({

    displayName: 'TeacherHomeworkView',

    render: function() {
        return (
            <div id="teacherLessonPlanView">
                <div className='pageItem'>
                    <div id='titleHeader'>
                        <div className='pageHeader'>{'HOMEWORK'}</div>
                        <Button bsStyle="info" onClick={this.createLesson}>{'CREATE HOMEWORK'}</Button>
                    </div>
                </div>
                <div className='pageItem'>
                    <div className='emptyView'>
                        <FaIcon.Icon name='pencil'/> 
                        <div className='emptyViewText'>{'NO HOMEWORKS HAVE BEEN CREATED. PLEASE CREATE A HOMEWORK TO GET STARTED.'}</div>
                    </div>
                </div>
            </div>
        );
    }
});
