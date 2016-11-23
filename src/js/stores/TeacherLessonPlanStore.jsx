var Reflux = require('reflux'),
    TeacherLessonPlanActions = require('TeacherLessonPlanActions'),
    _ = require('lodash');

module.exports = Reflux.createStore({

    listenables: [ TeacherLessonPlanActions ],

    state: {
        allLessonPlans: [],
        createdLessonPlan: []
    },

    getInitialState: function() {
        return this.state;
    },

    /* callback handler to add a lesson plan
     * item to the lesson plan currently
     * being created or edited.
     */
    onAddLessonPlanItem: function(item) {
        /* need to check if this item has already been added
         * and the user is choosing to deselect it an remove it
         * from the list.
         */
        for (var i=0; i<this.state.createdLessonPlan.length; i++) {
            if (this.state.createdLessonPlan[i].id === item.id) {
                var tempArray = _.cloneDeep(this.state.createdLessonPlan);
                tempArray.splice(i, 1);

                this.state.createdLessonPlan = tempArray;
                this.trigger(this.state);
                return;
            }
        }

        /* if not found above and removed - add it to the array */
        var newLessonPlanItem = {
            id: item.id,
            title: item.title,
            type: item.type
        };

        this.state.createdLessonPlan.push(newLessonPlanItem);
        this.trigger(this.state);
    }
});
