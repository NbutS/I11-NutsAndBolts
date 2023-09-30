// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import AudioManager from "./AudioManager";
import LevelController from "./LevelController";
import NutManager from "./NutsManager";
import Screw from "./Screw";
import ScrewManager from "./ScrewManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Nuts extends cc.Component {

    @property
    containScrewID: number = -1;
    @property(cc.Vec3)
    position: cc.Vec3 = new cc.Vec3();
    @property
    id: number = 0;
    @property
    allowTouch: boolean = true;
    @property
    currentColliderStay: string = "";
    protected onLoad(): void {
        //this.deltaTime = cc.director.getDeltaTime();
        this.position = this.node.position;
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
    }
    onTouchStart(event: cc.Event.EventTouch){
        if(LevelController.instance.chooseRemoveOption == true && this.containScrewID != -1 ){
            AudioManager.instance.Play("Remove_Sound");
            let idScrew = this.containScrewID;
            this.containScrewID = -1;
            LevelController.instance.chooseRemoveOption = false;
            LevelController.instance.numberSlotRemove--;
            ScrewManager.instance.screwArray[idScrew].destroy();
            for(let i = 0 ; i < ScrewManager.instance.screwArray.length ; i++){
                if(ScrewManager.instance.screwArray[i] != null){
                    ScrewManager.instance.screwArray[i].children[0].color = new cc.Color(255,255,255);
                }
            }
            //ScrewManager.instance.screwArray.splice(idScrew,1);
            return;
        }
        if(!NutManager.instance.allowTouch || !this.allowTouch){
            console.log("cannot touch Nut");
            return;
        }
        if(this.containScrewID != -1){
            if(NutManager.instance.currentScrewID == -1){
                NutManager.instance.currentScrewID = this.containScrewID;
                let screwCom = ScrewManager.instance.screwArray[this.containScrewID].getComponent(Screw);
                if(screwCom == null){
                    console.log("screwCom null");
                }
                screwCom.ChangeAnim("ScrewMoveUp");
                AudioManager.instance.Play("Pull_Sound");
            }
            else if (NutManager.instance.currentScrewID != -1){
                if(NutManager.instance.currentScrewID == this.containScrewID){
                    let screwCom = ScrewManager.instance.screwArray[NutManager.instance.currentScrewID].getComponent(Screw);
                    screwCom.ChangeAnim("ScrewMoveDown");
                    NutManager.instance.currentScrewID = -1;
                }
                else{
                    let screwCom = ScrewManager.instance.screwArray[NutManager.instance.currentScrewID].getComponent(Screw);
                    screwCom.ChangeAnim("ScrewMoveDown");
                    NutManager.instance.currentScrewID = this.containScrewID;
                    let screwCom_1 = ScrewManager.instance.screwArray[this.containScrewID].getComponent(Screw);
                    screwCom_1.ChangeAnim("ScrewMoveUp");
                    AudioManager.instance.Play("Pull_Sound");
                }
                AudioManager.instance.Play("Put_Sound");
            }
            
           
        }
        
        else if(this.containScrewID == -1){
            if (NutManager.instance.currentScrewID != -1 ){
                // let indexNutTarget = NutManager.instance.currentScrewID;
                // let indexScrew = NutManager.instance.nutsArray[indexNutTarget].getComponent(Nuts).containScrewID;
                // console.log("currentScrewID: " + NutManager.instance.currentScrewID);
                // console.log("containScrewId: " + this.containScrewID);
                // console.log("indexScrew: " + indexScrew);
                // ScrewManager.instance.screwArray[indexScrew].getComponent(Screw).moveToAnotherNut(this.node.position);
                
                // NutManager.instance.nutsArray[indexNutTarget].getComponent(Nuts).containScrewID = -1;
                // this.containScrewID = ScrewManager.instance.screwArray[indexScrew].getComponent(Screw).id;
                // let screwCom = ScrewManager.instance.screwArray[NutManager.instance.currentScrewID].getComponent(Screw);
                // screwCom.ChangeColor(new cc.Vec3(104,104,104));
                // screwCom.setEnablePhysicCollier(false);
                // NutManager.instance.currentScrewID = -1;
                console.log("currentScrewID: " + NutManager.instance.currentScrewID);
                console.log("containScrewId: " + this.containScrewID);
                let indexScrew = NutManager.instance.currentScrewID;
                let screwCom = ScrewManager.instance.screwArray[indexScrew].getComponent(Screw);
                let indexNutContain = screwCom.idNutContain;
                let nutCom = NutManager.instance.nutsArray[indexNutContain].getComponent(Nuts);
                screwCom.moveToAnotherNut(this.node.position);
                screwCom.idNutContain = this.id;
                this.containScrewID = screwCom.id;
                nutCom.containScrewID = -1;
                NutManager.instance.currentScrewID = -1;

            }
        }
        console.log("value of picked: " + NutManager.instance.picked);

    }
    onCollisionStay(other,self){
        if(this.currentColliderStay == ""){
            this.allowTouch = false;
            this.currentColliderStay = other.node.group;
        }
        
        //console.log("collisionStay: " + other.node.group);
    }
    onCollisionExit(other, self){
        if(other.node.group == this.currentColliderStay){
            console.log("onCollisionExit Nut");
            this.currentColliderStay = "";
            this.allowTouch = true;
        }
        
    }
    


}
