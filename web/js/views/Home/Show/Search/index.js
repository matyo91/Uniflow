import React, { Component } from 'react'
import { Select2 } from 'uniflow/components/index'
import {connect} from 'react-redux'
import components from 'uniflow/uniflow/components';

class Search extends Component {
    state = {
        search: 'javascript'
    }

    onSubmit = (event) => {
        event.preventDefault()
        
        if (this.props.onPush) {
            this.props.onPush(this.state.search);
        }
    }

    onChange = (value) => {
        this.setState({search: value})
    }

    render() {
        const { componentLabels } = this.props
        const { search } = this.state

        return (
            <form className="form-horizontal" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="search{{ _uid }}" className="col-sm-2 control-label">Component</label>

                    <div className="col-sm-9">
                        <Select2 value={search} onChange={this.onChange} className="form-control" id="search{{ _uid }}" style={{width: '100%'}}>
                            {Object.keys(componentLabels).map((component) => (
                                <option key={component} value={component}>{ componentLabels[component] }</option>
                            ))}
                        </Select2>
                    </div>
                    <div className="col-sm-1">
                        <button type="submit" className="btn btn-info pull-right">OK</button>
                    </div>
                </div>
            </form>
        )
    }
}

const getComponentLabels = (userComponents) => {
    let componentLabels = {}

    for(let i = 0; i < userComponents.length; i++) {
        let key = userComponents[i]

        componentLabels[key] = components[key].tags().join(' - ') + ' : ' + key
    }

    return componentLabels
}

export default connect(state => {
    return {
        componentLabels: getComponentLabels(state.user.components),
    }
})(Search)