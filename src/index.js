import * as THREE from 'three'
import { EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { spaceShader } from './Shaders/space'

import { Emitter } from './utils/Emitter'
import { createStudio } from './entities/createStudio'

import { Shader } from './Shaders/Ball'

const initApp = () => {
  const emitter = Emitter()
  const studio = createStudio(emitter)

  const spaceMat = new THREE.ShaderMaterial(spaceShader)
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    spaceMat
    //new THREE.MeshBasicMaterial({ color: 0xFFff00 })
  )
  studio.addToScene(plane)
  plane.rotation.x = Math.PI
  plane.position.z = 500
  //plane.rotation.y = -Math.PI/2 


  const composer = new EffectComposer(studio.renderer)
  composer.addPass(new RenderPass(studio.scene, studio.camera))

  //const space = new ShaderPass(Shader)
  //composer.addPass(space)


  //new FrameUpdater(emitter)
  let count = 0
  /*emitter.subscribe('frameUpdate')(() => { 
    composer.render()
    effect.uniforms.iTime.value += 0.02
    count ++
  })*/

  const animate = () => {
    requestAnimationFrame(animate)
    //spaceMat.uniform.iGlobalTime.value += 0.01
    //
    //plane.rotation.y += 0.1
    studio.renderer.clear()
    composer.render()
    spaceMat.uniforms.iGlobalTime.value += 0.02
    count ++
  }
  animate()
  setInterval(() => {
    console.log(count)
    count = 0
  }, 1000)
}


window.addEventListener('load', initApp)

