import React, { Component } from 'react'
import { onCode, onExecute } from './runner'
import { FlowHeader, Flows } from '@uniflow-io/uniflow-client/src/components'
import createStore from '@uniflow-io/uniflow-client/src/utils/create-store'
import flows from '@uniflow-io/uniflow-client/src/reducers/flows'
import {
  commitPushFlow,
  commitPopFlow,
  commitUpdateFlow,
} from '@uniflow-io/uniflow-client/src/reducers/flows/actions'
import {
  setBusEvents,
  componentDidMount,
  componentWillUnmount,
  componentDidUpdate,
  onExecuteHelper,
  onUpdate,
  onDelete,
} from '@uniflow-io/uniflow-client/src/utils/flow'

class WhileFlow extends Component {
  state = {
    isRunning: false,
    conditionFlows: [],
    conditionRunIndex: null,
    executeFlows: [],
    executeRunIndex: null,
  }

  constructor(props) {
    super(props)

    this.store = {
      conditionFlows: [],
      executeFlows: [],
    }
    setBusEvents(
      {
        deserialize: this.deserialize,
        code: onCode.bind(this),
        execute: onExecuteHelper(onExecute.bind(this), this),
      },
      this
    )
  }

  componentDidMount() {
    componentDidMount(this)
  }

  componentWillUnmount() {
    componentWillUnmount(this)
  }

  componentDidUpdate(prevProps) {
    componentDidUpdate(prevProps, this)
  }

  serialize = () => {
    return {
      condition: this.state.conditionFlows.map(item => {
        return {
          flow: item.flow,
          data: item.data,
        }
      }),
      execute: this.state.executeFlows.map(item => {
        return {
          flow: item.flow,
          data: item.data,
        }
      }),
    }
  }

  deserialize = data => {
    let createStoreFlows = function(flowsStore) {
      return flowsStore.reduce((promise, item, index) => {
        return promise.then(store => {
          return store
            .dispatch(commitPushFlow(index, item.flow))
            .then(() => {
              return store.dispatch(commitUpdateFlow(index, item.data))
            })
            .then(() => {
              return store
            })
        })
      }, Promise.resolve(createStore(flows)))
    }

    Promise.all([
      createStoreFlows(data ? data.condition : []),
      createStoreFlows(data ? data.execute : []),
    ])
      .then(([conditionFlows, executeFlows]) => {
        this.store = {
          conditionFlows: conditionFlows,
          executeFlows: executeFlows,
        }

        let state = {
          conditionFlows: this.store.conditionFlows.getState(),
          conditionRunIndex: null,
          executeFlows: this.store.executeFlows.getState(),
          executeRunIndex: null,
        }

        return new Promise(resolve => {
          this.setState(state, resolve)
        }).then(() => {
          return state
        })
      })
      .then(state => {
        let resetFlows = flows => {
          for (let i = 0; i < flows.length; i++) {
            let item = flows[i]
            item.bus.emit('deserialize', item.data)
          }
        }

        resetFlows(state.conditionFlows)
        resetFlows(state.executeFlows)
      })
  }

  dispatchFlow = (propertyPath, action) => {
    let store = this.store
    propertyPath.forEach(key => {
      store = store[key]
    })

    return store
      .dispatch(action)
      .then(() => {
        return new Promise(resolve => {
          let state = Object.assign({}, this.state)
          let el = state
          propertyPath.slice(0, propertyPath.length - 1).forEach(key => {
            el = el[key]
          })
          el[propertyPath[propertyPath.length - 1]] = store.getState()
          this.setState(state, resolve)
        })
      })
      .then(onUpdate(this))
  }

  onPushFlow = (propertyPath, index, flow) => {
    this.dispatchFlow(propertyPath, commitPushFlow(index, flow))
  }

  onPopFlow = (propertyPath, index) => {
    this.dispatchFlow(propertyPath, commitPopFlow(index))
  }

  onUpdateFlow = (propertyPath, index, data) => {
    this.dispatchFlow(propertyPath, commitUpdateFlow(index, data))
  }

  render() {
    const { clients, onRun } = this.props
    const { isRunning } = this.state

    return (
      <>
        <FlowHeader
          title="While"
          clients={clients}
          isRunning={isRunning}
          onRun={onRun}
          onDelete={onDelete(this)}
        />
        <Flows
          flows={this.state.conditionFlows}
          runIndex={this.state.conditionRunIndex}
          allFlows={this.props.allFlows}
          programFlows={this.props.programFlows}
          onPush={(index, flow) => {
            this.onPushFlow(['conditionFlows'], index, flow)
          }}
          onPop={index => {
            this.onPopFlow(['conditionFlows'], index)
          }}
          onUpdate={(index, data) => {
            this.onUpdateFlow(['conditionFlows'], index, data)
          }}
          onRun={null}
        />
        <div className="row">
          <div className="col">
            <h4>Do</h4>
          </div>
        </div>
        <Flows
          flows={this.state.executeFlows}
          runIndex={this.state.executeRunIndex}
          allFlows={this.props.allFlows}
          programFlows={this.props.programFlows}
          onPush={(index, flow) => {
            this.onPushFlow(['executeFlows'], index, flow)
          }}
          onPop={index => {
            this.onPopFlow(['executeFlows'], index)
          }}
          onUpdate={(index, data) => {
            this.onUpdateFlow(['executeFlows'], index, data)
          }}
          onRun={null}
        />
        <div className="row">
          <div className="col">
            <h4>EndWhile</h4>
          </div>
        </div>
      </>
    )
  }
}

export default WhileFlow
