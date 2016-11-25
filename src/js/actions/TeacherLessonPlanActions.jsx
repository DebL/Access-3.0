var Reflux = require('reflux');

var TeacherLessonPlanActions = Reflux.createActions({
    addLessonPlanItem: {},
    clearCreatedLessonPlan: {},
    loadLessonPlan: {},
    saveCreatedLessonPlan: {},
});

module.exports = TeacherLessonPlanActions;
