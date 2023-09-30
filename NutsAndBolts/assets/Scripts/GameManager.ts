// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import AudioManager from "./AudioManager";
import Common, { inGameState } from "./Common";
import LevelController from "./LevelController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Node)
    winScreenNode: cc.Node = null;
    @property(cc.Node)
    lossScreenNode: cc.Node = null;
    @property(cc.Prefab)
    rightParticlePrefabs: cc.Prefab = null;
    @property(cc.Node)
    rightFireworkContainer: cc.Node = null;
    @property(cc.Node)
    leftFireworkContainer: cc.Node = null;
    @property
    currentLevel: number = 0;
    @property
    achivedLevel: number = 0;
    @property
    stateGame: number = 1;
    @property(cc.Node)
    levelTextNodeWin: cc.Node = null;
    @property(cc.Node)
    levelTextNodeLoss: cc.Node = null;
    @property([cc.Prefab])
    arrayLevels: cc.Prefab[] = [];
    @property(cc.Node)
    levelHolderNode: cc.Node = null;
    leftParticle: cc.Node ;
    rightParticle: cc.Node;
    private static _instance: GameManager;
    public static get instance(): GameManager{
        if(!GameManager._instance){
            GameManager._instance = new GameManager();
        }
        return GameManager._instance;
    }
    protected onLoad(): void {
        this.InstantiateLevel();
        Common.instance.node.on(Common.instance.WinEvent, this.WinEvent, this);
        Common.instance.node.on(Common.instance.LossEvent, this.LossEvent,this);
        GameManager._instance = this;
    }

    InstantiateLevel(){

        this.levelHolderNode.removeAllChildren();
        let level = cc.instantiate(this.arrayLevels[this.currentLevel]);
        this.levelHolderNode.addChild(level);
        LevelController.instance.numberSlotRemove = 1;
        this.stateGame = inGameState.PLAYING;
    }
    WinEvent(){
        
        if(this.currentLevel == 49){
            this.currentLevel = 0;
        }
        else{
            this.currentLevel++;
        }
        AudioManager.instance.Play("Win_Sound");
        this.scheduleOnce(function() 
        {
            
            this.rightParticle = cc.instantiate(this.rightParticlePrefabs)
            this.rightParticle.parent = this.rightFireworkContainer;
            this.leftParticle = cc.instantiate(this.rightParticlePrefabs);
            this.leftParticle.parent = this.leftFireworkContainer;
            this.rightParticle.position = cc.Vec2.ZERO;
        },0.2);
        this.scheduleOnce(function()
        {
            if( this.rightParticle !== null || this.leftParticle !== null)
            {
                this.rightParticle.destroy();
                this.leftParticle.destroy();
            }
        },3.5)
        this.scheduleOnce(()=>{
            this.winScreenNode.active = true;
            let animWin  = this.winScreenNode.getComponent(cc.Animation);
            animWin.play(animWin.getClips()[0].name);
        },2.5);
        this.setLevelText(this.levelTextNodeWin,this.currentLevel);
        this.stateGame = inGameState.WIN;
    }
    NextLevel()
    {
        this.InstantiateLevel();
        this.winScreenNode.active = false;
    }
    setLevelText(textNode: cc.Node, level: number){
        let text = textNode.getComponent(cc.Label);
        text.string = "Level " + (level);
    }
    LossEvent(){
        this.lossScreenNode.active = true;
        let anim = this.lossScreenNode.getComponent(cc.Animation);
        anim.play(anim.getClips()[0].name);
        this.setLevelText(this.levelTextNodeLoss, this.currentLevel+1);
        this.stateGame = inGameState.LOSS;
    }


    
    
}
