import _ from 'lodash';
import Setting from './utils/Setting'
import Web3 from 'web3';
import {
	Alert,
    DeviceEventEmitter
} from "react-native";
let web3 = new Web3();

global.Initialize = {
	isRefreshTrans:false,
	isRefreshTransFlag:false,
	newsModelFlag:true,
	UnreadCount:0,
	newsData:[],
	isRefreshNews:false,
	image:{
		
	},
	refreshTransRecord:(address,errorFun) => {
		
	},
	loadNewsData:(errorFun) => {
		
	},
	switchTheme:() => {
		Theme.set('WHITE');
		/*let themeType =  eval(Setting.get("themeType"));
		if(themeType){
			let date = new Date();
			let hours = Number(date.format('HH'));
			if(hours > 6 && hours < 19){
				Setting.set('theme','WHITE');
                Theme.set('WHITE');
			}else{
				Setting.set('theme','BLACK');
                Theme.set('BLACK');
			}
		}*/
	}
}

//自动切换主题
if(_.isEmpty(Setting.get("themeType")))Setting.set("themeType","true");
Initialize.switchTheme();


