var Reflux = require('reflux'),
    NavActions = require('NavActions');

module.exports = Reflux.createStore({

    listenables: [ NavActions ],

    state: {
        navPaneFull: true
    },

    getInitialState: function() {
        return this.state;
    },

    /* handler to toggle the nave pane state */
    onToggleNavPane: function() {
        this.state.navPaneFull = !(this.state.navPaneFull);
        this.trigger(this.state);
    }
});
