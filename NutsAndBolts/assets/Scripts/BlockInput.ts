// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class BlockInput extends cc.Component {

    
    protected onLoad(): void {
        this.node.addComponent(cc.BlockInputEvents).enabled = true;
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
    }
    onTouchStart(event: cc.Event.EventTouch){

    }
}
