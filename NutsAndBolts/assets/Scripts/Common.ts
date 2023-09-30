// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

export enum inGameState{
    NONE,
    PLAYING,
    WIN,
    LOSS
}
const {ccclass, property} = cc._decorator;

@ccclass
export default class Common extends cc.Component {

    private static _instance: Common;
    public static get instance(): Common{
        if(!Common._instance){
            Common._instance = new Common();
        }
        return Common._instance;
    }
    protected onLoad(): void {
        Common._instance = this;
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
    }

    WinEvent: string = "WinEvent";
    LossEvent: string = "LossEvent";
}
