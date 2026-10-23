export function createBoard(T){
 const root=new T.Group(); const deckMat=new T.MeshStandardMaterial({color:'#d5a35c',roughness:.65}); const grip=new T.MeshStandardMaterial({color:'#25282b',roughness:1}); const truckMat=new T.MeshStandardMaterial({color:'#aeb8bb',metalness:.72,roughness:.35}); const wheelMat=new T.MeshStandardMaterial({color:'#e9e4d9',roughness:.7});
 // softened, tapered deck profile
 const shape=new T.Shape(); shape.moveTo(-.13,-.58); shape.quadraticCurveTo(-.22,-.62,-.23,-.46); shape.lineTo(-.19,.46); shape.quadraticCurveTo(-.18,.62,-.08,.62); shape.lineTo(.08,.62); shape.quadraticCurveTo(.19,.62,.20,.46); shape.lineTo(.22,-.46); shape.quadraticCurveTo(.22,-.62,.11,-.58); shape.closePath();
 const geo=new T.ExtrudeGeometry(shape,{depth:.055,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.025,bevelThickness:.025,curveSegments:8}); geo.rotateX(-Math.PI/2); geo.translate(0,.12,0);
 const deck=new T.Mesh(geo,deckMat); deck.castShadow=true; root.add(deck);
 const top=new T.Mesh(new T.BoxGeometry(.35,.012,1.06),grip); top.position.y=.17; top.castShadow=true; root.add(top);
 for(const z of [-.38,.38]){const truck=new T.Mesh(new T.BoxGeometry(.34,.055,.08),truckMat);truck.position.set(0,.075,z);root.add(truck);for(const x of [-.205,.205]){const w=new T.Mesh(new T.CylinderGeometry(.075,.075,.055,12),wheelMat);w.rotation.z=Math.PI/2;w.position.set(x,.045,z);w.castShadow=true;root.add(w);}}
 root.userData={deckMat,wheelMat,wheels:root.children.filter(o=>o.geometry?.type==='CylinderGeometry')};
 return {root,materials:{deckMat,wheelMat}};
}
