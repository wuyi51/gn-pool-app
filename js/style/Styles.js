import {StyleSheet, Dimensions, Platform, StatusBar} from 'react-native';

const WINDOWS_WIDTH = Dimensions.get('window').width;
const WINDOWS_HEIGHT = Dimensions.get('window').height;
const CONTAINER_PADDING = 10;
const IOS_HEADER_HEIGHT = StatusBar.currentHeight;
const ADNROID_HEADER_HEIGHT = StatusBar.currentHeight;

const isIos = Platform.OS === 'ios';

global.WINDOWS_WIDTH = WINDOWS_WIDTH;
global.WINDOWS_HEIGHT = WINDOWS_HEIGHT;

global.reloadGStyle = ()=>{
	global.GStyle = createStyle();
}

const createStyle = ()=>{
	return StyleSheet.create({
		//border样式用于调试页面，请勿在正式页面使用
		border: {
			borderColor: "red",
			borderWidth: 1,
		},
		fullScreen: {
	    	position: 'absolute',
	        top: 0,
	        bottom: 0,
	        left: 0,
	        right: 0
		},
		headerText: {
			color: Colors.header
		},
		header: {
			//backgroundColor: Colors.under,
			backgroundColor: Colors.bgPrimary,
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderTopWidth: 0,
			borderLeftWidth: 0,
			borderRightWidth: 0,
			borderColor: Colors.dark,
			//elevation: 1,
			paddingBottom: 10,
			paddingTop: (isIos ? IOS_HEADER_HEIGHT : ADNROID_HEADER_HEIGHT) + 10,
			paddingLeft: 15,
			paddingRight: 15,
			flexDirection: 'row',
			justifyContent: "space-between",
			alignItems: 'center',
		},
		container: {
			flex: 1,
	        alignItems: 'stretch',
	        backgroundColor: Colors.under
		},
		containerSub: {
			flex: 1,
	        alignItems: 'stretch',
	        backgroundColor: Colors.darkXXX
		},
		gap: {
			height: 15,
	        backgroundColor: Colors.under
		},
		gapSub: {
			height: 15,
	        backgroundColor: Colors.darkXXX
		},
		headSpace: {
			paddingTop: isIos ? IOS_HEADER_HEIGHT : ADNROID_HEADER_HEIGHT
		},
		card: {
			borderRadius: 5,
			paddingTop: 10,
			paddingBottom: 10,
			paddingLeft: 15,
			paddingRight: 15
		},
		input: {
			color: Colors.fore,
			borderColor: Colors.light,
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderTopWidth: 0,
			borderLeftWidth: 0,
			borderRightWidth: 0,
			padding: 2
		},
		inputNoBorder: {
			color: Colors.fore,
			padding: 2
		},
		inputRadius: {
			backgroundColor: Colors.darkXXX,
			margin: 0,
			paddingTop: 3,
			paddingBottom: 3,
			paddingLeft: 15,
			paddingRight: 15,
			borderRadius: 20
		},
		inputTransp: {
			margin: 0,
			paddingTop: 3,
			paddingBottom: 3,
			paddingLeft: 15,
			paddingRight: 15,
		},
		loading: {
			alignItems: 'center', 
			position: 'absolute', 
			backgroundColor: Colors.middle, 
			right:0, left: 0, bottom: 0, top: 0,
	    	justifyContent: 'center'
		},
		menu: {
			backgroundColor: Colors.dark,
			/*borderTopWidth: StyleSheet.hairlineWidth, 
			borderBottomWidth: StyleSheet.hairlineWidth, 
			borderColor: Colors.light,*/
			paddingTop: 10,
			paddingBottom: 10,
			paddingLeft: 15,
			paddingRight: 15,
		},
		dot: {
			position:'absolute',
			top:-4,
			right:-4,
			padding:5,
			backgroundColor: Colors.bgError, 
			borderRadius:5
		},
		dotw: {
			position:'absolute',
			top:-4,
			right:-4,
			paddingHorizontal:6,
			paddingVertical: 2,
			backgroundColor: Colors.bgError, 
			borderRadius:12
		},
		new: {
			position:'absolute',
			top: -15,
			right: -28,
			paddingLeft: 20,
			paddingRight: 20,
			paddingTop: 20,
			backgroundColor: Colors.bgWarning, 
			transform: [{rotate: '45deg'}]
		},
		hr: {
			borderBottomWidth: StyleSheet.hairlineWidth, 
			borderTopWidth: 0, 
			borderLeftWidth: 0, 
			borderRightWidth: 0, 
			borderColor: Colors.darkX
		},

		bdNone: {borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0},

		bdGL: {borderWidth: StyleSheet.hairlineWidth, borderTopLeftRadius: 5, borderBottomLeftRadius: 5},
		bdGr: {borderWidth: StyleSheet.hairlineWidth, borderTopRightRadius: 5, borderBottomRightRadius: 5},
		bdGc: {borderWidth: StyleSheet.hairlineWidth, borderRadius: 0},

		bdt: {borderWidth:0, borderTopWidth: 1},
		bdb: {borderWidth:0, borderBottomWidth: 1},
		bdl: {borderWidth:0, borderLeftWidth: 1},
		bdr: {borderWidth:0, borderRightWidth: 1},
		bdv: {borderWidth:0, borderTopWidth: 1, borderBottomWidth: 1},
		bdh: {borderWidth:0, borderLeftWidth: 1, borderRightWidth: 1},

		bdtHair: {borderWidth:0, borderTopWidth: StyleSheet.hairlineWidth},
		bdbHair: {borderWidth:0, borderBottomWidth: StyleSheet.hairlineWidth},
		bdlHair: {borderWidth:0, borderLeftWidth: StyleSheet.hairlineWidth},
		bdrHair: {borderWidth:0, borderRightWidth: StyleSheet.hairlineWidth},
		bdvHair: {borderWidth:0, borderTopWidth: StyleSheet.hairlineWidth, borderBottomWidth: StyleSheet.hairlineWidth},
		bdhHair: {borderWidth:0, borderLeftWidth: StyleSheet.hairlineWidth, borderRightWidth: StyleSheet.hairlineWidth},

		bdHair: {borderWidth: StyleSheet.hairlineWidth},

		bdFore: {borderWidth: 1, borderColor: Colors.fore},
		bdLightXX: {borderWidth: 1, borderColor: Colors.lightXX},
		bdLightX: {borderWidth: 1, borderColor: Colors.lightX},
		bdLight: {borderWidth: 1, borderColor: Colors.light},
		bdMiddle: {borderWidth: 1, borderColor: Colors.middle},
		bdDark: {borderWidth: 1, borderColor: Colors.dark},
		bdDarkX: {borderWidth: 1, borderColor: Colors.darkX},
		bdDarkXX: {borderWidth: 1, borderColor: Colors.darkXX},
		bdDarkXXX: {borderWidth: 1, borderColor: Colors.darkXXX},

		bdPrimary: {borderWidth: 1, borderColor: Colors.bgPrimary},
		bdSuccess: {borderWidth: 1, borderColor: Colors.bgSuccess},
		bdWarning: {borderWidth: 1, borderColor: Colors.bgWarning},
		bdInfo: {borderWidth: 1, borderColor: Colors.bgInfo},
		bdError: {borderWidth: 1, borderColor: Colors.bgError},

		imageRound:{ width: 30, height: 30,borderRadius:15},
		bdRadius: {borderRadius: 5},

		textBold: {fontWeight: 'bold'},
		textCenter: {textAlign: 'center'},
		textRight: {textAlign: 'right'},

		textXs: {fontSize: 10},
		textSm: {fontSize: 12},
		textMd: {fontSize: 14},
		textLg: {fontSize: 16},
		textXl: {fontSize: 18},
		textXxl: {fontSize: 20},
		textXxxl: {fontSize: 22},

		textFore: {color: Colors.fore},
		textLightX: {color: Colors.lightX},
		textLight: {color: Colors.light},
		textMiddle: {color: Colors.middle},
		textDark: {color: Colors.dark},
		textDarkX: {color: Colors.darkX},
		textDarkXX: {color: Colors.darkXX},
		textDarkXXX: {color: Colors.darkXXX},
		textDarkMax: {color: Colors.darkMax},
		textUnder: {color: Colors.under},

		textPrimary: {color: Colors.bgPrimary},
		textSuccess: { color: Colors.bgSuccess},
		textWarning: {color: Colors.bgWarning},
		textInfo: {color: Colors.bgInfo},
		textError: {color: Colors.bgError},

		textWhite: {color: Colors.white},
		textBlack: {color: Colors.black},

		bgNone: {backgroundColor: '#fff0'},
		bgUnder: {backgroundColor: Colors.under},
		bgFore: {backgroundColor: Colors.fore},
		bgLightX: {backgroundColor: Colors.lightX},
		bgLight: {backgroundColor: Colors.light},
		bgMiddle: {backgroundColor: Colors.middle},
		bgDark: {backgroundColor: Colors.dark},
		bgDarkX: {backgroundColor: Colors.darkX},
		bgDarkXX: {backgroundColor: Colors.darkXX},
		bgDarkXXX: {backgroundColor: Colors.darkXXX},
		bgDarkMax: {backgroundColor: Colors.darkMax},

		bgPrimary: {backgroundColor: Colors.bgPrimary},
		bgSuccess: { backgroundColor: Colors.bgSuccess},
		bgWarning: {backgroundColor: Colors.bgWarning},
		bgInfo: {backgroundColor: Colors.bgInfo},
		bgError: {backgroundColor: Colors.bgError},
		
		bgWhite: {backgroundColor: Colors.white},
		bgBlack: {backgroundColor: Colors.black},

		bgTransp:{backgroundColor: Colors.transp},

		flex0: {flex: 0},
		flex1: {flex: 0.083},
		flex2: {flex: 0.166},
		flex3: {flex: 0.25},
		flex4: {flex: 0.333},
		flex5: {flex: 0.416},
		flex6: {flex: 0.5},
		flex7: {flex: 0.583},
		flex8: {flex: 0.666},
		flex9: {flex: 0.75},
		flex10: {flex: 0.833},
		flex11: {flex: 0.916},
		flex12: {flex: 1},

		mgBar: {marginTop: isIos ? IOS_HEADER_HEIGHT : ADNROID_HEADER_HEIGHT},
		mg0: {margin: 0}, mg5: {margin: 5}, mg10: {margin: 10}, mg15: {margin: 15}, mg20: {margin: 20}, mg25: {margin: 25},
		mgt0: {marginTop: 0}, mgt5: {marginTop: 5}, mgt10: {marginTop: 10}, mgt15: {marginTop: 15}, mgt20: {marginTop: 20}, mgt25: {marginTop: 25},  
		mgb0: {marginBottom: 0}, mgb5: {marginBottom: 5}, mgb10: {marginBottom: 10}, mgb15: {marginBottom: 15}, mgb20: {marginBottom: 20}, mgb25: {marginBottom: 25},  
		mgl0: {marginLeft: 0}, mgl5: {marginLeft: 5}, mgl10: {marginLeft: 10}, mgl15: {marginLeft: 15}, mgl20: {marginLeft: 20}, mgl25: {marginLeft: 25},  
		mgr0: {marginRight: 0}, mgr5: {marginRight: 5}, mgr10: {marginRight: 10}, mgr15: {marginRight: 15}, mgr20: {marginRight: 20}, mgr25: {marginRight: 25}, 
		mgh0: {marginHorizontal: 0}, mgh5: {marginHorizontal: 5}, mgh10: {marginHorizontal: 10}, mgh15: {marginHorizontal: 15}, mgh20: {marginHorizontal: 20}, mgh25: {marginHorizontal: 25},  
		mgv0: {marginVertical: 0}, mgv5: {marginVertical: 5}, mgv10: {marginVertical: 10}, mgv15: {marginVertical: 15}, mgv20: {marginVertical: 20}, mgv25: {marginVertical: 25},  

		pdBar: {paddingTop: isIos ? IOS_HEADER_HEIGHT : ADNROID_HEADER_HEIGHT},
		pd0: {padding: 0}, pd5: {padding: 5}, pd10: {padding: 10}, pd15: {padding: 15}, pd20: {padding: 20}, pd25: {padding: 25},  
		pdt5: {paddingTop: 5}, pdt10: {paddingTop: 10}, pdt15: {paddingTop: 15}, pdt20: {paddingTop: 20}, pdt25: {paddingTop: 25},  
		pdb5: {paddingBottom: 5}, pdb10: {paddingBottom: 10}, pdb15: {paddingBottom: 15}, pdb20: {paddingBottom: 20}, pdb25: {paddingBottom: 25},  
		pdl5: {paddingLeft: 5}, pdl10: {paddingLeft: 10}, pdl15: {paddingLeft: 15}, pdl20: {paddingLeft: 20}, pdl25: {paddingLeft: 25},  
		pdr5: {paddingRight: 5}, pdr10: {paddingRight: 10}, pdr15: {paddingRight: 15}, pdr20: {paddingRight: 20}, pdr25: {paddingRight: 25}, 
		pdh5: {paddingHorizontal: 5}, pdh10: {paddingHorizontal: 10}, pdh15: {paddingHorizontal: 15}, pdh20: {paddingHorizontal: 20}, pdh25: {paddingHorizontal: 25}, 
		pdv5: {paddingVertical: 5}, pdv10: {paddingVertical: 10}, pdv15: {paddingVertical: 15}, pdv20: {paddingVertical: 20}, pdv25: {paddingVertical: 25}, 

		center: {alignSelf: 'center'},
		rowCenter: {justifyContent: 'center'},
		right: {alignSelf: 'flex-end'},
		left: {alignSelf: 'flex-start'},

		wrap: {flexDirection: 'row', flexWrap: 'wrap'},
		row: {flexDirection: 'row'},
		col: {flexDirection: 'column'},
		rowReverse: {flexDirection: 'row-reverse'},
		colReverse: {flexDirection: 'column-reverse'},

		posRowBetween: {flexDirection: 'row', justifyContent: 'space-between'},
		posColBetween: {flexDirection: 'column', justifyContent: 'space-between'},
		posRowAround: {flexDirection: 'row', justifyContent: 'space-around'},
		posColAround: {flexDirection: 'column', justifyContent: 'space-around'},
		posBottom: {flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'},

		posRC: {alignItems: 'flex-end', justifyContent: 'center'},
		posRT: {alignItems: 'flex-end', justifyContent: 'flex-start'},
		posRB: {alignItems: 'flex-end', justifyContent: 'flex-end'},
		posLC: {alignItems: 'flex-start', justifyContent: 'center'},
		posLT: {alignItems: 'flex-start', justifyContent: 'flex-start'},
		posLB: {alignItems: 'flex-start', justifyContent: 'flex-end'},
		posCC: {alignItems: 'center', justifyContent: 'center'},
		posCT: {alignItems: 'center', justifyContent: 'flex-start'},
		posCB: {alignItems: 'center', justifyContent: 'flex-end'},

		warmBox:{backgroundColor:'#FCF0EE',borderWidth: 1, borderColor: '#f6d2ca'},

		popMenuIcon: {width: 18,  height: 18}
	});	
}
global.GStyle = createStyle();