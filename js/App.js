import "./config";
import "./utils/Realm";

import DeviceUtil from './utils/DeviceUtil'

//global一定要在Realm后面引入，否则atob对象会导致Realm会误判当前环境为chrom环境，最终导致Realm报错：
//undefined is not an object (evaluating '_NativeModules$Realm.debugHosts')
import './global'

import "./style/Colors";
import "./style/Styles";
import "./utils/Dateformat";
import "./utils/PinyinUtil";
//import "./utils/Storage";
import "./utils/Http";
import "./i18n/i18n";

import "./Initialize";

import crypto from 'crypto';

import Setting from './utils/Setting';

import './hoc/PageWrap';

import VerCtrl from './utils/VersionCtrl';

import React from 'react';
import { createStackNavigator } from 'react-navigation';

import WelcomeScreen from "./screen/welcome/WelcomeScreen";

import WebViewPage from "./screen/common/WebViewPage";
import ScanQRCodeScreen from "./screen/common/ScanQRCodeScreen";

import DemoScreen from "./screen/demo/DemoScreen";
import DemoScreen2 from "./screen/demo/DemoScreen2";
import DemoScreen3 from "./screen/demo/DemoScreen3";
import DemoScreen4 from "./screen/demo/DemoScreen4";

import Index from "./screen/index/Index"
import AccountDetail from "./screen/index/AccountDetail"
import Miner from "./screen/miner/Miner"
import MineDetail from "./screen/miner/MineDetail"
import BindMine from "./screen/miner/BindMine"
import Unbundling from "./screen/miner/Unbundling"
import Profile from "./screen/profile/Profile"


const App = createStackNavigator(
    {
        Welcome: {screen: WelcomeScreen,navigationOptions: {header:null}},
        Web: {screen: WebViewPage,navigationOptions: {header:null}},
        //HotUpdate: {screen: HotUpdateScreen,navigationOptions: {header:null}},
        Scan: {screen: ScanQRCodeScreen},

        Demo: {screen: DemoScreen,navigationOptions: {header:null}},
        Demo2: {screen: DemoScreen2,navigationOptions: {header:null}},
        Demo3: {screen: DemoScreen3,navigationOptions: {header:null}},
        Demo4: {screen: DemoScreen4,navigationOptions: {header:null}},

        Index: {screen: Index,navigationOptions: {header:null}},
        AccountDetail: {screen: AccountDetail,navigationOptions: {header:null}},
        Miner: {screen: Miner,navigationOptions: {header:null}},
        MineDetail: {screen: MineDetail,navigationOptions: {header:null}},
        BindMine: {screen: BindMine,navigationOptions: {header:null}},
        Unbundling: {screen: Unbundling,navigationOptions: {header:null}},
        Profile: {screen: Profile,navigationOptions: {header:null}},

    },
    {
        //initialRouteName: isFirstUse() ? 'Welcome' : 'Tabs',
        //initialRouteName: 'HotUpdate',
        //initialRouteName: "CreateWallet",//'BackupMnemonic', //'CreateWalletSuccess',//'CreateWallet', 'CreateWalletSuccess'
        initialRouteName: 'Index',
    }
);

function isFirstUse(){
    let res = Setting.get('is_first_use') != 'true';
    Setting.set('is_first_use', 'true')
    return res;
}

function usageLog(){
    let deviceInfo = DeviceUtil.getDeviceInfo();
    deviceInfo.action = 'login';
    Http.usageLog(JSON.stringify(deviceInfo));
}

//usageLog();

//VerCtrl.checkHotUpdate();
//VerCtrl.checkApkUpdate();

export default App;
