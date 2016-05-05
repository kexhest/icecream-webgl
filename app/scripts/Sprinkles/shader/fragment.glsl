uniform vec3 color;
uniform float opacity;
uniform sampler2D texture;

void main() {
  vec4 textureColor = texture2D(texture, gl_PointCoord);

  gl_FragColor = textureColor * vec4(color, opacity);
}
