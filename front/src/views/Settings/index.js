import React, {Component} from 'react'
import _ from 'lodash'
import {
    updateSettings,
    commitUpdateSettings
} from '../../reducers/user/actions'
import {connect} from "react-redux";
import {pathTo} from "../../routes";
import {Link} from "react-router-dom";

function copyTextToClipboard(text) {
    let textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
    } catch (err) {
    }

    document.body.removeChild(textArea);
}

class Settings extends Component {
    state = {
        user: {
            apiKey: null,
            username: null,
            firstName: null,
            lastName: null,
        },
        isSaving: false
    }

    componentDidMount() {
        this.setState({user: Object.assign({}, this.props.user)})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({user: Object.assign({}, nextProps.user)})
    }

    onUpdateFirstname = (event) => {
        this.setState({user: {...this.state.user, ...{firstname: event.target.value}}})
    }

    onUpdateLastname = (event) => {
        this.setState({user: {...this.state.user, ...{lastname: event.target.value}}})
    }

    onUpdateUsername = (event) => {
        this.setState({user: {...this.state.user, ...{username: event.target.value}}})
    }

    onUpdateApiKey = (event) => {
        this.setState({user: {...this.state.user, ...{apiKey: event.target.value}}})
    }

    onCopyApiUsage = (event) => {
        const { user } = this.state
        const clipbard = this.getClipboard(user)

        copyTextToClipboard(clipbard)
    }

    onUpdate = (event) => {
        event.preventDefault()

        this.setState({'isSaving': true}, () => {
            this.props.dispatch(updateSettings(this.state.user, this.props.auth.token))
                .then(() => {
                    this.setState({'isSaving': false})
                })
        })
    }

    generateKey = () => {
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        let apiKey = "";
        for (let i = 0; i < 32; i++)
            apiKey += chars.charAt(Math.floor(Math.random() * chars.length));

        this.props
            .dispatch(commitUpdateSettings({...this.props.user, ...{apiKey: apiKey}}))
    }

    getClipboard = (user) => {
        if(user.apiKey) {
            return 'node -e "$(curl -s https://uniflow.io/dist/js/bash.js)" - --api-key=' + user.apiKey
        }

        return null
    }

    render() {
        const { user, isSaving } = this.state
        const clipbard = this.getClipboard(user)

        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Settings
                        <small>Control panel</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><Link to={pathTo('home')}><i className="fa fa-dashboard"/> Home</Link></li>
                        <li className="active">Settings</li>
                    </ol>
                </section>

                {/* Main content */}
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="box box-primary">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Settings</h3>
                                </div>
                                <div className="box-body">
                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            <label htmlFor="settings_firstname" className="col-sm-2 control-label">Firstname</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="settings_firstname"
                                                       value={user.firstname || ''} onChange={this.onUpdateFirstname}
                                                       placeholder="Firstname"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="settings_lastname" className="col-sm-2 control-label">Lastname</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="settings_lastname"
                                                       value={user.lastname || ''} onChange={this.onUpdateLastname}
                                                       placeholder="Lastname"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="settings_username" className="col-sm-2 control-label">Username</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="settings_username"
                                                       value={user.username || ''} onChange={this.onUpdateUsername}
                                                       placeholder="Username"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="settings_apiKey" className="col-sm-2 control-label">Api key</label>
                                            <div className="col-sm-10">
                                            <div className="input-group">
                                                <div className="input-group-btn">
                                                    <button type="button" className="btn btn-default"
                                                            onClick={this.generateKey}>Generate
                                                    </button>
                                                </div>
                                                <input type="text" className="form-control" id="settings_apiKey"
                                                       value={user.apiKey || ''} onChange={this.onUpdateApiKey}
                                                       placeholder="api key"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="settings_key" className="col-sm-2 control-label">Api usage</label>
                                            <div className="col-sm-10">
                                                <div className="input-group">
                                                    <div className="input-group-btn">
                                                        <button type="button" className="btn btn-default"
                                                                onClick={this.onCopyApiUsage}><i className="fa fa-clipboard" />
                                                        </button>
                                                    </div>
                                                    <input type="text" className="form-control" id="settings_key"
                                                           value={clipbard || ''}
                                                           readOnly={true}
                                                           placeholder="api key"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group col-sm-12">
                                            <button type="submit"
                                                    className="btn btn-primary btn-block btn-flat"
                                                    disabled={isSaving}
                                                    onClick={this.onUpdate}>Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default connect(state => {
    return {
        auth: state.auth,
        user: state.user,
    }
})(Settings)