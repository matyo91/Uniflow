const onCode = function (client) {
  if (!this.state.bash) {
    return ''
  }

  let bash = JSON.stringify(this.state.bash)

  return `Bash.exec(${bash})`
}

export {onCode}
