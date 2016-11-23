/* helper function to convert a lesson
 * plan content id to a lesson plan type
 */
function contentIdToType(id) {
    var letters = id.match(/[a-zA-Z]+/g);
    if (!letters) { return null; }

    switch(letters[0]) {
        case 'r':
            return 'reading';
        case 'v':
            return 'video';
        case 'ic':
            return 'interactiveContent';
        default:
            return null;
    };
}

module.exports = {
    contentIdToType: contentIdToType
};
