import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchComponents, fetchSettings} from '../../reducers/user/actions'
import routes, {pathTo, matchRoute} from '../../routes'
import {withRouter} from 'react-router'
import {
  fetchHistory,
  getHistoryBySlug,
  setCurrentHistory,
  commitSetCurrentFolder,
  setUsernameHistory,
  getCurrentHistory,
  getCurrentPath
} from '../../reducers/history/actions'
import {pathToSlugs} from '../../reducers/folder/actions'

class UserManagerComponent extends Component<Props> {
  componentDidMount() {
    const {auth, history} = this.props

    this.historyUnlisten = history.listen(this.onLocation)

    if (auth.isAuthenticated) {
      this.onFetchUser(auth.token)
    } else {
      this.onLocation(history.location)
    }
  }

  componentWillReceiveProps(nextProps) {
    const oldProps = this.props

    if (nextProps.auth.token !== oldProps.auth.token && nextProps.auth.isAuthenticated) {
      this.onFetchUser(nextProps.auth.token)
    }
  }

  componentWillUnmount() {
    this.historyUnlisten()
  }

  onLocation = (location) => {
    const match = matchRoute(location.pathname)

    if (match) {
      let params = match.match.params
      if (match.route === 'flow') {
        this.onFetchHistory('me', params.slug1, params.slug2, params.slug3, params.slug4, params.slug5)
      } else if (match.route === 'userFlow') {
        this.onFetchHistory(params.username, params.slug1, params.slug2, params.slug3, params.slug4, params.slug5)
      }
    }
  }

  onFetchUser = (token) => {
    Promise.all([
      this.props.dispatch(fetchComponents(token)),
      this.props.dispatch(fetchSettings(token))
    ]).then(() => {
      const {history} = this.props

      this.onLocation(history.location)
    })
  }

  onFetchHistory = (username = 'me', slug1 = null, slug2 = null, slug3 = null, slug4 = null, slug5 = null) => {
    const {historyState} = this.props

    let path          = [slug1, slug2, slug3, slug4, slug5].reduce((path, slug) => {
      if (slug) {
        path.push(slug)
      }
      return path
    }, [])
    let currentPath = getCurrentPath(historyState),
        item = getCurrentHistory(historyState)
    if(item) {
      currentPath.push(item.slug)
    }
    if(historyState.username === username && path.join('/') === currentPath.join('/')) {
      return Promise.resolve()
    }

    return Promise.resolve()
      .then(() => {
        const {auth, historyState} = this.props

        let slug          = path.length > 0 ? path[path.length - 1] : null
        let sameDirectory = path.slice(0, -1).join('/') === getCurrentPath(historyState).join('/')
        let isHistory     = sameDirectory && Object.keys(historyState.items)
          .filter((key) => {
            return historyState.items[key].constructor.name === 'History' && historyState.items[key].slug === slug
          })
          .length > 0
        if (historyState.username === username && sameDirectory && isHistory) {
          return path
        }

        return this.props.dispatch(setUsernameHistory(username))
          .then(() => {
            const token = auth.isAuthenticated ? auth.token : null
            return this.props.dispatch(fetchHistory(username, path, token))
          })
      })
      .then(() => {
        const {historyState} = this.props

        let slug = path.length > 0 ? path[path.length - 1] : null

        let historyObj = getHistoryBySlug(historyState, slug)
        if (historyObj) {
          this.props.dispatch(setCurrentHistory({type: historyObj.constructor.name, id: historyObj.id}))
        } else if(historyState.folder) {
          this.props.dispatch(setCurrentHistory(null))
        } else {
          let items = Object.keys(historyState.items)
            .filter((key) => {
              return historyState.items[key].constructor.name === 'History'
            })
            .reduce((res, key) => (res[key] = historyState.items[key], res), {})
          let keys  = Object.keys(items)

          keys.sort((keyA, keyB) => {
            let itemA = items[keyA]
            let itemB = items[keyB]

            return itemB.updated.diff(itemA.updated)
          })

          if (keys.length > 0) {
            let item = items[keys[0]]
            this.props.dispatch(setCurrentHistory({type: item.constructor.name, id: item.id}))
          } else {
            this.props.dispatch(setCurrentHistory(null))
          }
        }
      }).then(() => {
        const {user, history, historyState} = this.props
        const isCurrentUser = historyState.username && historyState.username === user.username

        let currentPath = getCurrentPath(historyState),
            item = getCurrentHistory(historyState)
        if(item) {
          currentPath.push(item.slug)
        }
        let slugs = pathToSlugs(currentPath)

        if ((item && item.public) || isCurrentUser) {
          history.push(pathTo('userFlow', Object.assign({username: historyState.username}, slugs)))
        } else {
          history.push(pathTo('flow', slugs))
        }
      })
  }

  render() {
    return (<div/>)
  }
}

export default connect(state => {
  return {
    auth: state.auth,
    user: state.user,
    historyState: state.history
  }
})(withRouter(UserManagerComponent))
