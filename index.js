import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import {GLTFLoader} from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js"
import Stats from "https://unpkg.com/three@0.126.1/examples/jsm/libs/stats.module"
import {OrbitControls} from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js"

const container = document.createElement('div')
document.body.appendChild(container)

const canvas = document.querySelector(".webgl")
const scene = new THREE.Scene()

const loader = new GLTFLoader()
loader.load("assets/workspace-baked.glb", function(glb){
    console.log(glb)
    const root = glb.scene;
    root.scale.set(0.05,0.05,0.05)
    scene.add(root);
}, function(xhr){
    console.log((xhr.loaded/xhr.total*100) + "% loaded")
}, function(error){
    console.log("An error occured")
})

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0.52,0.42,-0.66)
scene.add(light)

// Boiler plate code
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
camera.position.set(0,1,2)
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.shadowMap.enabled = true
renderer.outputEncoding = true

const axesHelper = new THREE.AxesHelper(500)
// scene.add(axesHelper)
const stats = new Stats()
container.appendChild(stats.dom)
const controls = new OrbitControls(camera, renderer.domElement)

function animate(){
    requestAnimationFrame(animate)

    stats.update()
    controls.update()
    //console.log(controls.position0)
    //console.log(camera.getWorldPosition())

    renderer.render(scene, camera)
}
animate()