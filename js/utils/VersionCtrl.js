import { 
	Platform,
	Alert,
	Linking,
	BackHandler
} from 'react-native';

//import DeviceUtil from './DeviceUtil';

import {
  isFirstTime,
  isRolledBack,
  packageVersion,
  currentVersion,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
  markSuccess,
} from 'react-native-update';

import _updateConfig from '../../update.json';
const {appKey} = _updateConfig[Platform.OS];

const DeviceUtil = {
	getApkVerNo: ()=>{ return Config.apkVerNo },
	getApkVer: ()=>{ return Config.apkVer },
}

const VerCtrl = {
	//hot update check
	checkHotUpdate: (callback) => {
		if (isFirstTime) {
	    	markSuccess();
	    	console.log('[Hot Update] first started success!');
	    } else if (isRolledBack) {
	      	console.warn('[Hot Update] update failed, version has rolled back!');
	    }

	    console.log('[Hot Update] check version for update...');
	    checkUpdate(appKey).then(info => {
	    	console.log("[Hot Update] upload info: ", info);
	    	if(info.update){
	      		VerCtrl.doHotUpdate(info, callback);
	    	}else{
	    		callback && callback();
	    	}
	    }).catch(err => {
	    	console.warn('[Hot Update] check update failed: ', err);
	    	callback && callback();
	    });
	},

	doHotUpdate: (info, callback) => {
	    downloadUpdate(info).then(hash => {
	    	//console.log('[Hot Update] download success, can be used to switch now!');
	    	let metaInfo = {};
	    	try{
	    		metaInfo = JSON.parse(info.metaInfo);
	    	}catch(err){
	    		console.log("[Hot Update] update info without metaInfo: ", err);
	    	}
	    	if(metaInfo.noDelay){
	    		//立即应用
	    		switchVersion(hash);
	    	}else{
	    		//下次启动应用
	    		switchVersionLater(hash);
	    	}
	    }).catch(err => { 
	    	console.warn('[Hot Update] download failed!', err);
	    	callback && callback();
	    });
  	},
  	//apk version check
  	checkApkUpdate: function(newestFun, errorFun){
  		if(Platform.OS != 'android'){
  			return;
  		}
  		Http.checkApkVer(DeviceUtil.getApkVerNo(), (res)=>{
  			VerCtrl.doApkUpdate(res, newestFun);
  		}, function(){
  			errorFun && errorFun();
  		});
  	},
  	doApkUpdate: function(res, newestFun, errorFun){
  		res = res || window.APK_UPDATE_INFO;
		window.APK_UPDATE_INFO = res;
		if(res.success) {
			if(res.data.last.ver_no <= DeviceUtil.getApkVerNo()){
				newestFun && newestFun();
				return;
			}
			let force = res.data.force;
			let content = force ? I18n.t('app_update_tip_force') : I18n.t('app_update_tip');
			content = content.replace("{curr}", DeviceUtil.getApkVer()).replace("{last}", res.data.last.ver_id);
			Alert.alert(I18n.t('app_update_title'), content, [{
				text: I18n.t('btn_no'),
				onPress: ()=>{
					if(force){
						BackHandler.exitApp();
					}
				}
			}, {
				text: I18n.t('btn_download'),
				onPress: ()=>{
					Linking.openURL(Http.getApkDownloadUrl());
				}
			}],{
				cancelable: false
			});
		}else{
			errorFun && errorFun();
		}
	},
	//检查当前版本时是否已停用
	invalidVer: function(){
		let info = window.APK_UPDATE_INFO;
		return info && info.data && info.data.force;
	}
}

export default VerCtrl;