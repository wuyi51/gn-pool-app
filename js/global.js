//global一定要在Realm后面引入，否则atob对象会导致Realm会误判当前环境为chrom环境，最终导致Realm报错：
//undefined is not an object (evaluating '_NativeModules$Realm.debugHosts')
import _ from 'lodash';

global.Buffer = require('buffer').Buffer;
global.process = require('process');

if (typeof btoa === 'undefined') {
	global.btoa = function (str) {
	  return new Buffer(str, 'binary').toString('base64');
	};
}

if (typeof atob === 'undefined') {
	global.atob = function (b64Encoded) {
	  return new Buffer(b64Encoded, 'base64').toString('binary');
	};
}


global.WorldManager = {
	unreadMsgCount: 0,  //未读消息数量
    unreadChatCount: 0,     //未读会话数量
    unreadChatDetail: {},    //未读会话列表 {id: num, id: num, ....}

    currUser: {},
    tcpStatus: null
}

global.delNullFields = function(obj){
	if(_.isEmpty(obj)){
		return;
	}
	_.forEach(obj, function(v, k){
		if(v === null){
			delete obj[k];
		}
	});
}

global.msgSnapshot = function(type, content){
	let map = {
		image: 'msg_type_image',
		voice: 'msg_type_voice',
		video: 'msg_type_video',
	}
	if(map[type]){
		let t = I18n.t(map[type]);
		return ['[', t, ']'].join('');
	}
	return content || '';
}
global.imgSource = function(uri, _default){
	if(uri){
		return { uri }
	}
	return _default || null;
}

global.emojiList = ["😀","😁","😂","😃","😄","😅","😆","😉","😊","😋","😎","😍","😘","😗","😙","😚","☺","😇","😐","😑","😶","😏","😣","😥","😮","😯","😪","😫","😴","😌","😛","😜","😝","😒","😓","😔","😕","😲","😷","😖","😞","😟","😤","😢","😭","😦","😧","😨","😬","😰","😱","😳","😵","😡","😠","😈","👿","💪","✋","👌","👍","👎","✊","👊","👋","👏","🐁","🐂","🐅","🐇","🐉","🐍","🐎","🐐","🐒","🐓","🐕","🐖","🚂","🚃","🚄","🚅","🚆","🚇","🚈","🚉","🚊","🚝","🚞","🚋","🚌","🚍","🚎","🚏","🚐","🚑","🚒","🚓","🚔","🚕","🚖","🚗","🚘","🚚","🚛","🚜","🚲","🏠","🏡","🏢","🏣","🏤","🏥","🏦","🏨","🏩","🏪","🏫","🏬","🏭","🏯","🏰","💒","⛪","📱","💰","💳","📘","🔒","🔓","🔐","🔑","🔍"];


