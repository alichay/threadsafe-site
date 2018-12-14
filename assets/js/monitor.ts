
import * as THREE from 'three';
window['THREE'] = THREE;
require('three/examples/js/loaders/GLTFLoader');

let canvas = document.getElementById('logo');

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);

let renderer = new THREE.WebGLRenderer({
	canvas: canvas as HTMLCanvasElement,
	antialias: true
});
renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.setSize(300, 300);

let glassMaterial = new THREE.MeshStandardMaterial({color: 0x021212, roughness: 0});
let envMap = new THREE.TextureLoader().load('/assets/gloss.png');
//envMap.mapping = THREE.SphericalReflectionMapping;
envMap.mapping = THREE.EquirectangularReflectionMapping
glassMaterial.envMap = envMap;

//let material = new THREE.MeshBasicMaterial({color: 0xff00ff});
/*
let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({color: 0xff00ff});

let cube = new THREE.Mesh(geometry, material);

scene.add(cube);
*/
let loader = new THREE.GLTFLoader();
let cube: THREE.Scene = null;

window['cam'] = camera;
window['scene'] = scene;

let animate = () => {
	document.body.addEventListener('mousemove', e => {

		let canvas_region = canvas.getBoundingClientRect();
		let canvas_mid_x = canvas_region.left + canvas_region.width / 2
		let canvas_mid_y = canvas_region.top + canvas_region.height / 2

		cube.rotation.y = - (canvas_mid_x - e.clientX) * .0001;
		cube.rotation.x = - (canvas_mid_y - e.clientY) * .0001;
		//cube.rotation.x = 0.03;
		
		//console.log(      - (canvas_mid_y - e.clientY) * .0001)
		renderer.render(scene, camera);
	})
	renderer.render(scene, camera);
}
/*
let animate = () => {
	requestAnimationFrame(animate);

	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;

}
*/

loader.load('/assets/logo.glb', (gltf) => {
	console.log("Loaded!");
	console.log(gltf);
	cube = gltf.scene;
	cube.translateZ(-2.64);
	let obj1 = <THREE.Mesh> cube.getObjectByName('Plane');
	let obj2 = <THREE.Mesh> cube.getObjectByName('Cube');
	let obj3 = <THREE.Mesh> cube.getObjectByName('Cube001');
	cube.remove(cube.getObjectByName('screen_mask'));

	obj1.castShadow = true;
	obj1.receiveShadow = true;
	obj2.castShadow = true;
	obj2.receiveShadow = true;
	obj2.material = glassMaterial;
	obj3.castShadow = true;
	obj3.receiveShadow = true;

	//let light1 = new THREE.DirectionalLight(0xBB5DDC, 0.9);
	let light1 = new THREE.DirectionalLight(0x0000FF, 0.9);
	light1.target = cube.getObjectByName('Cube');
	light1.name = 'light1';
	light1.translateY(.5);
	light1.translateZ(-.02);
	scene.add(light1);
	scene.add(cube);

	let light2 = new THREE.PointLight(0x61C6FF, 1.0);
	scene.add(light2);
	light2.translateX(-2.2);
	light2.translateY(.08);
	light2.translateZ(-.9);

	let light3 = new THREE.PointLight(0x61C6FF, 1.0);
	scene.add(light3);
	light3.translateX(2.2);
	light3.translateY(.08);
	light3.translateZ(-.9);

	animate();
}, undefined, (err) => {
	canvas.outerHTML = canvas.innerHTML.replace('src', 'id=\'logo\' src');
});