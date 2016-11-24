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
            lessonPlanDate: d.toLocaleDateString(),
            dateValue: d.toISOString(),
            itemSelected: {}
        };
    },

    rowSelected: function(id) {
        /* use the id of the rowItem to match it to the
         * correct lesson plan item to set in the store.
         */

        var type = Conversions.contentIdToType(id);
        for (var i=0; i<this.state.contentSt[type].length; i++) {
            var item = this.state.contentSt[type][i];
            if (item.id === id) {
                TeacherLessonPlanActions.addLessonPlanItem(item);
                break;
            }
        }

        var tempObj = _.cloneDeep(this.state.itemSelected);
        if (id in tempObj) {
            tempObj[id].highlighted = !(tempObj[id].highlighted); 
        } else {
            tempObj[id] = { highlighted: true };
        }

        this.setState({
            itemSelected: tempObj
        });
    },

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

    lessonPlanName: function(e) {
        this.setState({
            lessonPlanName: e.target.value
        });
    },

    dateChange: function(value, formattedValue) {
        this.setState({
            dateValue: value,
            lessonPlanDate: formattedValue
        });
    },

    clearLesson: function() {
        TeacherLessonPlanActions.clearCreatedLessonPlan();

        this.setState({
            itemSelected: {}
        });
    },

    saveLesson: function() {
        if (this.state.lessonPlanName === '') {
            alert('Please enter a Lesson Plan Name to save this plan');
        } else if (this.state.lessonPlanDate === null) {
            alert('Please enter a Lesson Plan Date to save this plan');
        } else {
            TeacherLessonPlanActions.saveCreatedLessonPlan(this.state.lessonPlanName,
                this.state.lessonPlanDate, this.props.history);
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
                title: elem.title.toUpperCase(),
                color: this.getColor(i),
                deatils: false,
                selectable: true,
                highlight: elem.id in this.state.itemSelected ? 
                    this.state.itemSelected[elem.id].highlighted : false
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
                                    <FormControl type='text' onChange={this.lessonPlanName}/>
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
                                    var selected = (vid.id in this.state.itemSelected) &&
                                        this.state.itemSelected[vid.id].highlighted;
                                    var highlightClass = selected ? 'highlight' : '';

                                    return (
                                        <div key={i} className={'videoTile tileLight ' + highlightClass}
                                            onClick={this.rowSelected.bind(this, vid.id)}>
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

                            {this.state.tLessonPlanSt.createdLessonPlan.length > 0 ?
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
