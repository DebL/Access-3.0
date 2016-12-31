var Reflux = require('reflux'),
	constants = require('../helpers/constants');

var TeacherLessonPlanActions = Reflux.createActions({
    addLessonPlanItem: {},
    clearCreatedLessonPlan: {},
    clearCreatedLessonPlanDeep: {},
    deleteLessonPlan: {asyncResult: true},
    loadLessonPlan: {},
    loadLessonPlans: {asyncResult: true},
    saveCreatedLessonPlan: {asyncResult: true}
});

/* Action to get all lesson plans */
TeacherLessonPlanActions.loadLessonPlans.listen(function() {
	var docClient = new AWS.DynamoDB.DocumentClient();
    var teacherId = "Katie"; // we will set this as a variable once we have gmail authentication
    // query the lesson plans table for all lesson plans for this teacher

    var dbParams = {
        TableName: constants.DBConstants.LESSON_PLANS, 
        KeyConditionExpression: "#teacherId = :teacherId",
        ExpressionAttributeNames:{
            "#teacherId": "teacherId"
        },
        ExpressionAttributeValues: {
            ":teacherId": teacherId
        }
    };

    docClient.query(dbParams, function(err, data) {
        if (err) {
            console.log("Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2));
        } else {
        	this.completed(data);
        }
    }.bind(this))
});

/* Action to save a lesson plan creation or edit */
TeacherLessonPlanActions.saveCreatedLessonPlan.listen(function(itemParams, history) {
	var docClient = new AWS.DynamoDB.DocumentClient();

    docClient.put(itemParams, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            this.completed(data, history);
        }
    }.bind(this));
});

/* Action to delete a lesson plan */
TeacherLessonPlanActions.deleteLessonPlan.listen(function(itemParams, history) {
	var docClient = new AWS.DynamoDB.DocumentClient();
	
    docClient.delete(itemParams, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            this.completed(data, history);
        }
    }.bind(this));
});

module.exports = TeacherLessonPlanActions;
