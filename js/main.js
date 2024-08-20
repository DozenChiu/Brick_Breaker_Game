'use strict';

// set the scene size
var WIDTH = 840, HEIGHT = 480;

// set some attribute
var VIEW_ANGLE = 45;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 0.1;
var FAR = 10000;

// set the DOM element to attach it
var container = document.querySelector('#container');

// create an webgl renderer, camera and a scene
var renderer = new THREE.WebGLRenderer();
var camera   = new THREE.PerspectiveCamera(
                   VIEW_ANGLE,
                   ASPECT,
                   NEAR,
                   FAR
               );
var scene    = new THREE.Scene();

// add camera(with trackballcontrol) to scene
var controls = new THREE.TrackballControls( camera, container );
camera.position.z = 500;
controls.addEventListener('change', render);
scene.add(camera);

// start the renderer and background color
renderer.setSize(WIDTH, HEIGHT);
// renderer.setClearColor( 0xffffff );
// scene.add( new THREE.AmbientLight( Math.random() * 0x202020 ) );
var ambientLight = new THREE.AmbientLight( 0x000000 );
scene.add( ambientLight );

var lights = [];
lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

lights[ 0 ].position.set( 0, 200, 0 );
lights[ 1 ].position.set( 100, 200, 100 );
lights[ 2 ].position.set( - 100, - 200, - 100 );

scene.add( lights[ 0 ] );
scene.add( lights[ 1 ] );
scene.add( lights[ 2 ] );

// attach the renderer-supplied DOM Element
container.appendChild(renderer.domElement);

// declare global control variable
var sun, earth, moon;
var speed = [0, 0.01, 0.05];
var angle = [0, 0, 0];
var rotate = [
  {speed: 0.01, identity: new THREE.Vector3(0, 1, 0), result: null, lock: false},
  {speed: 0.01, identity: new THREE.Vector3(0, 1, 0), result: null, lock: false},
  {speed: 0.01, identity: new THREE.Vector3(0, 1, 0), result: null, lock: false}
];

function meshCreate () {
  var sungeometry = new MexicoHat(50.0);
  var sunmaterial = new THREE.MeshLambertMaterial({color: 0xF28500, side: THREE.DoubleSide});
  sun = new THREE.Mesh(sungeometry, sunmaterial);
      
  sun.position.set(0, 0, 0);
  rotate[0].result = rotate[0].identity.clone();
  rotate[0].result.multiplyScalar(rotate[0].speed);
  scene.add(sun);
    
  /*var loader = new THREE.TextureLoader();
  loader.crossOrigin = true;
  var texture = loader.load('http://i.imgur.com/1wZKcwy.jpg');*/
      
  var earthgeometry = new MexicoHat(25.0);
  var earthmaterial = new THREE.MeshLambertMaterial({color: 0x11AD42, side: THREE.DoubleSide});
  earth = new THREE.Mesh(earthgeometry, earthmaterial);
  rotate[1].result = rotate[1].identity.clone();
  rotate[1].result.multiplyScalar(rotate[1].speed);
  scene.add(earth);
      
  var moongeometry = new MexicoHat(10.0);
  var moonmaterial = new THREE.MeshLambertMaterial({color: 0x444444, side: THREE.DoubleSide});
  moon = new THREE.Mesh(moongeometry, moonmaterial);
  rotate[2].result = rotate[2].identity.clone();
  rotate[2].result.multiplyScalar(rotate[2].speed);
  scene.add(moon);
}

// jscolor callback function
function setColor (jscolor) {
  var targetElement = jscolor.targetElement;
  switch(targetElement.name){
    case 'sunC':
      sun.material.color = new THREE.Color('#' + jscolor);
      break;
    case 'earthC':
      earth.material.color = new THREE.Color('#' + jscolor);
      break;
    case 'moonC':
      moon.material.color = new THREE.Color('#' + jscolor);
      break;
  }
}

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class='tabcontent' and hide them
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    // Get all elements with class='tablinks' and remove the class 'active'
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    // Show the current tab, and add an 'active' class to the button that opened the tab
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
}

function render () {
  renderer.render(scene, camera);
}

function update () {
  // update control
  controls.update();

  // update position
  angle[1] += speed[1];
  angle[2] += speed[2];

  sun.rotation.setFromVector3(
    sun.rotation.toVector3().add(
      rotate[0].result
    )
  );

  earth.rotation.setFromVector3(
    earth.rotation.toVector3().add(
      rotate[1].result
    )
  );
  earth.position.set(
    200 * Math.cos(angle[1]),
    0,
    200 * Math.sin(angle[1])
  );

  moon.rotation.setFromVector3(
    moon.rotation.toVector3().add(
      rotate[2].result
    )
  );
  moon.position.set(
    200 * Math.cos(angle[1]) + 50 * Math.cos(angle[2]),
    0,
    200 * Math.sin(angle[1]) + 50 * Math.sin(angle[2])
  );

  sun.material.needsUpdate = true;
  sun.geometry.uvsNeedUpdate = true;
  sun.geometry.buffersNeedUpdate = true;

  // Draw!
  render ();

  // Schedule the next frame.
  requestAnimationFrame(update);
}

// Schedule the first frame.
meshCreate ();
listener ();
update ();
document.querySelector('.tablinks').click();