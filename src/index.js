import * as THREE from 'three'
import { EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

import { FrameUpdater } from './utils/FrameUpater'
import { Emitter } from './utils/Emitter'
import { createStudio } from './entities/createStudio'

import { Shader } from './Shaders/Shader'

const initApp = () => {
  const emitter = Emitter()
  const studio = createStudio(emitter)


  const composer = new EffectComposer(studio.renderer)
  // composer.addPass(new RenderPass(studio.scene, studio.camera))

  const effect = new ShaderPass(Shader)
  composer.addPass( effect )

  new FrameUpdater(emitter)
  emitter.subscribe('frameUpdate')(() => { 
    composer.render()
    effect.uniforms.iTime.value += 0.02
  })
}


window.addEventListener('load', initApp)

