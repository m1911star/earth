import * as THREE from 'three';
import {Color} from "three";
export const  latLongToVector3 = (lat: number, lon: number, radius: number) =>  {
  const phi = (90 - lat) * (Math.PI / 180); // 纬度转换为弧度制
  const theta = (lon + 180) * (Math.PI / 180); // 经度转换为弧度制

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

function createGlowingPoint(lat: number, lon: number, radius: number, size: number, color: Color) {
  const position = latLongToVector3(lat, lon, radius);
  const pointGeometry = new THREE.SphereGeometry(size, 32, 32);
  const pointMaterial = new THREE.MeshBasicMaterial({
    color: color,
    // emissive: color,
  });
  const point = new THREE.Mesh(pointGeometry, pointMaterial);
  point.position.copy(position);
  return point;
}
