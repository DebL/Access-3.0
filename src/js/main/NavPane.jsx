var React = require('react'),
    Router = require('react-router'),
    Reflux = require('reflux'),
    NavStore = require('NavStore'),
    Link = Router.Link,
    PropTypes = React.PropTypes,
    FaIcon = require('react-fa');

module.exports = React.createClass({

    displayName: 'NavPane',

    propTypes: {
        pages: PropTypes.array
    },

    mixins: [
        Reflux.connect(NavStore, 'navSt')
    ],

    render: function() {
        var currentPage = '/' + this.props.pageRoutes[this.props.pageRoutes.length - 1].path;

        return (
            <div id="navPane">
                {this.props.pages.map(function(page) {
                    var routeTo = page.route;
                    var isActiveClass = currentPage === routeTo ? 'activeView' : '';

                    return (
                        <div key={page.title} className={'navePaneItem ' + isActiveClass}>
                            <Link to={page.route}>
                                <span className='navPaneIcon'><FaIcon.Icon name={page.icon}/></span>
                                {this.state.navSt.navPaneFull ?
                                    <span>{page.title}</span>
                                : null}
                            </Link>
                        </div>
                    );
                }, this)}
            </div>
        );
    }
});
