document.addEventListener('DOMContentLoaded', () => {
    const birthDateInput = document.getElementById('birth-date');
    const fetchBtn = document.getElementById('fetch-btn');
    const resultSection = document.getElementById('result-container');
    const resultLoader = document.getElementById('loader');
    const apodContent = document.getElementById('apod-content');
    const apodTitle = document.getElementById('apod-title');
    const apodDate = document.getElementById('apod-date');
    const apodExplanation = document.getElementById('apod-explanation');

    const API_URL = 'http://localhost:8001/api/apod';

    try {
        initThreeScene();
    } catch (e) { console.error("Three.js error:", e); }

    fetchBtn.addEventListener('click', async () => {
        const date = birthDateInput.value;
        if (!date) return alert('Por favor, selecione uma data de nascimento.');

        resultSection.classList.remove('hidden');
        resultLoader.classList.remove('hidden');
        apodContent.classList.add('hidden');
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        try {
            const resp = await fetch(`${API_URL}?date=${date}`);
            const data = await resp.json();
            if (!resp.ok) throw new Error(data.detail || 'Erro na conexão espacial.');

            apodTitle.innerText = data.title;

            const imageWrapper = document.querySelector('.image-wrapper');
            if (data.media_type === 'video') {
                imageWrapper.innerHTML = `<iframe id="apod-video" src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
            } else {
                imageWrapper.innerHTML = `<img id="apod-image" src="${data.url}" alt="NASA APOD">`;
            }

            apodDate.innerText = new Date(data.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
            apodExplanation.innerText = data.explanation;

            resultLoader.classList.add('hidden');
            apodContent.classList.remove('hidden');
        } catch (err) {
            console.error(err);
            alert(`Erro: ${err.message}`);
            resultSection.classList.add('hidden');
        }
    });

    function initThreeScene() {
        if (!window.THREE) return;

        const container = document.getElementById('three-container');
        const scene = new THREE.Scene();

        const canvas = document.createElement('canvas');
        canvas.width = 128; canvas.height = 128;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, 'rgba(79, 70, 229, 0.2)');
        gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.1)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);
        const texture = new THREE.CanvasTexture(canvas);

        const planeGeo = new THREE.PlaneGeometry(100, 100);
        const planeMat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false });
        const plane = new THREE.Mesh(planeGeo, planeMat);
        plane.position.z = -50;
        scene.add(plane);

        const starsGeo = new THREE.BufferGeometry();
        const starsCount = 2000;
        const posArray = new Float32Array(starsCount * 3);

        for (let i = 0; i < starsCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }
        starsGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const starsMat = new THREE.PointsMaterial({ size: 0.1, color: 0xffffff, transparent: true, opacity: 0.8 });
        const starMesh = new THREE.Points(starsGeo, starsMat);
        scene.add(starMesh);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        camera.position.z = 5;

        let tx = 0, ty = 0;
        document.addEventListener('mousemove', (e) => {
            tx = (e.clientX / window.innerWidth) * 2 - 1;
            ty = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        const animate = () => {
            requestAnimationFrame(animate);

            const positions = starsGeo.attributes.position.array;
            for (let i = 2; i < starsCount * 3; i += 3) {
                positions[i] += 0.05;
                if (positions[i] > 5) positions[i] -= 100;
            }
            starsGeo.attributes.position.needsUpdate = true;
            plane.rotation.z += 0.001;

            camera.position.x += (tx * 0.5 - camera.position.x) * 0.05;
            camera.position.y += (ty * 0.5 - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        };
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
});
