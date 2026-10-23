export class InputManager{
 constructor(canvas){this.keys=new Set();this.pressed=new Set();this.canvas=canvas;this.enabled=false;addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();if(!this.keys.has(e.code))this.pressed.add(e.code);this.keys.add(e.code);});addEventListener('keyup',e=>this.keys.delete(e.code));addEventListener('blur',()=>this.keys.clear());canvas.tabIndex=0;}
 down(code){return this.keys.has(code)} tap(code){const v=this.pressed.has(code);this.pressed.delete(code);return v} clear(){this.keys.clear();this.pressed.clear();}
}
