function listener () {
  // declare DOM list
  var earthSpeedDOM = document.querySelector('.stats span.earthS');
  var moonSpeedDOM  = document.querySelector('.stats span.moonS');
  var earthInputDOM = document.querySelector('.stats input.earthS');
  var moonInputDOM  = document.querySelector('.stats input.moonS');
  var sunColorSel   = document.querySelector('.stats input[name="sunC"]');
  var earthColorSel = document.querySelector('.stats input[name="earthC"]');
  var moonColorSel  = document.querySelector('.stats input[name="moonC"]');
  var sunRotateSel  = document.querySelector('.sunR').getElementsByTagName("button");
  var sunRotateDOM  = document.querySelectorAll('.sunRS');
  var earthRotateSel = document.querySelector('.earthR').getElementsByTagName("button");
  var earthRotateDOM = document.querySelectorAll('.earthRS');
  var moonRotateSel = document.querySelector('.moonR').getElementsByTagName("button");
  var moonRotateDOM = document.querySelectorAll('.moonRS');
  var sunScaleSel   = document.querySelectorAll('.sunSC');
  var earthScaleSel   = document.querySelectorAll('.earthSC');
  var moonScaleSel   = document.querySelectorAll('.moonSC');

  // setup initial value
  earthSpeedDOM.innerText = speed[1];
  moonSpeedDOM.innerText  = speed[2];
  earthInputDOM.value     = speed[1];
  moonInputDOM.value      = speed[2];
  sunColorSel.value       = 'F28500';
  earthColorSel.value     = '11AD42';
  moonColorSel.value      = '444444';

  // setup input listener
  earthInputDOM.addEventListener('input', function (e) {
    speed[1] = parseFloat(e.target.value);
    earthSpeedDOM.innerText = speed[1];
  });
  moonInputDOM.addEventListener('input', function (e) {
    speed[2] = parseFloat(e.target.value);
    moonSpeedDOM.innerText = speed[2];
  });

  for(var i = 0; i < sunRotateSel.length; i++){
    sunRotateSel[i].addEventListener('click', function(e){
      switch(e.target.innerText){
        case 'X': rotate[0].identity = new THREE.Vector3(1, 0, 0);break;
        case 'Y': rotate[0].identity = new THREE.Vector3(0, 1, 0);break;
        case 'Z': rotate[0].identity = new THREE.Vector3(0, 0, 1);break;
      }
      rotate[0].result = rotate[0].identity;
      rotate[0].result.multiplyScalar(rotate[0].speed);
    });
  }
  sunRotateDOM[1].innerText = rotate[0].speed;
  sunRotateDOM[0].addEventListener('input', function(e) {
    if(rotate[0].lock) return;
    rotate[0].lock = true;
    rotate[0].speed = parseFloat(e.target.value);
    sunRotateDOM[1].innerText = rotate[0].speed;
    rotate[0].result = rotate[0].identity.clone();
    rotate[0].result.multiplyScalar(rotate[0].speed);
    rotate[0].lock = false;
  });
  for(var i = 0; i < earthRotateSel.length; i++){
    earthRotateSel[i].addEventListener('click', function(e){
      switch(e.target.innerText){
        case 'X': rotate[1].identity = new THREE.Vector3(1, 0, 0);break;
        case 'Y': rotate[1].identity = new THREE.Vector3(0, 1, 0);break;
        case 'Z': rotate[1].identity = new THREE.Vector3(0, 0, 1);break;
      }
      rotate[1].result = rotate[1].identity;
      rotate[1].result.multiplyScalar(rotate[1].speed);
    });
  }
  earthRotateDOM[1].innerText = rotate[1].speed;
  earthRotateDOM[0].addEventListener('input', function(e) {
    if(rotate[1].lock) return;
    rotate[1].lock = true;
    rotate[1].speed = parseFloat(e.target.value);
    earthRotateDOM[1].innerText = rotate[1].speed;
    rotate[1].result = rotate[1].identity.clone();
    rotate[1].result.multiplyScalar(rotate[1].speed);
    rotate[1].lock = false;
  });
  for(var i = 0; i < moonRotateSel.length; i++){
    moonRotateSel[i].addEventListener('click', function(e){
      switch(e.target.innerText){
        case 'X': rotate[2].identity = new THREE.Vector3(1, 0, 0);break;
        case 'Y': rotate[2].identity = new THREE.Vector3(0, 1, 0);break;
        case 'Z': rotate[2].identity = new THREE.Vector3(0, 0, 1);break;
      }
      rotate[2].result = rotate[2].identity;
      rotate[2].result.multiplyScalar(rotate[2].speed);
    });
  }
  moonRotateDOM[1].innerText = rotate[2].speed;
  moonRotateDOM[0].addEventListener('input', function(e) {
    if(rotate[2].lock) return;
    rotate[2].lock = true;
    rotate[2].speed = parseFloat(e.target.value);
    moonRotateDOM[1].innerText = rotate[2].speed;
    rotate[2].result = rotate[2].identity.clone();
    rotate[2].result.multiplyScalar(rotate[2].speed);
    rotate[2].lock = false;
  });

  sunScaleSel[1].innerText = sun.scale.x;
  sunScaleSel[0].value = Math.log(sun.scale.x) / Math.log(1.5);
  sunScaleSel[0].addEventListener('input', function(e){
    sun.scale.x = Math.pow(1.5, parseFloat(e.target.value));
    e.target.nextSibling.nextSibling.innerText = sun.scale.x;
  });
  sunScaleSel[3].innerText = sun.scale.y;
  sunScaleSel[2].value = Math.log(sun.scale.y) / Math.log(1.5);
  sunScaleSel[2].addEventListener('input', function(e){
    sun.scale.y = Math.pow(1.5, parseFloat(e.target.value));
    e.target.nextSibling.nextSibling.innerText = sun.scale.y;
  });
  sunScaleSel[5].innerText = sun.scale.z;
  sunScaleSel[4].value = Math.log(sun.scale.z) / Math.log(1.5);
  sunScaleSel[4].addEventListener('input', function(e){
    sun.scale.z = Math.pow(1.5, parseFloat(e.target.value));
    e.target.nextSibling.nextSibling.innerText = sun.scale.z;
  });

  earthScaleSel[1].innerText = earth.scale.x;
  earthScaleSel[0].value = Math.log(earth.scale.x) / Math.log(1.5);
  earthScaleSel[0].addEventListener('input', function(e){
    earth.scale.x = Math.pow(1.5, parseFloat(e.target.value));
    e.target.nextSibling.nextSibling.innerText = earth.scale.x;
  });
  earthScaleSel[3].innerText = earth.scale.y;
  earthScaleSel[2].value = Math.log(earth.scale.y) / Math.log(1.5);
  earthScaleSel[2].addEventListener('input', function(e){
    earth.scale.y = Math.pow(1.5, parseFloat(e.target.value));
    e.target.nextSibling.nextSibling.innerText = earth.scale.y;
  });
  earthScaleSel[5].innerText = earth.scale.z;
  earthScaleSel[4].value = Math.log(earth.scale.z) / Math.log(1.5);
  earthScaleSel[4].addEventListener('input', function(e){
    earth.scale.z = Math.pow(1.5, parseFloat(e.target.value));
    e.target.nextSibling.nextSibling.innerText = earth.scale.z;
  });

  moonScaleSel[1].innerText = moon.scale.x;
  moonScaleSel[0].value = Math.log(moon.scale.x) / Math.log(1.5);
  moonScaleSel[0].addEventListener('input', function(e){
    moon.scale.x = Math.pow(1.5, parseFloat(e.target.value));
    e.target.nextSibling.nextSibling.innerText = moon.scale.x;
  });
  moonScaleSel[3].innerText = moon.scale.y;
  moonScaleSel[2].value = Math.log(moon.scale.y) / Math.log(1.5);
  moonScaleSel[2].addEventListener('input', function(e){
    moon.scale.y = Math.pow(1.5, parseFloat(e.target.value));
    e.target.nextSibling.nextSibling.innerText = moon.scale.y;
  });
  moonScaleSel[5].innerText = moon.scale.z;
  moonScaleSel[4].value = Math.log(moon.scale.z) / Math.log(1.5);
  moonScaleSel[4].addEventListener('input', function(e){
    moon.scale.z = Math.pow(1.5, parseFloat(e.target.value));
    e.target.nextSibling.nextSibling.innerText = moon.scale.z;
  });
}