import _ from 'lodash'
import Setting from '../utils/Setting'

const Black = {
	header: '#eeeeee',	//头部字体颜色

	white: '#eeeeee',
	black: '#000000',

	under: "#000000",	//背景色
	fore: '#eeeeee',	//前景色
	lightXX: '#dddddd',
	lightX: '#cccccc', //中间色
	light: '#999999', //中间色
	middle: '#777777', //中间色
	dark: '#444444', //中间色
	darkX: '#222222', //中间色
	darkXX: '#111111', //中间色
	darkXXX: '#080808', //中间色
	darkMax: '#040404', //中间色

	bgPrimary: "#009FE7",
	bgSuccess: "#00C2C8",
	bgWarning: "#FC8251",
	bgInfo: "#7C89F0",
	bgError: "#dd5336",

	transp:"#ffffff44",

	popMenu: "#434343",
/*
	linearPrimary: ["#009FE7", "#6fc6f1"],
	linearWarning: ["#F76B52", "#FF9352"],
	linearInfo: ["#6975E5", "#98A1FC"],
	linearSuccess: ["#04afc0", "#20dbd6"],
	linearError: ["#da2e16", "#e55a5a"],
	linearStart: {x: 0.2, y: 0},
	linearEnd: {x: 0.5, y: 1},
*/
}
const White = {
	header: '#ffffff',	//头部字体颜色

	white: '#ffffff',
	black: '#000000',
	
	under: "#ffffff",	//背景色
	fore: '#000000',	//前景色
	lightXX: '#111111', //中间色
	lightX: '#222222', //中间色
	light: '#444444', //中间色
	middle: '#777777', //中间色
	dark: '#999999', //中间色
	darkX: '#cccccc', //中间色
	darkXX: '#d8d8d8', //中间色
	darkXXX: '#f0f0f0', //中间色
	darkMax: '#f6f6f6', //中间色

	bgPrimary: "#009FE7",
	bgSuccess: "#00C2C8",
	bgWarning: "#FC8251",
	bgInfo: "#7C89F0",
	bgError: "#dd5336",

	transp:"#00000088",

	popMenu: "#434343",
}

/*const theme = Config.theme || 'WHITE';

const _default = theme == 'WHITE' ? White : Black;
Setting.set("theme", theme);*/

global.Theme = {
	set: function(id){
		Setting.set("theme", id || 'WHITE');
		if(id == 'BLACK'){
			global.Colors = Black;
		}else if(id == 'WHITE'){
			global.Colors = White;
		}
		if(global.reloadGStyle){
			global.reloadGStyle();
		}
	}	
}
if(_.isEmpty(Setting.get('theme'))) Setting.set("theme",Config.theme || 'WHITE');
global.Theme.set(Setting.get('theme'));

//global.Colors = _default;