import consoleBridge from '../bridges/console'
import chromeBridge from '../bridges/chrome'
import vm from 'vm'

export default class Runner {
  constructor(api, background) {
    this.api = api
    this.background = background
  }

  run(flows) {
    const context = new vm.createContext({
      console: consoleBridge(this.background),
      chrome: chromeBridge(this.background),
    })

    return flows.reduce((promise, flow) => {
      return promise.then(() => {
        return vm.runInContext(flow.codes.chrome || '', context)
      })
    }, Promise.resolve())
  }
}
