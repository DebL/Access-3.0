var Reflux = require('reflux');

var TeacherLessonPlanActions = Reflux.createActions({
    addLessonPlanItem: {},
    clearCreatedLessonPlan: {},
    loadLessonPlan: {},
    saveCreatedLessonPlan: {},
    loadLessonPlans: {}
});

module.exports = TeacherLessonPlanActions;
