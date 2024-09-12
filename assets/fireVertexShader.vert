varying vec2 vUv;
varying vec3 vPosition;
uniform float iTime;

// 简单的噪声函数
float noise(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 45.5432))) * 43758.5453);
}

void main() {
    vUv = uv;
    
    // 添加基于时间和位置的扰动
    vec3 pos = position;
    float displacement = noise(vec3(pos.xy, iTime * 0.5)) * 0.1;
    pos.xy += displacement;
    
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}