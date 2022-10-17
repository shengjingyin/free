import * as THREE from "three";

export function init(w: number = 800, h: number = 800) {
    // 创建场景
    const scene = new THREE.Scene();

    // 光源
    const point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300);
    scene.add(point);
    // 环境光
    const ambient = new THREE.AmbientLight(0x444);
    scene.add(ambient);
    // 相机
    const k = w / h, // 宽高比
        s = 200; // 缩放系数
    const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(100, 200, 300);
    camera.lookAt(scene.position); // 设置相机方向（指向场景的位置）

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);
    renderer.setClearColor(0xfff0ff, 1); // 背景色

    return {
        scene,
        renderer,
        THREE,
        render() {
            renderer.render(scene, camera);
        },
    };
}
