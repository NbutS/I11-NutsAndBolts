// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Bolt from "./Bolt";
import Common from "./Common";
import Screw from "./Screw";
import ScrewManager from "./ScrewManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CheckWin extends cc.Component {

    onCollisionEnter(other, self){
        let boltCom = other.node.getComponent(Bolt);
        if(boltCom!=null){
            if(boltCom.isFalled == false){
                boltCom.isFalled = true;
                ScrewManager.instance.numberOfUnlockBolt++;
                console.log("value of falled Bolt: " + ScrewManager.instance.numberOfUnlockBolt);
                if(ScrewManager.instance.numberOfUnlockBolt == ScrewManager.instance.numberOfBolt){
                    Common.instance.node.emit("WinEvent");
                }
            }
            
        }
        
    }
}
