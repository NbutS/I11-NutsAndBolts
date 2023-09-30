const {ccclass, property} = cc._decorator;
 
@ccclass
export default class Sound extends cc.Component {
 
    @property
    nameSound: string = "";
 
 
    @property(cc.AudioClip)
    clip: cc.AudioClip = null;
    
    @property
    volumn: number = 0;
 
    @property(cc.AudioSource)
    source: cc.AudioSource = null;
    @property
    loop: boolean = false;
    @property
    isPlayOnLoad: boolean = true;
 
}