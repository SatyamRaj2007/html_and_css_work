// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Create floating geometric shapes
const geometry1 = new THREE.TorusGeometry(10, 3, 16, 100);
const geometry2 = new THREE.OctahedronGeometry(10);
const geometry3 = new THREE.IcosahedronGeometry(7);

const material1 = new THREE.MeshStandardMaterial({
    color: 0x00f5ff,
    wireframe: true
});

const material2 = new THREE.MeshStandardMaterial({
    color: 0xff00ff,
    wireframe: true
});

const material3 = new THREE.MeshStandardMaterial({
    color: 0x00ffaa,
    wireframe: true
});

const torus = new THREE.Mesh(geometry1, material1);
const octahedron = new THREE.Mesh(geometry2, material2);
const icosahedron = new THREE.Mesh(geometry3, material3);

scene.add(torus, octahedron, icosahedron);

// Position shapes
torus.position.set(-15, 0, -10);
octahedron.position.set(15, -10, -5);
icosahedron.position.set(0, 15, -15);

// Lighting
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(pointLight, ambientLight);

// Add stars
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate shapes
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    octahedron.rotation.x += 0.005;
    octahedron.rotation.y += 0.01;

    icosahedron.rotation.x += 0.01;
    icosahedron.rotation.z += 0.005;

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Scroll animation
document.body.onscroll = () => {
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t * -0.01 + 30;
    camera.rotation.x = t * 0.0001;
};

// Button interactions
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});
