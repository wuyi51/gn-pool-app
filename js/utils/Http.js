import _ from 'lodash';

import MD5 from 'crypto-js/md5';
import {Alert} from 'react-native';
import Setting from './Setting'

const appAddress = global.Config.appAddress

function toUrl(url, param){
	url = url.replace('{app_name}', Config.appName);
	/*let _url = "";
	if(url.indexOf("token")!= -1){
		_url = "http://192.168.0.108:80"+url
	}else{
		_url = appAddress + url;
	}*/

	let _url = appAddress + url;
	let _p = urlParam(param);
	if(_p){
		_url += '?' + urlParam(param);
	}
	return _url;
}
function urlParam(json){
	if(_.isEmpty(json)){
		return "";
	}
	let ps = _.map(json, function(v, k){
		return [k, v].join('=');
	}); 
	return ps.join("&");
}
function doSuccess(json, successFun, errorFun, preFun){
	//登录超时
	if(!json.success && json.code == 1001){
		Alert.alert(I18n.t('session_timeout'), I18n.t('session_timeout_tip'), [{
			text: I18n.t('confirm'),
			onPress: ()=>{
				if(global._navigation){
					global._navigation.navigate('LoginScreen');
				}
			}
		}]);
		return json;
	}
	if(preFun){
		preFun(json);
	}
	if(successFun){
		successFun(json)
	}
	return json; 
}
function doError(url, error, errorFun){
	if(errorFun){
		errorFun(error);
	}
	console.warn("Http error: ", url, error);
}
function get(url, data, successFun, errorFun, preFun){
	let language = Setting.get('language');
	data = data || {};
	data.locale = language;
	url = toUrl(url, data);
	console.log(url);
	return fetch(url)
	.then((response) => response.json())
	.then((response) => {
		return doSuccess(response, successFun, errorFun, preFun);
	})
	.catch((error) => {
		doError(url, error, errorFun);
	});
}
function post(url, data, successFun, errorFun, preFun){
	let language = Setting.get('language');
	data = data || {};
	data.locale = language;
	url = toUrl(url);
	let opts = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			//'Content-Type': 'application/json',
			"Content-Type": "application/x-www-form-urlencoded",
			"mode": "cors"
		}
	};
	if(!_.isEmpty(data)){
		opts.body = urlParam(data);
	}
	console.log(opts);
	return fetch(url, opts)
	.then((response) => response.json())
	.then((response) => {
		return doSuccess(response, successFun, errorFun, preFun);
	})
	.catch((error) => {
		doError(url, error, errorFun);
	});
}

function postFile(url, fileUri, successFun, errorFun, preFun){
	url = toUrl(url);
	let formData = new FormData();
	let file = {
		uri: fileUri,
		type: 'multipart/form-data',
		name: fileUri.replace(/.*\//, "")
	}
	formData.append("file", file);
	let opts = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type':'multipart/form-data',
			"mode": "cors"
		},
		body:formData
	};
	return fetch(url, opts)
	.then((response) => response.json())
	.then((response) => {
		return doSuccess(response, successFun, errorFun, preFun);
	})
	.catch((error) => {
		doError(url, error, errorFun);
	});
}

