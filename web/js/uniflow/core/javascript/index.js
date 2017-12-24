import React, { Component } from 'react'
import { Ace } from 'uniflow/components/index'

type Props = {
    bus: Object
}

export default class CoreJavascript extends Component<Props> {
    state = {
        code: ''
    }

    onChange = (code) => {
        this.setState({code: code})
    }

    onDelete = (event) => {
        event.preventDefault()
    }

    render() {
        const { code } = this.state

        return (
            <div className="box box-info">
                <form className="form-horizontal">
                    <div className="box-header with-border">
                        <h3 className="box-title">Javascript</h3>
                        <div className="box-tools pull-right">
                            <a className="btn btn-box-tool" onClick={this.onDelete}><i className="fa fa-times" /></a>
                        </div>
                    </div>
                    <div className="box-body">
                        <div className="form-group">
                            <label htmlFor="code{{ _uid }}" className="col-sm-2 control-label">Code</label>

                            <div className="col-sm-10">
                                <Ace className="form-control" id="code{{ _uid }}" value={code} onChange={this.onChange} placeholder="Code" height="200" mode="javascript" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
