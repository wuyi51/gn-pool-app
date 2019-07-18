import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Platform,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from 'react-native';

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

import SplashScreen from  'react-native-splash-screen';

import _updateConfig from '../../../update.json';
const {appKey} = _updateConfig[Platform.OS];

export default class HotUpdate extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      updateStatus: '',  // checking, download, success, fail
      processInfo: "",
    };
  }
  componentDidMount(){
    SplashScreen.hide();
    this._checkUpdate();
  }
  componentWillMount(){
    if (isFirstTime) {
      markSuccess();
      /*Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [
        {text: '是', onPress: ()=>{throw new Error('模拟启动失败,请重启应用')}},
        {text: '否', onPress: ()=>{markSuccess()}},
      ]);*/
    } else if (isRolledBack) {
      /*Alert.alert('提示', '更新失败,版本已回滚.');*/
    }
  }
  _start = () => {
    this.props.navigation.replace("AssetHomePage");
  }
  _setProcessInfo = (info) => {
    this.setState({
      processInfo: info || ""
    });
  }

  _doUpdate = info => {
    this._setProcessInfo("正在更新版本...");
    downloadUpdate(info).then(hash => {
      switchVersion(hash);
    }).catch(err => { 
      /*Alert.alert('提示', '更新失败.');*/
      this._start();
    });
  };
  _checkUpdate = () => {
    this._setProcessInfo("正在检查版本信息...");
    checkUpdate(appKey).then(info => {
      console.log("check upload info:", info);
      if (info.expired) {
        /*this._setProcessInfo();
        Alert.alert('提示', '您的应用有新版本,请前往应用商店下载新的版本', [
          {
            text: '确定', 
            onPress: ()=>{
              info.downloadUrl && Linking.openURL(info.downloadUrl);
             // this._start();
            }
          },
        ]);*/
      } else if (info.upToDate) {
        this._setProcessInfo("当前已经是最新版本");
        this._start();
        /*Alert.alert('提示', '您的应用版本已是最新.');*/
      } else {
        this._doUpdate(info);
        /*Alert.alert('提示', '检查到新的版本'+info.name+',是否下载?\n'+ info.description, [
          {text: '是', onPress: ()=>{this.doUpdate(info)}},
          {text: '否',},
        ]);*/
      }
    }).catch(err => { 
      /*Alert.alert('提示', '更新失败.');*/
      //this._setProcessInfo("获取版本信息失败");
      this._start();
    });
  };
  render() {
    return (
      <View style={GStyle.flex12}>
        <ImageBackground
          style={ [GStyle.fullScreen, GStyle.flex12, {alignItems: 'center'}] }
          imageStyle={{width: WINDOWS_WIDTH, height: WINDOWS_HEIGHT}}
          source={require('../../../res/image/bg.png')} >
          
            <Text style={ [{marginTop: WINDOWS_HEIGHT * 0.25}, GStyle.textCenter, GStyle.textFore, GStyle.textXxl, GStyle.flex0] }>Alpha Demo</Text>
            <View style={[GStyle.flex12, GStyle.posCB, GStyle.mgb25, GStyle.pdb25]}>
              <Text style={[GStyle.textFore, GStyle.textCenter, GStyle.mgb10]}>
                {this.state.processInfo}
              </Text>
              <Text style={[GStyle.textFore, GStyle.textCenter]}>
                当前版本: {packageVersion}
              </Text>
              <Text style={[GStyle.textFore, GStyle.textSm, GStyle.textCenter, GStyle.mgt5]}>
                {currentVersion ? "hash: " + currentVersion : ""}
              </Text>
            </View>
        </ImageBackground>
      </View>
    )
  }
}