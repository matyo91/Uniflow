import React, { Component } from "react"
import Navigation from "./navigation"
import MDXDocument from "./index.mdx"
import { MDXProvider } from "../../components"

class Library extends Component {
  render() {
    const { library } = this.props

    return (
      <div className="container-fluid">
        <div className="row flex-xl-nowrap">
          <Navigation library={library} />
          <section className="section col">
            <MDXProvider>
              <MDXDocument />
            </MDXProvider>
          </section>
        </div>
      </div>
    )
  }
}

export default Library
