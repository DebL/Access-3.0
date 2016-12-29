var Reflux = require('reflux'),
    TeacherLessonPlanActions = require('TeacherLessonPlanActions'),
    _ = require('lodash');

module.exports = Reflux.createStore({

    listenables: [ TeacherLessonPlanActions ],

    state: {
        allLessonPlans: [],
        createdLessonPlan: {
            name: null,
            date: null,
            plan: []
        }
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
        for (var i=0; i<this.state.createdLessonPlan.plan.length; i++) {
            if (this.state.createdLessonPlan.plan[i].id === item.id) {
                var tempArray = _.cloneDeep(this.state.createdLessonPlan.plan);
                tempArray.splice(i, 1);

                this.state.createdLessonPlan.plan = tempArray;
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

        this.state.createdLessonPlan.plan.push(newLessonPlanItem);
        this.trigger(this.state);
    },

    /* clear store data for the current lesson plan */
    onClearCreatedLessonPlan: function() {
        this.state.createdLessonPlan.plan = [];
        this.trigger(this.state);
    },

    /* save the current lesson plan in the store */
    onSaveCreatedLessonPlan: function(name, date, history) {

        /* TODO - right now anything gets added
         * as a lesson plan even if you are editing
         * an existing plan and re saving it it gets
         * added as a new one. Need to check if the one
         * being edited already exists and update it instead
         * of creating a new one
         */

        this.state.createdLessonPlan.name = name;
        this.state.createdLessonPlan.date = date;

        var plan = _.cloneDeep(this.state.createdLessonPlan);
        this.state.allLessonPlans.push(plan);

        this.state.createdLessonPlan.name = null;
        this.state.createdLessonPlan.date = null;
        this.state.createdLessonPlan.plan = [];
        this.trigger(this.state);

        history.push('/teacherLessonPlans');
    },

    /* TODO - Right now we are matching the lesson plan off of
     * the name - but we need to update that to go off of
     * a unique ID because lesson plans could have the same
     * name. This needs to be done when the lesson plans
     * get a unique ID
     */
    onLoadLessonPlan: function(name, history) {
        for (var i=0; i<this.state.allLessonPlans.length; i++) {
            var lp = this.state.allLessonPlans[i];
            if (name.toUpperCase() === lp.name.toUpperCase()) {
                this.state.createdLessonPlan = _.cloneDeep(lp);
                history.push('/teacherLessonPlans/create');
            }
        }
    }
});
