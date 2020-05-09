import * as THREE from 'three'
import { EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

import { FrameUpdater } from './utils/FrameUpater'
import { Emitter } from './utils/Emitter'
import { createStudio } from './entities/createStudio'

import { Shader } from './Shaders/Ball'

const initApp = () => {
  const emitter = Emitter()
  const studio = createStudio(emitter)


  const composer = new EffectComposer(studio.renderer)
  // composer.addPass(new RenderPass(studio.scene, studio.camera))

  const effect = new ShaderPass(Shader)
  composer.addPass( effect )

  //new FrameUpdater(emitter)
  let count = 0
  /*emitter.subscribe('frameUpdate')(() => { 
    composer.render()
    effect.uniforms.iTime.value += 0.02
    count ++
  })*/

  const animate = () => {
    requestAnimationFrame(animate)
    composer.render()
    effect.uniforms.iTime.value += 0.02
    count ++
  }
  animate()
  setInterval(() => {
    console.log(count)
    count = 0
  }, 1000)
}


window.addEventListener('load', initApp)

