// SPIDER v2.1 - Advanced 3D Scene with Three.js
// Ultra-modern 3D background animation

class SpiderThreeScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.geometryNodes = [];
        this.animationFrameId = null;
        this.clock = new THREE.Clock();
        
        // Mouse interaction
        this.mouse = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };
        this.currentRotation = { x: 0, y: 0 };
        
        this.init();
        this.createParticles();
        this.createGeometryNodes();
        this.bindEvents();
        this.animate();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0a0a0f, 100, 1000);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 100;

        // Renderer setup
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) {
            console.error('Hero canvas not found');
            return;
        }

        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);

        // Lights
        const ambientLight = new THREE.AmbientLight(0x00ffff, 0.3);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.8);
        directionalLight.position.set(50, 50, 50);
        this.scene.add(directionalLight);

        const pointLight1 = new THREE.PointLight(0xff0080, 1, 100);
        pointLight1.position.set(-50, -50, 50);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x0080ff, 1, 100);
        pointLight2.position.set(50, -50, 50);
        this.scene.add(pointLight2);
    }

    createParticles() {
        const particleCount = 200;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Positions
            positions[i3] = (Math.random() - 0.5) * 400;
            positions[i3 + 1] = (Math.random() - 0.5) * 400;
            positions[i3 + 2] = (Math.random() - 0.5) * 400;

            // Colors (cyan to pink gradient)
            const colorChoice = Math.random();
            if (colorChoice < 0.5) {
                colors[i3] = 0;      // R
                colors[i3 + 1] = 1;  // G
                colors[i3 + 2] = 1;  // B (Cyan)
            } else {
                colors[i3] = 1;      // R
                colors[i3 + 1] = 0;  // G
                colors[i3 + 2] = 0.5; // B (Pink)
            }

            // Sizes
            sizes[i] = Math.random() * 3 + 1;
        }

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particleMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                uniform float time;

                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    
                    // Add floating animation
                    mvPosition.y += sin(time * 0.5 + position.x * 0.01) * 10.0;
                    mvPosition.x += cos(time * 0.3 + position.z * 0.01) * 5.0;
                    
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;

                void main() {
                    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
                    float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
                    gl_FragColor = vec4(vColor, alpha * 0.8);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        });

        this.particleSystem = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(this.particleSystem);

        // Store reference for animation
        this.particleMaterial = particleMaterial;
    }

    createGeometryNodes() {
        // Create floating geometric shapes
        const shapes = [
            { geometry: new THREE.TetrahedronGeometry(8, 0), count: 5 },
            { geometry: new THREE.OctahedronGeometry(6, 0), count: 4 },
            { geometry: new THREE.IcosahedronGeometry(5, 0), count: 6 },
            { geometry: new THREE.DodecahedronGeometry(7, 0), count: 3 }
        ];

        shapes.forEach(shape => {
            for (let i = 0; i < shape.count; i++) {
                const material = new THREE.MeshPhongMaterial({
                    color: Math.random() > 0.5 ? 0x00ffff : 0xff0080,
                    transparent: true,
                    opacity: 0.3,
                    wireframe: Math.random() > 0.5
                });

                const mesh = new THREE.Mesh(shape.geometry, material);
                
                // Random positioning
                mesh.position.x = (Math.random() - 0.5) * 300;
                mesh.position.y = (Math.random() - 0.5) * 300;
                mesh.position.z = (Math.random() - 0.5) * 200;

                // Random rotation
                mesh.rotation.x = Math.random() * Math.PI;
                mesh.rotation.y = Math.random() * Math.PI;
                mesh.rotation.z = Math.random() * Math.PI;

                // Store original position for floating animation
                mesh.userData.originalPosition = mesh.position.clone();
                mesh.userData.floatSpeed = Math.random() * 0.02 + 0.01;
                mesh.userData.rotationSpeed = {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                };

                this.scene.add(mesh);
                this.geometryNodes.push(mesh);
            }
        });
    }

    bindEvents() {
        // Mouse movement
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            this.targetRotation.x = this.mouse.y * 0.1;
            this.targetRotation.y = this.mouse.x * 0.1;
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.onWindowResize();
        });

        // Device orientation for mobile
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (event) => {
                const alpha = event.alpha * Math.PI / 180; // Z axis
                const beta = event.beta * Math.PI / 180;   // X axis
                const gamma = event.gamma * Math.PI / 180; // Y axis

                this.targetRotation.x = beta * 0.1;
                this.targetRotation.y = gamma * 0.1;
            });
        }
    }

    onWindowResize() {
        if (!this.camera || !this.renderer) return;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        this.animationFrameId = requestAnimationFrame(() => this.animate());

        const elapsedTime = this.clock.getElapsedTime();

        // Update particle system
        if (this.particleMaterial) {
            this.particleMaterial.uniforms.time.value = elapsedTime;
        }

        // Smooth camera rotation based on mouse/device orientation
        this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
        this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.05;

        // Apply rotation to scene
        this.scene.rotation.x = this.currentRotation.x;
        this.scene.rotation.y = this.currentRotation.y;

        // Animate particle system rotation
        if (this.particleSystem) {
            this.particleSystem.rotation.y += 0.002;
            this.particleSystem.rotation.x += 0.001;
        }

        // Animate geometry nodes
        this.geometryNodes.forEach(node => {
            // Floating animation
            node.position.y = node.userData.originalPosition.y + 
                              Math.sin(elapsedTime * node.userData.floatSpeed) * 20;

            // Rotation animation
            node.rotation.x += node.userData.rotationSpeed.x;
            node.rotation.y += node.userData.rotationSpeed.y;
            node.rotation.z += node.userData.rotationSpeed.z;

            // Pulsing opacity
            const material = node.material;
            material.opacity = 0.2 + Math.sin(elapsedTime * 2 + node.position.x * 0.01) * 0.1;
        });

        // Render
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    // Method to be called when component unmounts
    destroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }

        // Cleanup geometry and materials
        this.geometryNodes.forEach(node => {
            if (node.geometry) node.geometry.dispose();
            if (node.material) {
                if (node.material.map) node.material.map.dispose();
                node.material.dispose();
            }
        });

        if (this.particleSystem) {
            if (this.particleSystem.geometry) this.particleSystem.geometry.dispose();
            if (this.particleSystem.material) this.particleSystem.material.dispose();
        }
    }

    // Public method to update scene based on scroll position
    updateScroll(scrollPercent) {
        if (this.camera) {
            this.camera.position.z = 100 + (scrollPercent * 50);
        }
        
        this.geometryNodes.forEach((node, index) => {
            const offset = scrollPercent * (index + 1) * 0.1;
            node.rotation.y += offset;
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if Three.js is available
    if (typeof THREE === 'undefined') {
        console.error('Three.js not loaded');
        return;
    }

    // Initialize the 3D scene
    window.spiderScene = new SpiderThreeScene();

    // Update scene based on scroll position
    let ticking = false;
    function updateScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / scrollHeight;
        
        if (window.spiderScene) {
            window.spiderScene.updateScroll(scrollPercent);
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    });
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.spiderScene) {
        window.spiderScene.destroy();
    }
});