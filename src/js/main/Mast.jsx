var React = require('react'),
    Reflux = require('reflux'),
    NavActions = require('NavActions'),
    FaIcon = require('react-fa');

module.exports = React.createClass({

    displayName: 'Mast',

    toggleNavPane: function() {
        NavActions.toggleNavPane();
    },

    render: function() {
        return (
            <div id='mast'>
                <span>
                    <span>
                        <FaIcon.Icon className="menuIcon" name="bars" onClick={this.toggleNavPane}/>
                    </span>
                    <span className='mastHeader headerBold'>{'ACCESS'}</span>
                    <span className='mastHeader headerLight'>{'3.0'}</span>
                </span>
                <span>
                    <span className='mastUserName'>{'USER NAME'}</span>
                    <span className='userNameIcon'>
                        <FaIcon.Icon name="chevron-down"/> 
                    </span>
                </span>
            </div>
        );
    }
});
