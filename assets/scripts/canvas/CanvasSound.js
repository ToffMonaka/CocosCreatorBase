var ConstantUtil = require('ConstantUtil');

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {default: null, serializable: false, visible: false},
        bgmFilePathArray: {default: [], url: cc.AudioClip},
        bgmDataArray: {default: [], visible: false},
        bgmMuteFlag: {default: false, visible: false},
        bgmVolume: {default: 1.0, visible: false},
        seFilePathArray: {default: [], url: cc.AudioClip},
        seDataArray: {default: [], visible: false},
        seMuteFlag: {default: false, visible: false},
        seVolume: {default: 1.0, visible: false}
    },

    onLoad: function () {
        return;
    },

    create: function (desc) {
        this.canvas = desc.canvas;

        this.setBGMMuteFlag(this.canvas.storage.optionStorage.data.soundBGMMuteFlag);
        this.setBGMVolume(this.canvas.storage.optionStorage.data.soundBGMVolume);
        this.setSEMuteFlag(this.canvas.storage.optionStorage.data.soundSEMuteFlag);
        this.setSEVolume(this.canvas.storage.optionStorage.data.soundSEVolume);

        return (0);
    },

    update: function (time) {
        for (let dat_i = 0; dat_i < this.bgmDataArray.length; ++dat_i) {
            let dat = this.bgmDataArray[dat_i];

            let stat = cc.audioEngine.getState(dat.audioID);
    
            if (stat < 0) {
                this.bgmDataArray.splice(dat_i, 1);

                --dat_i;
            } else {
                switch (dat.fadeType) {
                case ConstantUtil.CANVAS_SOUND.BGM_FADE_TYPE.IN: {
                    dat.fadeTime += time;

                    if (dat.fadeTime >= ConstantUtil.CANVAS_SOUND.BGM_FADE_TIME) {
                        dat.fadeType = ConstantUtil.CANVAS_SOUND.BGM_FADE_TYPE.NONE;
                        dat.fadeTime = ConstantUtil.CANVAS_SOUND.BGM_FADE_TIME;
                    }

                    cc.audioEngine.setVolume(dat.audioID, (this.bgmMuteFlag) ? 0.0 : this.getBGMRealVolume(this.bgmVolume, dat.volumeRate, dat.fadeTime));

                    break;
                }
                }
            }
        }

        for (let dat_i = 0; dat_i < this.seDataArray.length; ++dat_i) {
            let dat = this.seDataArray[dat_i];

            let stat = cc.audioEngine.getState(dat.audioID);
    
            if (stat < 0) {
                this.seDataArray.splice(dat_i, 1);

                --dat_i;
            }
        }
        
        return;
    },
    
    playBGM: function (file_path_id, volume_rate, loop_flg) {
        this.stopBGM();

        let audio_id = cc.audioEngine.play(this.bgmFilePathArray[file_path_id], loop_flg, 0.0);

        cc.audioEngine.setCurrentTime(audio_id, 0);
    
        this.bgmDataArray.push({audioID: audio_id, volumeRate: volume_rate, fadeType: ConstantUtil.CANVAS_SOUND.BGM_FADE_TYPE.IN, fadeTime: 0.0});

        return (audio_id);
    },

    stopBGM: function (audio_id) {
        if (audio_id === undefined) {
            for (let dat_i = 0; dat_i < this.bgmDataArray.length; ++dat_i) {
                let dat = this.bgmDataArray[dat_i];
    
                cc.audioEngine.stop(dat.audioID);
            }

            this.bgmDataArray = [];
        } else {
            for (let dat_i = 0; dat_i < this.bgmDataArray.length; ++dat_i) {
                let dat = this.bgmDataArray[dat_i];
    
                if (dat.audioID == audio_id) {
                    cc.audioEngine.stop(dat.audioID);

                    this.bgmDataArray.splice(dat_i, 1);
                    
                    break;
                }
            }
        }

        return;
    },
    
    setBGMMuteFlag: function (mute_flg) {
        if (mute_flg == this.bgmMuteFlag) {
            return;
        }
    
        this.bgmMuteFlag = mute_flg;
    
        this.flushBGMVolume();

        return;
    },

    setBGMVolume: function (volume) {
        if (volume == this.bgmVolume) {
            return;
        }
    
        this.bgmVolume = volume;
    
        this.flushBGMVolume();

        return;
    },

    getBGMRealVolume: function (volume, volume_rate, fade_time) {
        return (Math.clamp_TML(volume * volume_rate * (fade_time / ConstantUtil.CANVAS_SOUND.BGM_FADE_TIME), 0.0, 1.0));
    },
    
    flushBGMVolume: function () {
        let bgmVolume = (this.bgmMuteFlag) ? 0.0 : this.bgmVolume;

        for (let dat_i = 0; dat_i < this.bgmDataArray.length; ++dat_i) {
            let dat = this.bgmDataArray[dat_i];

            cc.audioEngine.setVolume(dat.audioID, this.getBGMRealVolume(bgmVolume, dat.volumeRate, dat.fadeTime));
        }
            
        return;
    },
    
    playSE: function (file_path_id, volume_rate, loop_flg) {
        let audio_id = cc.audioEngine.play(this.seFilePathArray[file_path_id], loop_flg, (this.seMuteFlag) ? 0.0 : this.getSERealVolume(this.seVolume, volume_rate));
    
        cc.audioEngine.setCurrentTime(audio_id, 0);
        
        this.seDataArray.push({audioID: audio_id, volumeRate: volume_rate});
    
        return (audio_id);
    },

    stopSE: function (audio_id) {
        if (audio_id === undefined) {
            for (let dat_i = 0; dat_i < this.seDataArray.length; ++dat_i) {
                let dat = this.seDataArray[dat_i];
    
                cc.audioEngine.stop(dat.audioID);
            }

            this.seDataArray = [];
        } else {
            for (let dat_i = 0; dat_i < this.seDataArray.length; ++dat_i) {
                let dat = this.seDataArray[dat_i];
    
                if (dat.audioID == audio_id) {
                    cc.audioEngine.stop(dat.audioID);

                    this.seDataArray.splice(dat_i, 1);
                    
                    break;
                }
            }
        }

        return;
    },
    
    setSEMuteFlag: function (mute_flg) {
        if (mute_flg == this.seMuteFlag) {
            return;
        }
    
        this.seMuteFlag = mute_flg;
    
        this.flushSEVolume();

        return;
    },

    setSEVolume: function (volume) {
        if (volume == this.seVolume) {
            return;
        }
    
        this.seVolume = volume;
    
        this.flushSEVolume();

        return;
    },

    getSERealVolume: function (volume, volume_rate) {
        return (Math.clamp_TML(volume * volume_rate, 0.0, 1.0));
    },
    
    flushSEVolume: function () {
        let seVolume = (this.seMuteFlag) ? 0.0 : this.seVolume;

        for (let dat_i = 0; dat_i < this.seDataArray.length; ++dat_i) {
            let dat = this.seDataArray[dat_i];

            cc.audioEngine.setVolume(dat.audioID, this.getSERealVolume(seVolume, dat.volumeRate));
        }
            
        return;
    }
});
