var Reflux = require('reflux'),
    UserActions = require('UserActions');

module.exports = Reflux.createStore({

    listenables: [ UserActions ],

    state: {
        userType: 'teacher'
    },

    getInitialState: function() {
        return this.state;
    },

    onSetUserType: function(type) {
        this.state.userType = type;
        this.trigger(this.state);
    }
});
