/* This Store holds all of the content available to the
 * teachers when creating a lesson plan.
 */

var Reflux = require('reflux'),
    LessonPlanContentActions = require('LessonPlanContentActions');


/* Constructor for creating a Lesson Plan
 * Content Item.
 *
 * NOTE - each content item needs to have
 * it's onwn unique ID and should be prefixed
 * with the letter of the type that it is.
 * Ex: 'r1' for reading, 'v2' for video,
 * 'ic3' for interactive content. 
 */
function ContentItem(id, title, type) {
    this.id = id;
    this.title = title;
    this.type = type;
}

module.exports = Reflux.createStore({

    listenables: [ LessonPlanContentActions ],

    state: {
        reading: [],
        video: [],
        interactiveContent: []
    },

    getInitialState: function() {

        /* just for testing until we
         * get data - create some fake content
         * items
         */
        var r1 = new ContentItem('r1', 'ANATOMY & PHYSIOLOGY', 'reading');
        var r2 = new ContentItem('r2', 'SEXUALLY TRANSMITTED DISEASES', 'reading');

        this.state.reading.push(r1);
        this.state.reading.push(r2);

        return this.state;
    }
});
