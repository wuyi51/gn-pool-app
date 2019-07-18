import {AudioRecorder, AudioUtils} from 'react-native-audio'
import Sound from 'react-native-sound'
import _ from 'lodash'

let whoosh = null;	//当前播放的 Sound 对象
let recording = false;

/*
  option: {
	maxTime: int 最大录音时长， 默认90秒
	onStart: function 开始录音回调
	onProgress: function 录音中回调
	onFinish: function 录音完成回调
  }
*/
function startRecord(option){
	option = option || {};
	let maxTime = option.maxTime || 10;
	// 请求授权
    AudioRecorder.requestAuthorization().then(isAuthor => {
        console.log('是否授权: ' + isAuthor)
        if(!isAuthor) {
        	return alert('请前往设置开启录音权限')
        }
        console.log("-------- onStart: ")

        let fileName = new Date().getTime() + ".aac";
        let audioPath = AudioUtils.DocumentDirectoryPath + '/' + fileName;
        AudioRecorder.prepareRecordingAtPath(audioPath, {
	        SampleRate: 44100,
	        Channels: 1,
	        AudioQuality: "High",	//Low, Medium, High
	        AudioEncoding: "aac",
	        AudioEncodingBitRate: 32000
	    });
	    recording = true;
	    setTimeout(stopRecord, maxTime * 1000);
	    // 开始录音
	    AudioRecorder.startRecording();
	    option.onStart && option.onStart();
        // 录音进展
        //data: { currentTime: 9.003999710083008 }
        AudioRecorder.onProgress = (data) => {
        	console.log("-------- onFinish: ", data)
        	option.onProgress && option.onProgress(data.currentTime);
        };
        /**
        完成录音
        data: {
        	base64: '',
			audioFileURL: 'file:///data/user/0/com.sinoc.chat/files/1562684113529.acc',
			status: 'OK' 
		}
		*/
        AudioRecorder.onFinished = (data) => {
        	recording = false;
        	// data 返回需要上传到后台的录音数据
          	console.log("-------- onFinish: ", data)
          	option.onFinish && option.onFinish(data);
          	//playSound(data.audioFileURL);
        };
    });
}
function stopRecord(){
	if(recording){
		console.log("----------- stop record");
		AudioRecorder.stopRecording();
	}
}
function playSound(path, callback){
	//path = 'file:///data/user/0/com.sinoc.chat/files/1562685503182.acc';
	if(!path){
		return;
	}
	path = path.replace('file://', '');
	console.log('---------- 开始播放', path)
	stopSound();
	setTimeout(()=>{
		whoosh = new Sound(path, '', (err) => {
	      	if(err) {
	        	return console.log(err)
	      	}
	    });
	    setTimeout(()=>{
		  	whoosh.play(success => {
		  		callback && callback(success);
		    	if(success) {
		      		console.log('success - 播放成功')
		    	}else {
		      		console.log('fail - 播放失败')
		    	}
		    	whoosh.release();
		  	});
	    }, 100);
	}, 100);
}

function stopSound(){
	if(whoosh){
		whoosh.stop();
		whoosh.release();
		whoosh = null;
	}
}


export default {
	startRecord,
	stopRecord,
	playSound,
	stopSound
}