global.Http = {

	uploadImg: function(uri, successFun, errorFun){
		return postFile("/file_serv/file/upload", uri, successFun, errorFun);
	},
	getImg: function(fileName, _default){
		return fileName ? toUrl("/file_serv/file/get/" + fileName) : (_default || null);
	},


	getERC20TokenABI:function(param, successFun, errorFun){
		return get('/token/tokenCertification/getERC20TokenABI', param, successFun, errorFun);
	},

	getTokenTransactionByAddress:function(param,successFun, errorFun){
		return get('/token/tokenCertification/getTokenTransactionByAddress', param, successFun, errorFun);
	},

	getERC20TokenBalance:function(param,successFun, errorFun){
		return get('/token/tokenCertification/getERC20TokenBalance', param, successFun, errorFun);
	},

	getFile:function(fileName){
		return toUrl('/token/tokenCertification/download?filename='+fileName);
	},

	getTokenList:function(param,successFun, errorFun){
		return get('/token/tokenCertification/getToken', param, successFun, errorFun);
	},

	getGasPrice:function(successFun, errorFun){
		return get('/api/block/getAvgGasPrice', null, successFun, errorFun);
	},

	getBalanceByAddress:function(param,successFun, errorFun){
		return get('/api/address/getBalanceByAddress', param, successFun, errorFun);
	},

	commitTx:function(param,successFun, errorFun){
		return post('/api/transaction/commitTx', param, successFun, errorFun);
	},

	getTransactionByAddress:function(param,successFun, errorFun){
		//测试
		//param.address = "0x0c1ea4004f43204d4215a66042d3c88bf7350ab1";
		return get('/api/address/getTransactionByAddress', param, successFun, errorFun);
	},

	getNonce:function(param,successFun, errorFun){
		return get('/api/address/getNonce', param, successFun, errorFun);
	},


	getNewsDate:function(param,successFun, errorFun){
		return get('/api/news/getNews', param, successFun, errorFun);
	},

	getPrice:function(param,successFun, errorFun){
		return get('/api/price/getPrice', param, successFun, errorFun);
	},
	
	getPendingTrans:function(param,successFun, errorFun){
		return get('/api/address/getPendingByAddress', param, successFun, errorFun);
	},

	//------ app serv ------

	getNomal:function(param,successFun, errorFun){
		//return get('/app_serv/msg/sinoc-wallet-app/getNomal', param, successFun, errorFun);
	},

	getMajor:function(param,successFun, errorFun){
		//return get('/app_serv/msg/sinoc-wallet-app/getMajor', param, successFun, errorFun);
	},

	getImportantNews:function(param,successFun, errorFun){
		//return get('/json/importantNews.json', param, successFun, errorFun);
	},

	getExchangeRate: function(from, to, successFun, errorFun){
		return get('/app_serv/support/exchangeRate/' + from + "/" + to, null, successFun, errorFun);
	},
	usageLog: function(deviceInfo){
		let params = {info: deviceInfo};
		return post('/app_serv/appstat/usagelog', params);
	},
	checkApkVer: function(currVerNo, successFun, errorFun){
		return get('/app_serv/version/{app_name}/check/' + currVerNo, null, successFun, errorFun);
	},
	getApkDownloadUrl: function(){
		return toUrl("/app_serv/download_bliao.html");
	},


	//-------- chat --------
	verifyCodeUrl: function(){
		return toUrl("/chat_app/api/client/getImageCode?r=" + new Date().getTime());
	},
	getUserAllFriend: function(param, successFun, errorFun){
		return get('/chat_app/api/userFriend/userAllFriend.l', param, successFun, errorFun);
	},
	findAllFriendApplyByUserId: function(param, successFun, errorFun){
		return get('/chat_app/api/client/findAllFriendApplyByUserId.l', param, successFun, errorFun);
	},
	searchUser: function(param, successFun, errorFun){
		return get('/chat_app/api/client/searchUser.l', param, successFun, errorFun);
	},
	addFriendApply: function(param, successFun, errorFun){
		return get('/chat_app/api/client/addFriendApply.l', param, successFun, errorFun);
	},
	agreeFriendApply: function(param, successFun, errorFun){
		return get('/chat_app/api/client/agreeFriendApply.l', param, successFun, errorFun);
	},
	getFriendInfo: function(param, successFun, errorFun){
		return get('/chat_app/api/client/getFriendInfo.l', param, successFun, errorFun);
	},
	getUserGroups: function(param, successFun, errorFun){
		return get('/chat_app/api/group/getAllGroupInfo.l', param, successFun, errorFun);
	},
	getGroupInfo: function(param, successFun, errorFun){
		return get('/chat_app/api/group/getGroupInfo.l', param, successFun, errorFun);
	},
	searchGroup: function(param, successFun, errorFun){
		return get('/chat_app/api/group/searchGroup.l', param, successFun, errorFun);
	},
	joinGroup: function(param, successFun, errorFun){
		return get('/chat_app/api/group/joinGroup.l', param, successFun, errorFun);
	},
	createGroup: function(param, successFun, errorFun){
		return get('/chat_app/api/group/createGroup.l', param, successFun, errorFun);
	},
	sendEmail: function(param, successFun, errorFun){
		return get('/chat_app/api/client/sendEmail', param, successFun, errorFun);
	},
	loginByEmail: function(param, successFun, errorFun){
		return get('/chat_app/api/client/loginByEmail', param, successFun, errorFun);
	},
	login: function(param, successFun, errorFun){
		param.pwd = MD5(param.pwd).toString()
		return get('/chat_app/api/client/login', param, successFun, errorFun);
	},
	loginByToken: function(param, successFun, errorFun){
		return get('/chat_app/api/client/loginToken', param, successFun, errorFun);
	},
	register: function(param, successFun, errorFun){
		param.pwd = MD5(param.pwd).toString()
		return get('/chat_app/api/client/regist', param, successFun, errorFun);
	},
	logout: function(param, successFun, errorFun){
		return get('/chat_app/api/client/logout', param, successFun, errorFun);
	},
	resetPwd: function(param, successFun, errorFun){
		param.newPwd = MD5(param.newPwd).toString()
		return get('/chat_app/api/client/resetPwd', param, successFun, errorFun);
	},
	updateUserInfo: function(param, successFun, errorFun){
		return get('/chat_app/api/client/setUserInfo.l', param, successFun, errorFun);
	},

};
