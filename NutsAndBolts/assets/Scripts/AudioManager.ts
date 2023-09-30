import Sound from "./Sound";
 
const {ccclass, property} = cc._decorator;
 
@ccclass
export default class AudioManager extends cc.Component {
 
    private static _instance:AudioManager = null;
    public static get instance(): AudioManager{
        if ( !AudioManager._instance){
            console.log("recreate AudioManager");
            AudioManager._instance = new AudioManager();
        }
        return AudioManager._instance;
    }
    @property(Sound)
    sounds: Sound[] = [];
    
    protected onLoad(): void {
        AudioManager._instance = this;
        
        for ( let sound of this.sounds){
            console.log("call in for sound");
            sound.source.clip = sound.clip;
            sound.source.volume = sound.volumn;
            sound.source.loop = sound.loop;
            sound.source.playOnLoad = sound.isPlayOnLoad;
        }
            
    }
 
    public Play(name:string):void{
        console.log("size of sounds " + this.sounds.length);
        let s = this.sounds.find(sound => sound.nameSound == name);
        if (s == null){
            console.log("there is no sound of name " + name);
            return;
        }
        s.source.play();
    }
    public Stop(name: string):void{
        let s = this.sounds.find(sound => sound.nameSound == name);
        if (s == null){
            console.log("there is no sound of name " + name);
            return;
        }
        s.source.stop();
    }
    public Mute(name: string): void{
        let s = this.sounds.find(sound => sound.nameSound == name);
        if (s == null){
            console.log("there is no sound of name " + name);
            return;
        }
        s.source.volume = 0;
    }
    public UnMute(name:string): void{
        let s = this.sounds.find(sound => sound.nameSound == name);
        if (s == null){
            console.log("there is no sound of name " + name);
            return;
        }
        s.source.volume = s.volumn;
    }
    public isPlaying(name:string ):boolean{
        let s = this.sounds.find(sound => sound.nameSound == name);
        if (s == null){
            console.log("there is no sound of name " + name);
            return;
        }
        return s.source.isPlaying;
    }
    public isMute(name:string): boolean{
        let s = this.sounds.find(sound => sound.nameSound == name);
        if (s == null){
            console.log("there is no sound of name " + name);
            return;
        }
        return s.source.volume == 0;
    }
}