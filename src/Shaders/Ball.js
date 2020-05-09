
export const Shader = {
    uniforms: {
        'iTime': { 'value': 0.01 }
    },
    vertexShader: [
        'varying vec2 vUv;',
        'void main() {',
            'vUv = uv;',
            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
        '}'
    ].join( '\n' ),
    fragmentShader: [
        'precision highp float;',
        'varying vec2 vUv;',
        'uniform float iTime;',


        'float sdElipsoid ( in vec3 pos, vec3 rad ) {',
            'float k0 = length(pos/rad);',
            'float k1 = length(pos/rad/rad);',
            'return k0*(k0-1.)/k1;', 
        '}',

        'float smin ( in float a, float b, float k ) {',
            'float h = max(k - abs(a-b), k);',
            'return min(a, b) - h * h / k * 4.;',
        '}', 

        'float sdGuy( in vec3 pos ) {',
            'float t = fract(iTime);',
            'float y = 1.5 * t * (1. - t);',
            'vec3 cen = vec3(0., y, 0.);',

            'float sy = .5 + 2. * y;',
            'float sz = 1./sy;',

            'vec3 rad = vec3(.015 * sz, .015 * sy, .015 * sz);',

            'vec3 q = pos-cen;',

            'float d = sdElipsoid(q, rad);',
            'float d2 = sdElipsoid(q + vec3(0., -.06, 0.), rad * 0.03);',
            'float d3 = sdElipsoid(q + vec3(0., 0, -.15), rad * 0.1);',

            'd2 = smin(d2, d3, 0.05);', 
            'd = smin(d, d2, 0.05);',

            'return d;',
        '}',

        
        'float map( in vec3 pos ) {',
            'float d1 = sdGuy(pos);',
            'float d2 = pos.y - (-.06);',
            'return min(d1, d2);', 
        '}',


        'vec3 calcNormal ( in vec3 pos ) {',
            'vec2 e = vec2(0.03, 0.);',
            'return normalize( vec3 (map( pos+e.xyy) + map(pos+e.xyy),',
                                    'map( pos+e.yxy) + map(pos+e.yxy),',
                                    'map( pos+e.yyx) + map(pos+e.yyx))',
            ');', 
        '}',


        'float castRay ( in vec3 ro, vec3 rd ) {',
            'float t = 0.;',
            'for ( int i=0; i<100; i++ ) {',
                'vec3 pos = ro + t*rd;',
                'float h = map( pos );',

                'if ( h<0.001) break;', 

                't += h;',
                
                'if ( t>20. ) break;',  
            '}',
            'if ( t>20. ) t=-1.;',
            'return t;',
        '}',


        'void main () {',
            'vec2 p = vUv - 0.5;',

            'vec3 ro = vec3(2.5 * sin(iTime), 0., 2.5 * cos(iTime));',
            'vec3 ta = vec3(0., .2, 0.);',

            'vec3 ww = normalize( ta-ro );',
            'vec3 uu = normalize( cross(ww, vec3(0., 1., 0.)) );',
            'vec3 vv = normalize( cross(uu, ww) );',

            'vec3 rd = normalize( p.x*uu + p.y*vv + 1.8*ww);',


            'vec3 col = vec3(1.4, .75, 1.) - 0.7*rd.y;', 

            'float t = 0.;',
            'for ( int i=0; i<100; i++ ) {',
                'vec3 pos = ro + t*rd;',
                'float h = map( pos );',

                'if ( h<0.001) break;', 

                't += h;',
                
                'if ( t>20.) break;',  
            '}',

            'if ( t>.0 ) {',
                'vec3 pos = ro + t*rd;',
                'vec3 nor = calcNormal(pos);',

                'vec3 mate = vec3(.18);',

                'vec3 sun_dir = normalize(vec3(.8, .4, -.2));',
                'float sun_dif = clamp( dot(nor, sun_dir), 0., 1.0);',
                'float sun_sha = step(castRay( pos+nor*0.0001, sun_dir ), 0.);',
                'float sky_dif = clamp( .5 + .5 * dot(nor, vec3(0., 1., 0.)), 0., .7);',
                'float bou_dif = clamp( .5 + .5 * dot(nor, vec3(0., -1., 0.)), 0., .7);',

                'col  = vec3(.7, .45, .3) * sun_dif * sun_sha;',
                'col += mate * vec3(.5, .8, .9) * sky_dif;',
                'col += mate * vec3(.7, .3, .2) * bou_dif;',
            '}',

            'col = pow( col, vec3( .4545 ));',

            'gl_FragColor = vec4(col, 1.);',
      '}'
    ].join( '\n' )
}
