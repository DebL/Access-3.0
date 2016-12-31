var Reflux = require('reflux');

var TeacherLessonPlanActions = Reflux.createActions({
    addLessonPlanItem: {},
    clearCreatedLessonPlan: {},
    clearCreatedLessonPlanDeep: {},
    loadLessonPlan: {},
    saveCreatedLessonPlan: {},
    loadLessonPlans: {}
});

module.exports = TeacherLessonPlanActions;
