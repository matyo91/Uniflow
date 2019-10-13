import React, { Component } from 'react'
import Select from 'react-select'

export default class TagItComponent extends Component {
  onChange = value => {
    if (this.props.onChange) {
      this.props.onChange(value.map(option => {
        return option.value
      }))
    }
  }

  render () {
    const {
      value,
      options
    } = this.props
    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        zIndex: 10
      })
    }

    let opts = []
    if (value) {
      opts = value.map(data => {
        return { value: data, label: data }
      })
    }

    return (
      <Select
        isMulti
        value={opts}
        onChange={this.onChange}
        options={options}
        styles={customStyles}
      />
    )
  }
}
