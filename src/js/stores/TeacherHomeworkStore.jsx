var Reflux = require('reflux'),
    TeacherHomeworkActions = require('TeacherHomeworkActions'),
    constants = require('../helpers/constants'),
    _ = require('lodash');

module.exports = Reflux.createStore({

    listenables: [ TeacherHomeworkActions ],

    state: {
        allHomework: [],
        createdHomework: {
            title: null,
            date: null,
            plan: [],
            homeworkId: 0,
            teacherId: null
        }
    },
    getInitialState: function() {
        return this.state;
    },
    /**
     * Loads teacher homework from database
     */
    onLoadHomeworkCompleted: function(data) {
        var items = data.Items;

        this.state.allHomework = _.map(items, function(item) {
            var dueDate = item.dueDate;
            var homeworkTitle = item.title || '';
            var id = item.homeworkId || -1;
            var teacherId = item.teacherId || '';

            return {
                title: homeworkTitle,
                date: dueDate,
                homeworkId: id,
                teacherId: teacherId
            };
        });

        this.trigger(this.state);
    }
});
