// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Common, { inGameState } from "./Common";
import GameManager from "./GameManager";
import Nuts from "./Nuts";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NutManager extends cc.Component {

    @property([cc.Node])
    nutsArray: cc.Node[] = [];
    @property
    picked: boolean = false;
    @property
    currentScrewID: number = -1;
    @property
    allowTouch: boolean = true;
    @property
    timeCount: number = 0;
    private static _instance: NutManager;
    public static get instance(): NutManager{
        if(!NutManager._instance ){
            NutManager._instance = new NutManager();
        }
        return NutManager._instance;
        
    }
    protected onLoad(): void {
        NutManager._instance = this;
    }
    protected update(dt: number): void {
        if(GameManager.instance.stateGame == inGameState.PLAYING){
            let count = 0;
            for( let i = 0 ; i < this.nutsArray.length ; i++ ){
                let nutCom = this.nutsArray[i].getComponent(Nuts);
                if(nutCom.containScrewID != -1 || nutCom.allowTouch == false){
                    count++;
                }
            }
            if(count == this.nutsArray.length){
                this.timeCount += cc.director.getDeltaTime();
                console.log("there is no more nut");
            }
            else{
                this.timeCount = 0;
            }
            if(this.timeCount > 7){
                Common.instance.node.emit("LossEvent");
                console.log("Loss Event");
            }
        }
        
    }
}
