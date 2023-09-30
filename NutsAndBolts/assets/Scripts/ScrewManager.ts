// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import LevelController from "./LevelController";
import Screw from "./Screw";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ScrewManager extends cc.Component {

    @property([cc.Node])
    screwArray: cc.Node[] = [];
    @property
    numberOfBolt: number = 0;
    @property
    numberOfUnlockBolt: number = 0;
    private static _instance: ScrewManager;
    public static get instance(): ScrewManager{
        if(!ScrewManager._instance){
            ScrewManager._instance = new ScrewManager();
        }
        return ScrewManager._instance;
    }
    protected onLoad(): void {
        ScrewManager._instance = this;
        //this.startLevel();
    }
    startLevel(){
        for( let i = 0 ; i < this.screwArray.length ; i++ ){
            let screwCom = this.screwArray[i].getComponent(Screw);
            screwCom.scheduleOnce(()=>{
                screwCom.ChangeAnim("ScrewMoveUp");
            },0.2*i);
            screwCom.scheduleOnce(()=>{
                screwCom.ChangeAnim("ScrewMoveDown");
            },0.2*(i+1));
        }
        LevelController.instance.scheduleOnce(()=>{
            LevelController.instance.startLevel(false);
        },0.2 * this.screwArray.length);
        
    }
}
