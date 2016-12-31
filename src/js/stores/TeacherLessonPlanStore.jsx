var Reflux = require('reflux'),
    TeacherLessonPlanActions = require('TeacherLessonPlanActions'),
    constants = require('../helpers/constants'),
    _ = require('lodash');

module.exports = Reflux.createStore({

    listenables: [ TeacherLessonPlanActions ],

    state: {
        allLessonPlans: [],
        createdLessonPlan: {
            title: null,
            date: null,
            plan: [],
            lessonPlanId: 0,
            teacherId: null
        },
        nextAvailableLessonPlanId: 0,
        isEditingPlan: false
    },

    getInitialState: function() {
        return this.state;
    },
    /**
     * Loads teacher lesson plans from database
     */
    onLoadLessonPlansCompleted: function(data) {
        var items = data.Items;

        this.state.allLessonPlans = _.map(items, function(item) {
            var date = item.lessonDate;
            var lessonName = item.lessonName || '';
            var plan = item.plan || [];
            var id = item.lessonPlanId || -1;
            var teacherId = item.teacherId || '';

            return {
                title: lessonName,
                date: date,
                plan: plan,
                lessonPlanId: id,
                teacherId: teacherId
            };
        });

        /* update the next available id for lesson plans. This assumes all
         * lesson plans run numerically starting at 1. If they don't then
         * this will be a problem. So we want the next available to be
         * one more than the current count.
         */
        this.state.nextAvailableLessonPlanId = items.length + 1;

        this.trigger(this.state);
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

    /* clear everything for created lesson plan not just the plan */
    onClearCreatedLessonPlanDeep: function() {
        this.state.createdLessonPlan = {
            title: null,
            date: null,
            plan: []
        };

        this.state.nextAvailableLessonPlanId = this.state.allLessonPlans.count + 1;
        this.state.isEditingPlan = false;
        this.trigger(this.state);
    },

    /* save the current lesson plan in the store */
    onSaveCreatedLessonPlanCompleted: function(data, history) {
        history.push('/teacherLessonPlans');
    },

    onDeleteLessonPlanCompleted: function(data, history) {
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
            if (name.toUpperCase() === lp.title.toUpperCase()) {
                var plan = _.cloneDeep(lp);
                this.state.createdLessonPlan = plan;
                this.state.nextAvailableLessonPlanId = plan.lessonPlanId;
                this.state.isEditingPlan = true;
                history.push('/teacherLessonPlans/create');
            }
        }
    }
});
