// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import AudioManager from "./AudioManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Key extends cc.Component {

    @property
    rotation: number = 0;
    @property(cc.Vec3)
    targetpos: cc.Vec3 = new cc.Vec3();
    @property
    timeMove: number = 0.3;
    @property
    isMoved: boolean = false;
    onCollisionEnter(other,self){
        if((other.node.group == "bolt_1" || other.node.group == "bolt_2" ||other.node.group == "bolt_3" ) && !this.isMoved){
            this.isMoved = true;
            this.RotateBeforeMove();
            this.scheduleOnce(()=>{
                this.MoveUnlock();
            },0.3);
        }
        if(other.node.group == "Lock"){
            this.scheduleOnce(()=>{
                AudioManager.instance.Play("Unlock_Sound");
                other.node.destroy();
                this.node.destroy();
            },0.3);
            
        }
    }
    MoveUnlock(){
        cc.tween(this.node)
                .to(this.timeMove,{position:this.targetpos})
                .start();
    }
    RotateBeforeMove(){
        cc.tween(this.node)
                .by(0.5,{angle: this.rotation})
                .start();
    }
}
