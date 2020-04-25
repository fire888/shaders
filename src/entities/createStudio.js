import * as THREE from 'three'
import { studioConfig } from '../constants/elementsConfig'


export function createStudio (emitterLink) {
  const emitter = emitterLink

  let camera, scene, renderer

  const init = () => {
    const { canId, rendererCon, clearColor, backgroundColor, fogData, amb } = studioConfig

    const canvas = document.getElementById(canId)
    rendererCon.canvas = canvas

    renderer = new THREE.WebGLRenderer(rendererCon)
    renderer.setClearColor(clearColor)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    //scene = new THREE.Scene()
    //scene.background = backgroundColor

    //{
    //    const { color, strength } = fogData
    //    scene.fog = new THREE.FogExp2(color, strength)
    //}

    //{
    //    const { color, strength } = amb
    //    let lightA = new THREE.AmbientLight( color, strength )
    //    scene.add( lightA )
    //}

    //camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000)


    window.addEventListener('resize', resize)
    resize()
  }

  const resize = () => {
    const size = { width: window.innerWidth, height: window.innerHeight }
    renderer.setSize(size.width, size.height)
    //if (camera) {
    //    camera.aspect = size.width/size.height
    //    camera.updateProjectionMatrix()
    //}
  }

  //const addToScene = mesh => scene.add( mesh )
  //const drawFrame = () => camera && renderer.render( scene, camera )

  init()

  //const box = new THREE.Mesh(
  //  new THREE.BoxGeometry(3, 3, 3),
  //  new THREE.MeshBasicMaterial({ color: 0xff0000 })
  //)


  //box.position.set(0, 0, -30)
  //studio.addToScene(box)


  return {
    renderer,
    //scene,
    //camera,
    //addToScene,
  }
}






