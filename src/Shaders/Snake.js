export const Shader = {
    uniforms: {
        'iTime': { 'value': 0.01 }
    },
    vertexShader: [
        'varying vec2 vUv;',
        'void main() {',
            'vUv = uv;',
            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1. );',
        '}'
    ].join( '\n' ),
    fragmentShader: [
        'precision highp float;',
        'varying vec2 vUv;',
        'uniform float iTime;',


        'float Hash21 (vec2 p) {',
            'p = fract(p * vec2(234.45, 435.245));',
            'p += dot(p, p + 34.34);',
            'return fract(p.x * p.y);',
        '}',


        'void main () {',
            'float t = iTime*.2;',
            'vec2 uv = vUv * 15. + vec2(sin(t), cos(t)) * 5.;',
            'vec3 col = vec3(0.);',


            'vec2 gv = fract(uv)-.5;', 
            'vec2 id = floor(uv);',           
            'float n = Hash21(id);',

            'float width = .4 * (1. - length(vec2(.5)-(vUv * 0.2)));',
            'if (n < .5) gv.x *= -1.;',


            'vec2 cUv = gv - sign(gv.x + gv.y)*.5;',
            'float d = length(cUv) -.5;',
            'd = length(cUv);',   
            'float mask = smoothstep(.01, -.01, abs(d-.5) - width);', 
            'float angle = atan(cUv.x, cUv.y);',
            'float checker = mod(id.x + id.y + 0.01, 2.)*2. -1.;',
            'float flow = sin(iTime * 3. + checker * angle*10.);',
            'float x = fract(angle/1.57);',

            'float y = (d -(.5-width))/(2.*width);', 
            'y = abs(y -.5) * 2.;',
            
            'col.rg += vec2(x, y) * mask * flow;',

            //'if (gv.x>.48 || gv.y>.48) col = vec3(1., 0., 0.);',

            'gl_FragColor = vec4(col, 1.);',
      '}'
    ].join( '\n' )   
} 

