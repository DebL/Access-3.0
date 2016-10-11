var React = require('react'),
    PropTypes = React.PropTypes,
    Tabs = require('react-bootstrap/lib/Tabs'),
    Tab = require('react-bootstrap/lib/Tab'),
    Button = require('react-bootstrap/lib/Button'),
    FormGroup = require('react-bootstrap/lib/FormGroup'),
    InputGroup = require('react-bootstrap/lib/InputGroup'),
    FormControl = require('react-bootstrap/lib/FormControl'),
    FaIcon = require('react-fa');

/* Component to display the login form content */
var LoginContent = React.createClass({

    displayName: 'LoginContent',

    propTypes: {
        history: PropTypes.object
    },

    userLogin: function() {
        // TODO: check login credentials before logining user
        // in and taking them to the dashboard page
        this.props.history.push('/studentDashboard');
    },

    render: function() {
        return (
            <div className='loginFormContent'>
            <form>
                <FormGroup>
                    <InputGroup>
                        <FormControl type="text" placeholder="EMAIL"/>
                        <InputGroup.Addon>
                            <FaIcon.Icon name="envelope"/>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <FormControl type="text" placeholder="PASSWORD"/>
                        <InputGroup.Addon>
                            <FaIcon.Icon name="lock"/>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <Button bsStyle="info" onClick={this.userLogin}>{'LOGIN'}</Button>
            </form>
            </div>
        );
    }
});

/* Components to display the sign up form content */
var SignUpContent = React.createClass({

    displayName: 'SignUpContent',

    render: function() {
        return (
            <div className='signupFormContent'>
                <form>
                    <FormGroup>
                        <InputGroup>
                            <FormControl type="text" placeholder="EMAIL"/>
                            <InputGroup.Addon></InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <FormControl type="text" placeholder="PASSWORD"/>
                            <InputGroup.Addon></InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <FormControl type="text" placeholder="RE-ENTER PASSWORD"/>
                            <InputGroup.Addon></InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <FormControl type="text" placeholder="X2DF87GR"/>
                            <InputGroup.Addon></InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <Button bsStyle="info">{'SIGN UP'}</Button>
                </form>
            </div>
        );
    }
});

/* Component wrapper for the form content */
var LoginForm = React.createClass({

    displayName: 'LoginForm',

    propTypes: {
        history: PropTypes.object
    },

    render: function() {
        return (
            <div id='loginForm'>
                <div className='tile'>
                    <Tabs defaultActiveKey={1} id="loginTabs">
                        <Tab eventKey={1} title="LOGIN">
                            <LoginContent history={this.props.history}/>
                        </Tab>
                        <Tab eventKey={2} title="SIGN UP">
                            <SignUpContent />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
});

/* Main page content */
module.exports = React.createClass({

	displayName: 'LoginView',

    render: function() {
        return (
            <div id="loginView">
		        <div id='companyHeader'>
				    <span className='headerBold'>{'ACCESS'}</span>
				    <span className='headerLight'>{'3.0'}</span>
			    </div>
			    <LoginForm history={this.props.history}/>
		    </div>
        );
	}
});
