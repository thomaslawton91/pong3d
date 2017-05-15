window.addEventListener('load', init, false);

function init(event) {
	createScene();

	// add the lights
	createLights();

	// add the objects
	//createPaddle();
	createBall();
	//createSky();

    //document.addEventListener('mousemove', handleMouseMove, false);
	// start a loop that will update the objects' positions 
	// and render the scene on each frame
	loop();
}

var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH, 
    renderer, container;

function createScene() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    scene = new THREE.Scene();

    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;
    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
    );

    camera.position.x = 0;
    camera.position.z = 600;

    renderer = new THREE.WebGLRenderer({
        alpha: true,

        antialias: true
    });

    renderer.setSize(WIDTH, HEIGHT);

    renderer.shadowMap.enabled = true;

    container = document.getElementById('canvas');
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', handleWindowResize, false);
}

function handleWindowResize() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

function createLights() {
    var light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
    light.position.set( 3, 1, 0 ); 			//default; light shining from top
    light.castShadow = true;            // default false
    scene.add( light );

    var light2 = new THREE.DirectionalLight( 0xffffff, 1, 100 );
    light.position.set( 0, 1, 0 ); 			//default; light shining from top
    light.castShadow = true;            // default false
    scene.add( light2 );
}

Paddle = function(){
    var geom = new THREE.BoxGeometry(50, 150, 50);
    var material = new THREE.MeshPhongMaterial({
        color:0x59332e,
        });
    this.mesh = new THREE.Mesh(geom, material);
};

var player, computer;

function createPaddle(){
    player = new Paddle();
    computer = new Paddle();
    player.mesh.position.x = -700;
    computer.mesh.position.x = 700;
    //scene.add(player.mesh);
    //scene.add(computer.mesh);
}

Ball = function(){
    var geom = new THREE.IcosahedronGeometry(25, 0);
    var material = new THREE.MeshPhongMaterial({color:0x59332e,});
    this.mesh = new THREE.Mesh(geom, material);
};

var ball;

function createBall(){
    ball = new Ball();
    scene.add(ball.mesh);
}

var speeds = [-1, 0, 1];
var xSpeed = speeds[Math.floor(Math.random() * speeds.length)];
var ySpeed = speeds[Math.floor(Math.random() * speeds.length)];

function bounce(){
    if (ball.mesh.position.x >= window.innerWidth/2 || ball.mesh.position.x <= -window.innerWidth/2){
        ball.mesh.position.x += -xSpeed;
        ball.mesh.position.y += -ySpeed;
    }

    if (ball.mesh.position.y >= window.innerHeight/2 || ball.mesh.position.y <= -window.innerHeight/2){
        ball.mesh.position.x += -xSpeed;
        ball.mesh.position.y += -ySpeed;
    }
}

function loop(){
    ball.mesh.rotation.x += 0.08;
    ball.mesh.rotation.y += 0.08;
    ball.mesh.position.x += xSpeed;
    ball.mesh.position.y += ySpeed;
    bounce();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}