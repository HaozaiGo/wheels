<!--
 * @Author: xiaoHao
-->
<template>
    <div class="session5" ref="session5"></div>
</template>

<script>
import * as THREE from "three"; // 引入three.js
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import cloud from '@/assets/cage/cloud.png';
export default {
    name: "threeD",
    data() {
        return {
            StartTime: Date.now(),
            camera: null,
            scene: null,
            renderer: {
                setSize: 0,
                domElement: null,
                render: null
            },
            controls: null,
            mesh: null,
            // 云的个数
            CloudCount: 1000,
            perCloudZ: 15,
            cameraPositionZ: 15000,
            RandomPositionX: 80,
            RandomPositionY: 120,
            BackGroundColor: '#1e4877',


        }
    },
    mounted() {
        this.init();

    },
    methods: {
        init() {
            const cameraPositionZ = this.CloudCount * this.perCloudZ
         
            this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
     
            // 相机的位置，平移下左右平衡
            this.camera.position.x = Math.floor(this.RandomPositionX / 2);

    
            this.camera.position.z = cameraPositionZ;
            console.log(this.camera);

            // 雾
            const fog = new THREE.Fog(this.BackGroundColor, 1, 1000);

            // 场景
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(this.BackGroundColor);

            const texture = new THREE.TextureLoader().load(cloud);


            const geometry = new THREE.PlaneGeometry(100, 100);
            let geometries = [];
            const vShader = `
                    varying vec2 vUv;
                    void main()
                    {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                    }
                `;
            const fShader = `
                    uniform sampler2D map;
                    uniform vec3 fogColor;
                    uniform float fogNear;
                    uniform float fogFar;
                    varying vec2 vUv;
                    void main()
                    {
                    float depth = gl_FragCoord.z / gl_FragCoord.w;
                    float fogFactor = smoothstep( fogNear, fogFar, depth );
                    gl_FragColor = texture2D(map, vUv );
                    gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );
                    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
                    }
                `;
            // 贴图材质
            const material = new THREE.ShaderMaterial({
                // 这里的值是给着色器传递的
                uniforms: {
                    map: {
                        type: 't',
                        value: texture
                    },
                    fogColor: {
                        type: 'c',
                        value: fog.color
                    },
                    fogNear: {
                        type: 'f',
                        value: fog.near
                    },
                    fogFar: {
                        type: 'f',
                        value: fog.far
                    }
                },
                vertexShader: vShader,
                fragmentShader: fShader,
                transparent: true
            });
            // console.log(material);
            for (var i = 0; i < this.CloudCount; i++) {
                const instanceGeometry = geometry.clone();

                // 把这个克隆出来的云，通过随机参数，做一些位移，达到一堆云彩的效果，每次渲染出来的云堆都不一样
                // X轴偏移后，通过调整相机位置达到平衡
                // Y轴想把云彩放在场景的偏下位置，所以都是负值
                // Z轴位移就是：当前第几个云*每个云所占的Z轴长度
                instanceGeometry.translate(Math.random() * this.RandomPositionX, -Math.random() * this.RandomPositionY, i * this.perCloudZ);

                geometries.push(instanceGeometry);
            }
            // console.log(geometries);
            // 把这些形状合并
            const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries);
          
            // 把上面合并出来的形状和材质，生成一个物体
            this.mesh = new THREE.Mesh(mergedGeometry, material);
            // 添加进场景
            this.scene.add(this.mesh);

            this.renderer = new THREE.WebGLRenderer({ antialias: false });

            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.$refs.session5.appendChild(this.renderer.domElement);
            this.animate();

        },
        animate() {
            requestAnimationFrame(this.animate);

            // 从最远的z轴处开始往前一点一点的移动，达到穿越云层的目的
          
            this.camera.position.z = this.cameraPositionZ - (((Date.now() - this.StartTime) * 0.03) % this.cameraPositionZ);
       
            this.renderer.render(this.scene, this.camera);
        }
    },

}
</script>
<style scoped>
.session5 {
    width: 600px;
    height: 100vh;
    flex-shrink: 0;
    background-image: linear-gradient(rgb(200, 240, 255), rgb(219, 255, 241));
}
</style>