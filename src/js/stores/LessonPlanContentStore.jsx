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
function ContentItem(id, title, type, explicit) {
    this.id = id;
    this.title = title;
    this.type = type;

    this.explicit = explicit ? explicit : false;
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
         * items for readings, video and IC
         */
        var r1 = new ContentItem('r1', 'ANATOMY & PHYSIOLOGY', 'reading');
        var r2 = new ContentItem('r2', 'SEXUALLY TRANSMITTED DISEASES', 'reading');

        var v1 = new ContentItem('v1', 'THE HUMAN BODY', 'video', true);
        var v2 = new ContentItem('v2', 'STDs', 'video');
        var v3 = new ContentItem('v3', 'SEX ED 101', 'video');

        var ic1 = new ContentItem('ic1', 'MORE CONTENT 1', 'interactiveContent');
        var ic2 = new ContentItem('ic2', 'MORE CONTENT 2', 'interactiveContent');
        var ic3 = new ContentItem('ic3', 'MORE CONTENT 3', 'interactiveContent');

        this.state.reading = [];
        this.state.reading.push(r1);
        this.state.reading.push(r2);

        this.state.video = [];
        this.state.video.push(v1);
        this.state.video.push(v2);
        this.state.video.push(v3);

        this.state.interactiveContent = [];
        this.state.interactiveContent.push(ic1);
        this.state.interactiveContent.push(ic2);
        this.state.interactiveContent.push(ic3);

        return this.state;
    }
});
