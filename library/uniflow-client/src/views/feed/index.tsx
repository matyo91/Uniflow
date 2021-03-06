import React, { Component } from "react"
import Navigation from "./navigation"
import Program from "./program"
import Folder from "./folder"
import { getFeedItem } from "../../reducers/feed/actions"
import { connect } from "react-redux"

class Feed extends Component {
  render() {
    const { allFlows, feed } = this.props
    const currentItem = getFeedItem(feed)

    return (
      <div className="container-fluid">
        <div className="row flex-xl-nowrap">
          <Navigation />
          {currentItem && currentItem.type === "program" && <Program program={currentItem.entity} allFlows={allFlows} />}
          {currentItem && currentItem.type === "folder" && <Folder folder={currentItem.entity} />}
        </div>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    feed: state.feed,
  }
})(Feed)
