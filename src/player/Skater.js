export function createSkater(T){
 const root=new T.Group();
 const mat=(color,roughness=.85)=>new T.MeshStandardMaterial({color,roughness});
 const hoodie=mat('#c99b32'), pants=mat('#30353b'), skin=mat('#b78369'), hair=mat('#171619'), shoes=mat('#e5dfd2'), dark=mat('#25272a');
 function ell(parent, colorMat, pos, scale, seg=12){const m=new T.Mesh(new T.SphereGeometry(1,seg,Math.max(8,seg-2)),colorMat);m.position.set(...pos);m.scale.set(...scale);m.castShadow=true;parent.add(m);return m;}
 function limb(parent,a,b,r1,r2,material){const v1=new T.Vector3(...a),v2=new T.Vector3(...b),d=v2.clone().sub(v1);const mesh=new T.Mesh(new T.CylinderGeometry(r2,r1,d.length(),10),material);mesh.position.copy(v1.add(v2).multiplyScalar(.5));mesh.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());mesh.castShadow=true;parent.add(mesh);return mesh;}
 // Legs, shoes and hips
 ell(root,pants,[0,1.0,0],[.32,.27,.2]);
 const limbs={};
 limbs.leftLeg=limb(root,[-.16,.95,0],[-.18,.48,.01],.13,.105,pants); limbs.rightLeg=limb(root,[.16,.95,0],[.18,.48,.01],.13,.105,pants);
 limbs.leftShin=limb(root,[-.18,.48,.01],[-.18,.16,.02],.105,.075,pants); limbs.rightShin=limb(root,[.18,.48,.01],[.18,.16,.02],.105,.075,pants);
 ell(root,shoes,[-.18,.12,.10],[.14,.085,.24]); ell(root,shoes,[.18,.12,.10],[.14,.085,.24]);
 // torso hoodie and hood
 const torso=new T.Mesh(new T.CapsuleGeometry(.31,.55,4,10),hoodie); torso.position.y=1.57; torso.scale.set(1,.92,.76); torso.castShadow=true; root.add(torso);
 ell(root,hoodie,[0,2.03,-.015],[.34,.31,.28]);
 const head=ell(root,skin,[0,2.23,.035],[.22,.29,.2],16); head.scale.x=.82;
 // hair cap + fringe
 ell(root,hair,[0,2.39,-.005],[.235,.18,.21],12);
 ell(root,hair,[-.11,2.34,.15],[.10,.17,.075],10); ell(root,hair,[.02,2.36,.18],[.09,.15,.07],10);
 // face details looking forward (+z)
 ell(root,dark,[-.075,2.25,.217],[.025,.018,.012],8); ell(root,dark,[.075,2.25,.217],[.025,.018,.012],8);
 ell(root,skin,[0,2.19,.224],[.025,.05,.025],8);
 // articulated arms; separate upper/lower segments
 limbs.leftArm=limb(root,[-.29,1.83,0],[-.43,1.43,.04],.105,.085,hoodie); limbs.rightArm=limb(root,[.29,1.83,0],[.43,1.43,.04],.105,.085,hoodie);
 limbs.leftFore=limb(root,[-.43,1.43,.04],[-.45,1.08,.11],.08,.06,hoodie); limbs.rightFore=limb(root,[.43,1.43,.04],[.45,1.08,.11],.08,.06,hoodie);
 ell(root,skin,[-.45,1.04,.12],[.07,.08,.07]); ell(root,skin,[.45,1.04,.12],[.07,.08,.07]);
 root.userData={hoodie,pants,shoes,limbs,head,torso,baseY:0};
 return {root, materials:{hoodie,pants,shoes}, limbs};
}
