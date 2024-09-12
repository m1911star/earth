uniform vec2 iResolution;
uniform float iTime;

varying vec2 vUv;
varying vec3 vPosition;

// 简单的哈希函数
vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)),
             dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

// 噪声函数（从Godot Shaders中借鉴）
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( dot( hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

// 分形布朗运动
float fbm(vec2 p) {
    float f = 0.0;
    float w = 0.5;
    for (int i = 0; i < 5; i++) {
        f += w * noise(p);
        p *= 2.0;
        w *= 0.5;
    }
    return f;
}

void main() {
    vec2 uv = vPosition.xy;
    float y = 1.0 - vPosition.y; // 火焰底部更亮
    
    // 创建火焰形状
    float n = fbm(uv * 4.0 + iTime * 0.5);
    float flame = n * y;
    
    // 颜色渐变
    vec3 col = vec3(1.0, 0.5, 0.0); // 基础橙色
    col = mix(col, vec3(1.0, 0.0, 0.0), flame * 0.8); // 添加一些红色
    col = mix(col, vec3(1.0, 1.0, 0.0), pow(flame, 4.0)); // 火焰核心为黄色
    
    // 透明度
    float alpha = smoothstep(0.1, 0.6, flame);
    
    gl_FragColor = vec4(col, alpha);
}
