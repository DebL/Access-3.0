/* View for teachers to created a new lesson plan or edit an existing one */
var React = require('react'),
    Reflux = require('reflux'),
    _ = require('lodash'),
    ColorTable = require('ColorTable'),
    Colors = require('colors'),
    Conversions = require('conversions'),
    ControlLabel = require('react-bootstrap/lib/ControlLabel')
    FormControl = require('react-bootstrap/lib/FormControl'),
    InputGroup = require('react-bootstrap/lib/InputGroup'),
    Grid = require('react-bootstrap/lib/Grid'),
    Row = require('react-bootstrap/lib/Row'),
    Col = require('react-bootstrap/lib/Col'),
    Button = require('react-bootstrap/lib/Button'),
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

    getInitialState: function() {
        var d = new Date();
        return {
            lessonPlanName: '',
            dateValue: d.toISOString()
        };
    },

    componentDidMount: function() {
        /* NOTE - we generally should not be setting the state
         * in componentDidMount - might want to find a better
         * way to do this
         */
        var d = new Date();
        var date = this.state.tLessonPlanSt.createdLessonPlan.date ?
            this.state.tLessonPlanSt.createdLessonPlan.date : d.toISOString();
        var name = this.state.tLessonPlanSt.createdLessonPlan.name ?
            this.state.tLessonPlanSt.createdLessonPlan.name : '';

        this.setState({
            lessonPlanName: name,
            dateValue: date
        });
    },

    /* element selected to add to the lesson plan */
    rowSelected: function(item) {
        /* use the id of the rowItem to match it to the
         * correct lesson plan item to set in the store.
         */
        var id = item.id;
        var type = Conversions.contentIdToType(id);
        for (var i=0; i<this.state.contentSt[type].length; i++) {
            var item = this.state.contentSt[type][i];
            if (item.id === id) {
                TeacherLessonPlanActions.addLessonPlanItem(item);
                break;
            }
        }
    },

    /* temp to get a color for the color table */
    getColor: function(idx) {
        switch(idx) {
            case 0:
                return Colors.colors.tan;
            case 1:
                return Colors.colors.deepBlue
            default:
                return Colors.colors.teal
        };
    },

    /* get the correct icon depending on the item type */
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

    /* onChange handler for a lesson plan name */
    lessonPlanName: function(e) {
        this.setState({
            lessonPlanName: e.target.value
        });
    },

    /* on change handler for the calendar picker */
    dateChange: function(value, formattedValue) {
        this.setState({
            dateValue: value
        });
    },

    /* clear the selected lesson items */
    clearLesson: function() {
        TeacherLessonPlanActions.clearCreatedLessonPlan();

        this.setState({
            itemSelected: {}
        });
    },

    /* save the current lesson */
    saveLesson: function() {
        if (this.state.lessonPlanName === '') {
            alert('Please enter a Lesson Plan Name to save this plan');
        } else if (this.state.dateValue === null) {
            alert('Please enter a Lesson Plan Date to save this plan');
        } else {
            TeacherLessonPlanActions.saveCreatedLessonPlan(this.state.lessonPlanName,
                this.state.dateValue, this.props.history);
        }
    },

    /* check if an item is in the current lesson plan or not */
    isInLessonPlan: function(id) {
        for (var i=0; i<this.state.tLessonPlanSt.createdLessonPlan.plan.length; i++) {
            var item = this.state.tLessonPlanSt.createdLessonPlan.plan[i];
            if (item.id === id) {
                return true;
            }
        }

        return false;
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
                title: elem.title.toUpperCase(),
                color: this.getColor(i),
                deatils: false,
                selectable: true,
                highlight: this.isInLessonPlan(elem.id)
            });
         }

        return (
            <div id="teacherCreateLessonPlansView">
                <Grid>
                    <Row className='show-grid'>
                    <Col id='column1' xs={12} md={9}>
                        <div id='lessonPlanHeader' className='pageItem'>
                            <div>
                                <ControlLabel>{'LESSON PLAN NAME'}</ControlLabel>
                                <div className='textInputWrapper'>
                                    <FormControl type='text' value={this.state.lessonPlanName}
                                        onChange={this.lessonPlanName}/>
                                </div>
                            </div>

                            <div>
                                <ControlLabel bsStyle={'titleRight'}>{'DATE'}</ControlLabel>
                                <div className='textInputWrapper'>
                                    <DatePicker id='teacherLessonPlansDate' value={this.state.dateValue}
                                        onChange={this.dateChange}/>
                                </div>
                            </div>
                        </div>
                
                        <div className='pageItem'>
                            <div className='pageHeader spaceBeneath'>{'READINGS'}</div>
                            <ColorTable rows={tableRows} rowSelectedHandler={this.rowSelected} />
                        </div>

                        <div className='pageItem'>
                            <div className='pageHeader spaceBeneath'>{'VIDEOS'}</div>
                            <div id='videoRow'>
                                {this.state.contentSt.video.map(function(vid, i) {
                                    var selected = this.isInLessonPlan(vid.id);
                                    var highlightClass = selected ? 'highlight' : '';

                                    return (
                                        <div key={i} className={'videoTile tileLight ' + highlightClass}
                                            onClick={this.rowSelected.bind(this, vid)}>
                                            <div className='header'>
                                                <div className='title'>{vid.title}</div>
                                                {vid.explicit ? <div className='explicit'>{'EXPLICIT'}</div> : null}
                                            </div>
                                            <div className='embedVideo'></div>

                                            {selected ?
                                                <div className='selectedCheck'>
                                                    <FaIcon.Icon name='check-circle-o' />
                                                </div>
                                            : null}
                                        </div>
                                    );
                                }, this)}
                            </div>
                        </div> 

                        <div className='pageItem'>
                            <div className='pageHeader'>{'INTERACTIVE CONTENT'}</div>
                        </div>
                    </Col>
                    <Col xs={8} md={3}>
                        <div id='rightPanelContent'>
                            <div className='headerContent'>{'RE-ORDER LESSON PLAN'}</div>
                            {this.state.tLessonPlanSt.createdLessonPlan.plan.map(function(item, i) {
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

                            {this.state.tLessonPlanSt.createdLessonPlan.plan.length > 0 ?
                            <div id='rp__footer'>
                                <Button bsStyle='primary' onClick={this.clearLesson}>{'CLEAR'}</Button>
                                <Button bsStyle='info' onClick={this.saveLesson}>{'SAVE'}</Button>
                            </div>
                            : null}
                        </div>
                    </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});
