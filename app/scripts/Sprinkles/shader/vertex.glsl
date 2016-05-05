uniform float radiusX;
uniform float radiusZ;
uniform float height;
uniform float elapsed;
uniform float size;
uniform float scale;
uniform float velocityX;
uniform float velocityY;

void main() {
  vec3 pos = position;

  pos.x += cos((elapsed + position.z) * 0.25 * velocityX) * radiusX;
  pos.y = mod(pos.y - elapsed, height);
  pos.z += sin((elapsed + position.x) * 0.25 * velocityY) * radiusZ;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

  gl_PointSize = size * (scale / length(mvPosition.xyz));
  gl_Position = projectionMatrix * mvPosition;
}
