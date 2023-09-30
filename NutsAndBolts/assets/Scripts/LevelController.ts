// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import AudioManager from "./AudioManager";
import { inGameState } from "./Common";
import GameManager from "./GameManager";
import NutManager from "./NutsManager";
import Screw from "./Screw";
import ScrewManager from "./ScrewManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelController extends cc.Component {

    @property(cc.Node)
    winScreen: cc.Node = null;
    @property(cc.Node)
    lossScreen: cc.Node = null;
    @property(cc.Node)
    levelLabelNode: cc.Node = null;
    @property
    numberSlotRemove: number = 1;
    @property
    chooseRemoveOption: boolean = false;
    @property(cc.Node)
    blockInputNodeStartLevel: cc.Node = null;
    // @property(cc.Node)
    // settingScreenNode: cc.Node = null;
    @property(cc.Node)
    soundButton: cc.Node = null;
    @property(cc.Node)
    musicButton: cc.Node = null;
    private static _instance: LevelController;
    public static get instance():LevelController{
        if(!LevelController._instance){
            LevelController._instance = new LevelController();
        }
        return LevelController._instance;
    }
    protected onLoad(): void {
        LevelController._instance = this;
        this.setTextForLevelLabelNode(GameManager.instance.currentLevel + 1);
    }

    ReLoadLevelWin(){
        if(this.winScreen.active){
            let animWin = this.winScreen.getComponent(cc.Animation);
            let duration = animWin.getClips()[1].duration;
            animWin.play(animWin.getClips()[1].name);
            this.scheduleOnce(()=>{
                this.winScreen.active = false;
            },duration); 
        }
        this.chooseRemoveOption = false;
        AudioManager.instance.Play("Button_Sound");
        GameManager.instance.currentLevel-=1;
        console.log("current Level in Replay Win");
        
        GameManager.instance.InstantiateLevel();
        this.chooseRemoveOption = false;
        //this.startLevel(true);
    }
    ReloadLevelLoss(){
        if(GameManager.instance.stateGame == inGameState.WIN){
            return;
        }
        if(this.lossScreen.active){
            let animWin = this.lossScreen.getComponent(cc.Animation);
            let duration = animWin.getClips()[1].duration;
            animWin.play(animWin.getClips()[1].name);
            this.scheduleOnce(()=>{
                this.lossScreen.active = false;
            },duration);
        }
        this.chooseRemoveOption = false;
        AudioManager.instance.Play("Button_Sound");
        GameManager.instance.InstantiateLevel();
        this.chooseRemoveOption = false;
        //this.startLevel(true);
    }

    NextLevel(){
        if(this.winScreen.active){
            let animWin = this.winScreen.getComponent(cc.Animation);
            let duration = animWin.getClips()[1].duration;
            animWin.play(animWin.getClips()[1].name);
            this.scheduleOnce(()=>{
                this.winScreen.active = false;
            },duration); 
        }
        this.chooseRemoveOption = false;
        AudioManager.instance.Play("Button_Sound");
        GameManager.instance.InstantiateLevel();
        this.setTextForLevelLabelNode(GameManager.instance.currentLevel + 1);
        //this.startLevel(true);
    }
    setTextForLevelLabelNode(level: number){
        let text = this.levelLabelNode.getComponent(cc.Label);
        text.string = "Level " + level;
    }

    RemoveScrewEvent(){
        AudioManager.instance.Play("Button_Sound");
        if(this.numberSlotRemove > 0 && NutManager.instance.currentScrewID == -1){
            //this.numberSlotRemove--;
            if(this.chooseRemoveOption == false){
                for(let i = 0 ; i < ScrewManager.instance.screwArray.length ; i++){
                    //let screwCom = ScrewManager.instance.screwArray[i].getComponent(Screw);
                    ScrewManager.instance.screwArray[i].children[0].color = new cc.Color(255,51,0);
                }
                this.chooseRemoveOption = true;
            }
            else{
                for(let i = 0 ; i < ScrewManager.instance.screwArray.length ; i++){
                    //let screwCom = ScrewManager.instance.screwArray[i].getComponent(Screw);
                    ScrewManager.instance.screwArray[i].children[0].color = new cc.Color(255,255,255);
                }
                this.chooseRemoveOption = false;
            }
            
        }
    }
    startLevel(state: boolean){
        this.blockInputNodeStartLevel.active = state;
    }
    // clickSettingButtonEvent(){
    //     AudioManager.instance.Play("Button_Sound");
    //     this.settingScreenNode.active = true;
    //     let animation = this.settingScreenNode.getComponent(cc.Animation);
    //     animation.play(animation.getClips()[0].name);
    // }
    // closeSettingScreen(){
    //     AudioManager.instance.Play("Button_Sound");
    //     let animation = this.settingScreenNode.getComponent(cc.Animation);
    //     let duration = animation.getClips()[1].duration;
    //     animation.play(animation.getClips()[1].name);
    //     this.scheduleOnce(()=>{
    //         this.settingScreenNode.active = false;
    //     }, duration);
    // }
    clickSoundButton(){
        AudioManager.instance.Play("Button_Sound");
        let anim = this.soundButton.getComponent(cc.Animation);
        if(!AudioManager.instance.isMute("Button_Sound")){
            AudioManager.instance.Mute("Button_Sound");
            AudioManager.instance.Mute("Win_Sound");
            AudioManager.instance.Mute("Remove_Sound");
            AudioManager.instance.Mute("Pull_Sound");
            AudioManager.instance.Mute("Put_Sound");
            AudioManager.instance.Mute("Unlock_Sound");
            anim.play(anim.getClips()[1].name);
        }
        else{
            AudioManager.instance.UnMute("Button_Sound");
            AudioManager.instance.UnMute("Win_Sound");
            AudioManager.instance.UnMute("Remove_Sound");
            AudioManager.instance.UnMute("Pull_Sound");
            AudioManager.instance.UnMute("Put_Sound");
            AudioManager.instance.UnMute("Unlock_Sound");
            anim.play(anim.getClips()[0].name);
        }
    }

}