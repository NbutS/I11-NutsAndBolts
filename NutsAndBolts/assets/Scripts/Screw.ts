// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import AudioManager from "./AudioManager";
import NutManager from "./NutsManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Screw extends cc.Component {

    @property
    idNutContain: number = -1;
    @property
    id: number = 0;

    protected onLoad(): void {
        
    }
    moveToAnotherNut(targetPos: cc.Vec3){
        NutManager.instance.allowTouch = false;
        let circle = this.node.getComponent(cc.PhysicsCircleCollider);
        circle.enabled = false;
        cc.tween(this.node)
            .to(0.35,{position:targetPos})
            .call(()=>{
                AudioManager.instance.Play("Put_Sound");
                NutManager.instance.allowTouch = true;
                circle.enabled = true;
                this.ChangeAnim("ScrewMoveDown");
            })
            .start();
    }
    ChangeColor(color:cc.Vec3){
        if(this.node.children[0] == null){
            console.log("circle null");
            return;
        }
        this.node.children[0].color = new cc.Color(color.x,color.y,color.z);
    }
    setEnablePhysicCollier(state: boolean){
        let box = this.node.getComponent(cc.PhysicsCircleCollider);
        box.enabled = state;
    }
    ChangeAnim(name: string){
        let animation = this.node.getComponent(cc.Animation);
        animation.play(name);
    }
}
