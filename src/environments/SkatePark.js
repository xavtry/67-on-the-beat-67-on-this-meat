export function createPark(T,scene,type='bowl'){
 const group=new T.Group(); scene.add(group); const concrete=new T.MeshStandardMaterial({color:'#8f9898',roughness:.94}), edge=new T.MeshStandardMaterial({color:'#c6c8bf',roughness:.8}), metal=new T.MeshStandardMaterial({color:'#515d62',metalness:.65,roughness:.42}), grass=new T.MeshStandardMaterial({color:'#65745e',roughness:1});
 const floor=new T.Mesh(new T.PlaneGeometry(180,180),concrete); floor.rotation.x=-Math.PI/2; floor.position.y=-.12; floor.receiveShadow=true; group.add(floor);
 // concrete seams across the skateable floor
 const seamMat=new T.MeshStandardMaterial({color:'#737e80',roughness:1}); for(let i=-8;i<=8;i++){let s=new T.Mesh(new T.BoxGeometry(150,.008,.025),seamMat);s.position.set(0,-.105,i*5.5);group.add(s);let s2=new T.Mesh(new T.BoxGeometry(.025,.008,150),seamMat);s2.position.set(i*5.5,-.104,0);group.add(s2);}
 const addBox=(x,y,z,w,h,d,mat=concrete)=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;group.add(m);return m;};
 const addRamp=(x,z,w,d,h,rot=0)=>{const shape=new T.Shape();shape.moveTo(-d/2,0);shape.lineTo(d/2,0);shape.lineTo(d/2,h);shape.quadraticCurveTo(0,h*1.04,-d/2,0);const g=new T.ExtrudeGeometry(shape,{depth:w,bevelEnabled:false,steps:1});g.rotateY(Math.PI/2);const m=new T.Mesh(g,concrete);m.position.set(x-w/2,0,z);m.rotation.y=rot;m.castShadow=true;m.receiveShadow=true;group.add(m);return m;};
 const addRail=(x,z,length,rot=0)=>{const rail=new T.Mesh(new T.CylinderGeometry(.055,.055,length,10),metal);rail.rotation.z=Math.PI/2;rail.rotation.y=rot;rail.position.set(x,.72,z);rail.castShadow=true;group.add(rail);for(const dx of [-length*.35,length*.35])addBox(x+dx,.32,z,.09,.65,.09,metal);};
 if(type==='bowl'){
   // Large shallow bowls: smooth rounded basins formed from radial bowl geometry.
   const bowl=(cx,cz,r,depth)=>{const verts=[],idx=[],segments=56,rings=18;for(let j=0;j<=rings;j++){const t=j/rings,rr=r*t;for(let i=0;i<=segments;i++){const a=i/segments*Math.PI*2;const y=-depth*(1-Math.cos(t*Math.PI/2));verts.push(cx+Math.cos(a)*rr,y,cz+Math.sin(a)*rr);}}for(let j=0;j<rings;j++)for(let i=0;i<segments;i++){const a=j*(segments+1)+i,b=a+segments+1;idx.push(a,b,a+1,b,b+1,a+1);}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(verts,3));g.setIndex(idx);g.computeVertexNormals();const m=new T.Mesh(g,new T.MeshStandardMaterial({color:'#a0a7a4',side:T.DoubleSide,roughness:.95}));m.position.y=.03;m.receiveShadow=true;group.add(m);const lip=new T.Mesh(new T.TorusGeometry(r,.08,6,80),edge);lip.rotation.x=Math.PI/2;lip.position.set(cx,.02,cz);group.add(lip);};
   bowl(-13,-8,10,2.8); bowl(10,-13,8,2.2); bowl(16,8,6,1.6);
   addBox(0,.12,0,5,.24,28,edge); addRamp(-1,15,8,11,2.3); addRamp(19,1,8,10,2.0); addRail(-2,7,7,.15); addRail(5,-2,9,-.18); addBox(-23,.45,6,7,.9,2,edge); addRail(-23,6,5);
 } else {
   addRamp(-15,-9,9,13,3); addRamp(15,-10,10,13,3.1); addRamp(-15,15,8,10,2.4); addRamp(17,15,8,10,2.4);
   addBox(0,.38,1,12,.76,2,edge); addBox(-2,.55,11,5,1.1,1.5,edge); addBox(9,.28,0,4,.56,2.2,edge); addBox(-8,.2,-15,4,.4,2,edge);
   addRail(0,7,9); addRail(8,-6,7,.12); addRail(-8,2,7,-.2);
   // stairs with distinct nosings
   for(let i=0;i<5;i++){addBox(-20+i*.75,.12+i*.16,0,1.5,.24+i*.32,3,edge);addBox(-20+i*.75,.25+i*.16,1.52,1.5,.035,.05,metal);}
 }
 // chain-link inspired perimeter fence and poles
 for(let z of [-38,38]){addBox(0,1.7,z,78,.07,.08,metal);for(let x=-39;x<=39;x+=4)addBox(x,1.5,z,.07,3,.07,metal);}
 for(let x of [-39,39]){addBox(x,1.7,0,.08,.07,76,metal);for(let z=-38;z<=38;z+=4)addBox(x,1.5,z,.07,3,.07,metal);}
 // sparse palms and background blocks
 for(const [x,z] of [[-31,-20],[31,-22],[-32,22],[32,24]]){const trunk=new T.Mesh(new T.CylinderGeometry(.22,.35,5,8),new T.MeshStandardMaterial({color:'#78604b'}));trunk.position.set(x,2.5,z);trunk.castShadow=true;group.add(trunk);for(let i=0;i<7;i++){const leaf=new T.Mesh(new T.ConeGeometry(.18,3.2,5),grass);leaf.position.set(x+Math.cos(i*Math.PI*2/7)*1.1,5.2,z+Math.sin(i*Math.PI*2/7)*1.1);leaf.rotation.z=Math.cos(i*Math.PI*2/7)*.75;leaf.rotation.x=Math.sin(i*Math.PI*2/7)*.75;group.add(leaf);}}
 for(let i=0;i<16;i++){const h=8+(i%5)*3,w=5+(i%3)*3;const b=new T.Mesh(new T.BoxGeometry(w,h,7),new T.MeshStandardMaterial({color:i%2?'#a8b0af':'#9da6a6',roughness:1}));b.position.set((i-8)*10,h/2-1,-54-(i%3)*8);group.add(b);}
 return {group,type,obstacles:[]};
}
