var Reflux = require('reflux'),
	constants = require('../helpers/constants');

var TeacherHomeworkActions = Reflux.createActions({
    loadHomework: { asyncResult: true }
});

/* Action to get all lesson plans */
TeacherHomeworkActions.loadHomework.listen(function() {
	var docClient = new AWS.DynamoDB.DocumentClient();
    var teacherId = "Katie"; // we will set this as a variable once we have gmail authentication
    // query the lesson plans table for all lesson plans for this teacher

    var dbParams = {
        TableName: constants.DBConstants.HOMEWORK, 
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
            console.log("Unable to query items: " + "\n" + JSON.stringify(err, undefined, 2));
        } else {
        	this.completed(data);
        }
    }.bind(this))
});

module.exports = TeacherHomeworkActions;
