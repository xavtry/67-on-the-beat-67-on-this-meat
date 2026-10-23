import * as THREE from 'three';
import './styles/main.css';
import { createPark } from './environments/SkatePark.js';
import { createSkater } from './player/Skater.js';
import { createBoard } from './player/Skateboard.js';
import { InputManager } from './controls/InputManager.js';
import { Game } from './game/Game.js';
import { mountUI } from './ui/UI.js';

const canvas = document.querySelector('#game');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
const scene = new THREE.Scene();
scene.background = new THREE.Color('#c7d4d8');
scene.fog = new THREE.Fog('#c7d4d8', 70, 210);
const camera = new THREE.PerspectiveCamera(66, innerWidth / innerHeight, 0.1, 350);
const hemi = new THREE.HemisphereLight(0xdcecff, 0x66594b, 2.0); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffd6a2, 3.1); sun.position.set(-28, 42, 18); sun.castShadow = true; sun.shadow.mapSize.set(1024,1024); sun.shadow.camera.left=-65; sun.shadow.camera.right=65; sun.shadow.camera.top=65; sun.shadow.camera.bottom=-65; scene.add(sun);
const park = createPark(THREE, scene, 'bowl');
const skater = createSkater(THREE); scene.add(skater.root);
const board = createBoard(THREE); scene.add(board.root);
const input = new InputManager(canvas);
const game = new Game({ THREE, scene, camera, renderer, skater, board, park, input });
mountUI(game);
function resize(){ camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); }
addEventListener('resize', resize);
let last=performance.now();
function frame(now){ requestAnimationFrame(frame); const dt=Math.min((now-last)/1000,0.04); last=now; game.update(dt,now); renderer.render(scene,camera); }
requestAnimationFrame(frame);
