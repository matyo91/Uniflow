import React from 'react'

const Home = () => {
  const options = {
    height: 200,
    width: 300,
    amplitude: 20,
    speed: 0.15,
    points: 3,
    fill: '#FF00FF'
  }

  let step = 0
  
  const calculateWavePoints = () => {
    const points = []
    for (let i = 0; i <= Math.max(options.points, 1); i ++) {
      const scale = 100
      const x = i / options.points * options.width
      const seed = (step + (i + i % options.points)) * options.speed * scale
      const height = Math.sin(seed / scale) * options.amplitude
      const y = Math.sin(seed / scale) * height  + options.height
      points.push({x, y})
    }
    return points
  }

  const buildPath = (points) => {
    let svg = `M ${points[0].x} ${points[0].y}`
    const initial = {
      x: (points[1].x - points[0].x) / 2,
      y: (points[1].y - points[0].y) + points[0].y + (points[1].y - points[0].y)
    }
    const cubic = (a, b) => ` C ${a.x} ${a.y} ${a.x} ${a.y} ${b.x} ${b.y}`
    svg += cubic(initial, points[1])
    let point = initial
    for (let i = 1; i < points.length - 1; i ++) {
      point = {
        x: (points[i].x - point.x) + points[i].x,
        y: (points[i].y - point.y) + points[i].y
      }
      svg += cubic(point, points[i + 1])
    }
    svg += ` L ${options.width} ${options.height}`
    svg += ` L 0 ${options.height} Z`
    return svg
  }
  
  const path = buildPath(calculateWavePoints());
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='${options.width}' height='${options.height}'><path d='${path}' fill='${options.fill}' /></svg>`
  
  return (
    <>
      {/*<div className="section-wrapper" style={{
        background: `url("data:image/svg+xml;utf8,${svg}")`
      }}>
        <section className="section container vh-100">
          <div className="row h-100 align-items-center">
            <div className="col-md-12 text-center">
              <h1>Unified Workflow Automation Tool</h1>
              <p>Take advantage of Railway Flow Based Programming to automate your recurring tasks.</p>
            </div>
          </div>
        </section>
      </div>*/}
      <section className="section container">
        <div className="row py-5">
          <div className="col-lg-12 text-center">
            <h3>Features</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 py-md-5">
            <h3>Note taking philosophy</h3>
            <p>Create your Flows as you take note.</p>
          </div>
          <div className="col-lg-4 py-md-5">
            <h3>Modulable</h3>
            <p>Create your own specific Flows.</p>
          </div>
          <div className="col-lg-4 py-md-5">
            <h3>Multiple clients</h3>
            <p>Run your Flows on dedicated Clients.</p>
          </div>
          <div className="col-lg-4 py-md-5">
            <h3>Free and Open</h3>
            <p>Uniflow is MIT open sourced.</p>
          </div>
          <div className="col-lg-4 py-md-5">
            <h3>Control your data</h3>
            <p>Install and run Uniflow locally.</p>
          </div>
          <div className="col-lg-4 py-md-5">
            <h3>Community</h3>
            <p>Get inspiration from community.</p>
          </div>
        </div>
      </section>
      {/*<section className="section container py-md-5">
        <div className="row">
          <div className="col-lg-12">
            <h3>Get started</h3>
          </div>
        </div>
        <div className="row pt-md-3">
          <div className="col-lg-6">
            <h3 className="headline">CLI</h3>
            <div className="execution-code cli-npx">
              <div className="click-to-copy clickable">
                Click to copy
              </div>
              <pre className="clickable  language-bash">
                <code className=" language-bash">
                  <span className="token comment"># Take uniflow for a spin without installing it</span> npx uniflow-io
                </code>
              </pre>
            </div>
            <div className="execution-code cli-npm-install">
              <div className="click-to-copy clickable">
                Click to copy
              </div>
              <pre className="clickable  language-bash"><code className=" language-bash">
<span className="token comment"># or install it globally and then start</span>
<span className="token function">npm</span> <span className="token function">install</span> -g uniflow-io</code></pre>
            </div>
          </div>
          <div className="col-lg-6">
            <h3 className="headline">Docker</h3>
            <div className="execution-code docker">
              <div className="click-to-copy clickable">
                Click to copy
              </div>
              <pre className="clickable language-bash"><code className=" language-bash">
<span className="token comment"># Spin up a basic container</span>
docker run -it --rm <span className="token punctuation">\</span>
--name n8n <span className="token punctuation">\</span>
-p <span className="token number">5678</span>:5678 <span className="token punctuation">\</span>
-v ~/.n8n:/root/.n8n <span className="token punctuation">\</span>
n8nio/n8n
              </code></pre>
            </div>
          </div>
        </div>
      </section>*/}
    </>
  )
}

export default Home
