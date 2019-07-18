import React from 'react';
import {
    Image,
    Text,
    View,
    Alert,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Platform,
    BackHandler,
    ToastAndroid,
    StyleSheet
} from "react-native";

import SplashScreen from  'react-native-splash-screen';
import Loading from "../../components/Loading";
import ProgressBar from "../../components/ProgressBar";
import Setting from '../../utils/Setting'
import Icon from 'react-native-vector-icons/Ionicons';


import _ from 'lodash';

const instructions = Platform.select({
  ios: '这是台IOS设备',
  android: '这是台Android设备',
});

class DemoScreen extends React.Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            progress: 50
        }

        this._title = "标题";
        this._backNav = "Demo2";
        this._menu = true;
    }
    
    _icon = ()=>{
        return (
            <TouchableOpacity onPress={this._iconClick}>
                <Icon name='md-add' size={25} color={Colors.white}/>
            </TouchableOpacity>
        )
    }

    _iconClick = ()=>{
        this._alert();
    }


    componentDidMount(){
        this._progress();
    }

    _goPage = () => {
        this.__toMenu('Demo4', {test: '带点参数过去 ' + _.uniqueId()});
    }
    _openWeb = (url) => {
        //this.navigation.navigate('Web', {url : Config.sinocProtocolAddress, title: "使用协议"});
        this.__toMenu('Web', {url : url, title: "百度"});
    }
    _showLoading = () => {
        this.Loading();
        setTimeout(()=>{
            this.Unloading();
        });
    }
    _alert = () => {
        Alert.alert('标题', '这里是内容，可以设置为null \n可以换行', [{
            text: '确定',
            onPress: ()=>{
                //这里可以做点什么
            }
        }, {text: '取消'}]);
    }

    _progress = ()=> {
        let val = this.state.progress + 3;
        if(val > 100){
            val = 0;
        }
        this.setState({
            progress: val
        });
        setTimeout(this._progress, 1000);
    }
    _setTheme = () => {
        let curr = Setting.get('theme');
        console.log('curr theme ======= ' + curr);
        curr = curr == 'WHITE' ? 'BLACK' : 'WHITE';
        Theme.set(curr);
        console.log('set theme to ======= ' + Setting.get('theme'));
        console.log(Colors);
        console.log(StyleSheet.flatten(GStyle.bgUnder));
    }
    
    render(){
        return (
            <View style={ [GStyle.container, GStyle.pd10] }>
                <Text style={ [GStyle.textLight, GStyle.textBold, GStyle.center] }>
                    {instructions}
                </Text>

                <ScrollView style={[GStyle.flex12]}>
                    <View style={[GStyle.posRowAround, GStyle.mgt10]}>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Text style={ [GStyle.textLight] }>国际化：{I18n.t('test')}</Text>
                        </TouchableOpacity>

                        <View style={[GStyle.posRowBetween]}>
                            <TouchableOpacity activeOpacity={0.5} onPress={()=>{I18n.locale='zh'}} style={GStyle.mgr10}>
                                <Text style={ [GStyle.textLight] }>zh</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.5} onPress={()=>{I18n.locale='en'}}>
                                <Text style={ [GStyle.textLight] }>EN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[GStyle.posRowAround, GStyle.mgt10]}>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Text style={ [GStyle.textLight] } onPress={this._goPage}>点我跳转页面</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.5}>
                            <Text style={ [GStyle.textLight] } onPress={()=>{this._openWeb("https://www.baidu.com")}}>点我打开web</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[GStyle.posRowAround, GStyle.mgt10]}>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Text style={ [GStyle.textLight] } onPress={this._showLoading}>点我显示Loading</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Text style={ [GStyle.textLight] } onPress={this._alert}>点我弹窗</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[GStyle.posRowAround, GStyle.mgt10]}>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Text style={ [GStyle.textLight] } onPress={this._setTheme}>点我切换主题 {Setting.get('theme')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Text style={ [GStyle.textLight] } onPress={()=>this.Toast("我是Toast")}>点我Toast</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[GStyle.hr, GStyle.mgv10]}></View>
                    <ProgressBar
                        progress={this.state.progress}
                        valueStyle='balloon=='
                    />

                    <View style={[GStyle.hr, GStyle.mgv10]}></View>
                    <View style={[GStyle.posRowBetween]}>
                        <View>
                            <Text style={[GStyle.textSm]}>字体</Text>
                            <Text style={[GStyle.textMd]}>字体 (default)</Text>
                            <Text style={[GStyle.textLg]}>字体</Text>
                            <Text style={[GStyle.textXl]}>字体</Text>
                            <Text style={[GStyle.textXxl]}>字体</Text>
                            <Text style={[GStyle.textXxxl]}>字体</Text>
                        </View>
                        <View>
                            <Text style={[GStyle.textDarkX]}>颜色</Text>
                            <Text style={[GStyle.textDark]}>颜色</Text>
                            <Text style={[GStyle.textMiddle]}>颜色</Text>
                            <Text style={[GStyle.textLight]}>颜色</Text>
                            <Text style={[GStyle.textLightX]}>颜色</Text>
                            <Text style={[GStyle.textFore]}>颜色</Text>
                            <Text style={[GStyle.textPrimary]}>颜色</Text>
                            <Text style={[GStyle.textSuccess]}>颜色</Text>
                            <Text style={[GStyle.textInfo]}>颜色</Text>
                            <Text style={[GStyle.textWarning]}>颜色</Text>
                            <Text style={[GStyle.textError]}>颜色</Text>
                        </View>
                        <View>
                            <Text style={[GStyle.bgDarkX, GStyle.textUnder]}>背景</Text>
                            <Text style={[GStyle.bgDark, GStyle.textUnder]}>背景</Text>
                            <Text style={[GStyle.bgMiddle, GStyle.textUnder]}>背景</Text>
                            <Text style={[GStyle.bgLight, GStyle.textUnder]}>背景</Text>
                            <Text style={[GStyle.bgLightX, GStyle.textUnder]}>背景</Text>
                            <Text style={[GStyle.bgFore, GStyle.textUnder]}>背景</Text>
                            <Text style={[GStyle.bgPrimary, GStyle.textUnder]}>背景</Text>
                            <Text style={[GStyle.bgSuccess, GStyle.textUnder]}>背景</Text>
                            <Text style={[GStyle.bgInfo, GStyle.textUnder]}>背景</Text>
                            <Text style={[GStyle.bgWarning, GStyle.textUnder]}>背景</Text>
                            <Text style={[GStyle.bgError, GStyle.textUnder]}>背景</Text>
                        </View>
                        <View style={GStyle.posRowBetween}>
                            <View style={GStyle.mgr5}>
                                <Text style={[GStyle.bdDarkX, GStyle.pdh5, GStyle.mgb5]}>边框</Text>
                                <Text style={[GStyle.bdDark, GStyle.pdh5, GStyle.mgb5]}>边框</Text>
                                <Text style={[GStyle.bdMiddle, GStyle.pdh5, GStyle.mgb5]}>边框</Text>
                                <Text style={[GStyle.bdLight, GStyle.pdh5, GStyle.mgb5]}>边框</Text>
                                <Text style={[GStyle.bdLightX, GStyle.pdh5, GStyle.mgb5]}>边框</Text>
                                <Text style={[GStyle.bdFore, GStyle.pdh5, GStyle.mgb5]}>边框</Text>
                            </View>
                            <View>
                                <Text style={[GStyle.bdPrimary, GStyle.pdh5, GStyle.mgb5]}>边框</Text>
                                <Text style={[GStyle.bdSuccess, GStyle.pdh5, GStyle.mgb5]}>边框</Text>
                                <Text style={[GStyle.bdInfo, GStyle.pdh5, GStyle.mgb5]}>边框</Text>
                                <Text style={[GStyle.bdWarning, GStyle.pdh5, GStyle.mgb5]}>边框</Text>
                                <Text style={[GStyle.bdError, GStyle.pdh5, GStyle.mgb5]}>边框</Text>

                                <Text style={[GStyle.bdHair, GStyle.pdh5, GStyle.mgb5]}>细边</Text>
                                <Text style={[GStyle.bdRadius, GStyle.bdHair, GStyle.pdh5, GStyle.mgb5]}>圆角</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[GStyle.hr, GStyle.mgv10]}></View>
                    <Text>网格</Text>
                    <View style={[GStyle.row, GStyle.mgt5]}>
                        <View style={[GStyle.flex12, GStyle.bdHair]}>
                            <Text style={[GStyle.center]}>12</Text>
                        </View>
                    </View>
                    <View style={[GStyle.row, GStyle.mgt5]}>
                        <View style={[GStyle.flex6, GStyle.bdHair]}>
                            <Text style={[GStyle.center]}>6</Text>
                        </View>
                        <View style={[GStyle.flex6, GStyle.bdHair]}>
                            <Text style={[GStyle.center]}>6</Text>
                        </View>
                    </View>
                    <View style={[GStyle.row, GStyle.mgt5]}>
                        <View style={[GStyle.flex4, GStyle.bdHair]}>
                            <Text style={[GStyle.center]}>4</Text>
                        </View>
                        <View style={[GStyle.flex8, GStyle.bdHair]}>
                            <Text style={[GStyle.center]}>8</Text>
                        </View>
                    </View>
                    <View style={[GStyle.row, GStyle.mgt5]}>
                        <View style={[GStyle.flex4, GStyle.bdHair]}>
                            <Text style={[GStyle.center]}>4</Text>
                        </View>
                        <View style={[GStyle.flex4, GStyle.bdHair]}>
                            <Text style={[GStyle.center]}>4</Text>
                        </View>
                        <View style={[GStyle.flex2, GStyle.bdHair]}>
                            <Text style={[GStyle.center]}>2</Text>
                        </View>
                        <View style={[GStyle.flex2, GStyle.bdHair]}>
                            <Text style={[GStyle.center]}>2</Text>
                        </View>
                    </View>
                    <View style={[GStyle.row, GStyle.mgt5]}>
                        <View style={[GStyle.flex3, GStyle.bdHair]}>
                            <Text style={[GStyle.center]}>3</Text>
                        </View>
                        <View style={[GStyle.flex3, GStyle.bdHair]}>
                            <Text style={[GStyle.center]}>3</Text>
                        </View>
                        <View style={[GStyle.flex6, GStyle.bdHair]}>
                            <Text style={[GStyle.center]}>6</Text>
                        </View>
                    </View>

                    <View style={[GStyle.hr, GStyle.mgv10]}></View>
                    <Text>Flex布局</Text>
                    <View style={[GStyle.posRowBetween, GStyle.mgt10, GStyle.pd5, GStyle.border]}>
                        <Text style={[GStyle.bdHair, GStyle.pdh5]}>Between</Text>
                        <Text style={[GStyle.bdHair, GStyle.pdh5]}>Between</Text>
                        <Text style={[GStyle.bdHair, GStyle.pdh5]}>Between</Text>
                        <Text style={[GStyle.bdHair, GStyle.pdh5]}>Between</Text>
                    </View>
                    <View style={[GStyle.posRowAround, GStyle.mgt10, GStyle.pd5, GStyle.border]}>
                        <Text style={[GStyle.bdHair, GStyle.pdh5]}>Around</Text>
                        <Text style={[GStyle.bdHair, GStyle.pdh5]}>Around</Text>
                        <Text style={[GStyle.bdHair, GStyle.pdh5]}>Around</Text>
                        <Text style={[GStyle.bdHair, GStyle.pdh5]}>Around</Text>
                    </View>
                    <View style={[GStyle.posRowBetween, GStyle.mgt10, GStyle.border]}>
                        <Text style={[GStyle.bdHair, GStyle.pdh5, {height: 40}]}>默认</Text>
                        <Text style={[GStyle.bdHair, GStyle.pdh5, GStyle.left]}>上</Text>
                        <Text style={[GStyle.bdHair, GStyle.pdh5, GStyle.center]}>中</Text>
                        <Text style={[GStyle.bdHair, GStyle.pdh5, GStyle.right]}>下</Text>
                    </View>
                    <View style={[GStyle.posRowAround, GStyle.mgt10, GStyle.border, {height: 40}]}>
                        <Text style={[GStyle.bdHair, GStyle.pdh5]}>默认</Text>
                        <Text style={[GStyle.bdHair, GStyle.pdh5, GStyle.left]}>上</Text>
                        <Text style={[GStyle.bdHair, GStyle.pdh5, GStyle.center]}>中</Text>
                        <Text style={[GStyle.bdHair, GStyle.pdh5, GStyle.right]}>下</Text>
                    </View>
                    <View style={[GStyle.mgt5, GStyle.posRowAround]}>
                        <View style={[GStyle.posLT, GStyle.border, {width: 60, height:60}]}>
                            <Text>LT</Text>
                        </View>
                        <View style={[GStyle.posCT, GStyle.border, {width: 60, height:60}]}>
                            <Text>CT</Text>
                        </View>
                        <View style={[GStyle.posRT, GStyle.border, {width: 60, height:60}]}>
                            <Text>RT</Text>
                        </View>
                    </View>
                    <View style={[GStyle.mgt5, GStyle.posRowAround]}>
                        <View style={[GStyle.posLC, GStyle.border, {width: 60, height:60}]}>
                            <Text>LC</Text>
                        </View>
                        <View style={[GStyle.posCC, GStyle.border, {width: 60, height:60}]}>
                            <Text>CC</Text>
                        </View>
                        <View style={[GStyle.posRC, GStyle.border, {width: 60, height:60}]}>
                            <Text>RC</Text>
                        </View>
                    </View>
                    <View style={[GStyle.mgt5, GStyle.posRowAround]}>
                        <View style={[GStyle.posLB, GStyle.border, {width: 60, height:60}]}>
                            <Text>LB</Text>
                        </View>
                        <View style={[GStyle.posCB, GStyle.border, {width: 60, height:60}]}>
                            <Text>CB</Text>
                        </View>
                        <View style={[GStyle.posRB, GStyle.border, {width: 60, height:60}]}>
                            <Text>RB</Text>
                        </View>
                    </View>
                    <View style={[GStyle.row, GStyle.mgt10]}>
                        <View style={[GStyle.posColBetween, GStyle.border, {width: 60, height:150}]}>
                            <Text style={[GStyle.bdHair, GStyle.pdh5]}>默认</Text>
                            <Text style={[GStyle.left, GStyle.bdHair, GStyle.pdh5]}>左</Text>
                            <Text style={[GStyle.center, GStyle.bdHair, GStyle.pdh5, GStyle.mgt5]}>中</Text>
                            <Text style={[GStyle.right, GStyle.bdHair, GStyle.pdh5, GStyle.mgt5]}>右</Text>
                        </View>
                        <View style={[GStyle.posColAround, GStyle.mgl10, GStyle.border, {width: 60}]}>
                            <Text style={[GStyle.bdHair, GStyle.pdh5]}>默认</Text>
                            <Text style={[GStyle.left, GStyle.bdHair, GStyle.pdh5]}>左</Text>
                            <Text style={[GStyle.center, GStyle.bdHair, GStyle.pdh5, GStyle.mgt5]}>中</Text>
                            <Text style={[GStyle.right, GStyle.bdHair, GStyle.pdh5, GStyle.mgt5]}>右</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
     }
}
export default PageWrap(DemoScreen)
