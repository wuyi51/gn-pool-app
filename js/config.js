import React from 'react';
import _ from 'lodash';
/*
React.Component.prototype.__test = function(){
	console.log("=========react component prototype test", this.render);
}*/

console.log("---------========== react dev: ", __DEV__);

const config = {
	apkVerNo: 3,
	apkVer: "0.2.1-alpha",

	version: '0.2.1-alpha',
	appName: "gn-pool-app",

	appAddress: 'http://47.52.214.103',

	
	sinocProtocolAddress: 'http://xxx/protocol.html',

	theme: 'WHITE',		//主题通过 utils/Colors.js 的配色方案实现
	language:'zh',
	mainCion:'XXX',
	mainCionContractAddress:'0x0000000000000000000000000000000000000000',

	defaultGwei:20,
	defaultGas:60000,

	refreshCount:100
};
if(__DEV__) {
	_.extend(config, {
		appAddress: 'http://192.168.0.107:8010',
	});
}

global.Config = config;