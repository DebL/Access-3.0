var React = require('react'),
    Reflux = require('reflux'),
    ColorTable = require('ColorTable'),
    Colors = require('colors'),
    Conversions = require('conversions'),
    ControlLabel = require('react-bootstrap/lib/ControlLabel')
    FormControl = require('react-bootstrap/lib/FormControl'),
    InputGroup = require('react-bootstrap/lib/InputGroup'),
    Grid = require('react-bootstrap/lib/Grid'),
    Row = require('react-bootstrap/lib/Row'),
    Col = require('react-bootstrap/lib/Col'),
    FaIcon = require('react-fa'),
    DatePicker = require('react-bootstrap-date-picker'),
    LessonPlanContentStore = require('LessonPlanContentStore'),
    TeacherLessonPlanActions = require('TeacherLessonPlanActions'),
    TeacherLessonPlanStore = require('TeacherLessonPlanStore');


/* Main page content */
module.exports = React.createClass({

    displayName: 'TeacherCreateLessonPlansView',

    mixins: [
        Reflux.connect(LessonPlanContentStore, 'contentSt'),
        Reflux.connect(TeacherLessonPlanStore, 'tLessonPlanSt')
    ],

    rowSelected: function(rowItem) {
        /* use the id of the rowItem to match it to the
         * correct lesson plan item to set in the store.
         */

        var type = Conversions.contentIdToType(rowItem.id);
        for (var i=0; i<this.state.contentSt[type].length; i++) {
            var item = this.state.contentSt[type][i];
            if (item.id === rowItem.id) {
                TeacherLessonPlanActions.addLessonPlanItem(item);
                return;
            }
        }
    },

    getColor: function(idx) {
        switch(idx) {
            case 0:
                return Colors.tan;
            case 1:
                return Colors.deepBlue
            default:
                return Colors.teal
        };
    },

    getIcon: function(type) {
        switch(type) {
            case 'reading':
                return <FaIcon.Icon name='book'/>
            case 'video':
                return <FaIcon.Icon name='video-camera'/>
            case 'interactiveContent':
                return <FaIcon.Icon name='mouse-pointer'/>
            default:
                return null;
        }
    },

    render: function() {

        /* TODO - Lesson plan content need to be pulled from the store.
         * Will need to load the store from the data base of
         * available content
         */
         var tableRows = [];
         for (var i=0; i<this.state.contentSt.reading.length; i++) {
            var elem = this.state.contentSt.reading[i];
            tableRows.push({
                id: elem.id,
                title: elem.title,
                color: this.getColor(i),
                deatils: false,
                selectable: true
            });
         }

        return (
            <div id="teacherCreateLessonPlansView">
                <Grid>
                    <Row className='show-grid'>
                    <Col xs={12} md={9}>
                        <div id='lessonPlanHeader' className='pageItem'>
                            <div>
                                <ControlLabel>{'LESSON PLAN NAME'}</ControlLabel>
                                <div className='textInputWrapper'>
                                    <FormControl type='text' />
                                </div>
                            </div>

                            <div>
                                <ControlLabel bsStyle={'titleRight'}>{'DATE'}</ControlLabel>
                                <div className='textInputWrapper'>
                                    <DatePicker id='teacherLessonPlansDate'/>
                                </div>
                            </div>
                        </div>
                
                        <div className='pageItem'>
                            <div className='pageHeader spaceBeneath'>{'READINGS'}</div>
                            <ColorTable rows={tableRows} rowSelectedHandler={this.rowSelected} />
                        </div>

                        <div className='pageItem'>
                            <div className='pageHeader'>{'VIDEOS'}</div>
                        </div> 

                        <div className='pageItem'>
                            <div className='pageHeader'>{'INTERACTIVE CONTENT'}</div>
                        </div>
                    </Col>
                    <Col xs={8} md={3}>
                        <div id='rightPanelContent'>
                            <div className='headerContent'>{'RE-ORDER LESSON PLAN'}</div>
                            {this.state.tLessonPlanSt.createdLessonPlan.map(function(item, i) {
                                return (
                                    <div className='rp__contentItem' key={i}>
                                        <div className='number'>{(i + 1)}</div>
                                        <div className='title'>{item.title}</div>
                                        <div className='type'>
                                            <span className='typeText'>{item.type.toUpperCase()}</span>
                                            <span>{this.getIcon(item.type)}</span>
                                        </div>
                                    </div>
                                );
                            }, this)}
                        </div>
                    </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});
