/* view for the teachers list of currently created lesson plans */
var React = require('react'),
    Reflux = require('reflux'),
    FaIcon = require('react-fa'),
    ColorTable = require('ColorTable'),
    Colors = require('colors'),
    Button = require('react-bootstrap/lib/Button'),
    TeacherHomeworkActions = require('TeacherHomeworkActions'),
    TeacherHomeworkStore = require('TeacherHomeworkStore');

/* Main page content */
module.exports = React.createClass({

    displayName: 'TeacherHomeworkView',
    mixins: [
        Reflux.connect(TeacherHomeworkStore, 'TeacherHomeworkStore')
    ],
    /* handler for selected the create homework button */
    createHomework: function() {
        this.props.history.push('/teacherHomework/create');
    },

    /* callback handler for a table row being selected */
    rowSelected: function(row) {
        
    },

    componentWillMount: function() {
        TeacherHomeworkActions.loadHomework();
    },

    render: function() {
        /* create the table rows for the color table */
        var homework = this.state.TeacherHomeworkStore.allHomework;
        var tableRows = _.map(homework, function(hw, index) {
            return {
                title: hw.title.toUpperCase(),
                date: 'Due: ' + new Date(hw.date).toLocaleDateString(),
                color: Colors.colorsArray[index % Colors.colorsArray.length],
                details: true,
                selectable: true
            };
        });
        return (
            <div id="teacherLessonPlanView">
                <div className='pageItem'>
                    <div id='titleHeader'>
                        <div className='pageHeader'>{'HOMEWORK'}</div>
                        <Button bsStyle="info" onClick={ this.createHomework }>{'CREATE HOMEWORK'}</Button>
                    </div>
                </div>
                <div className='pageItem'>
                    { tableRows.length > 0 && 
                        <ColorTable rows={tableRows} rowSelectedHandler={ this.rowSelected }/> }
                    { tableRows.length === 0 && !this.state.TeacherHomeworkStore.loading &&
                        <div className='emptyView'>
                            <FaIcon.Icon name='file'/> 
                            <div className='emptyViewText'>{'NO HOMEWORK HAS BEEN CREATED. PLEASE CREATE A HOMEWORK TO GET STARTED.'}</div>
                        </div>
                    }
                    { this.state.TeacherHomeworkStore.loading &&
                        <div className='spin'></div>
                    }
                </div>
            </div>
        );
    }
});
