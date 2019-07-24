import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    BackHandler,
    Modal,
    StyleSheet,
    Animated,
    Easing,
    Image,
    RefreshControl,
    ScrollView,
    DeviceEventEmitter,
    Alert,
    StatusBar,
    UIManager,
    findNodeHandle,
    NativeModules,
    Keyboard
} from "react-native";
//import ReactNative, { UIManager } from 'NativeModules';

import ImagePicker from 'react-native-syan-image-picker';

import _ from 'lodash';

import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';
import SplashScreen from  'react-native-splash-screen';
import Loading from "../components/Loading";
import Setting from '../utils/Setting';
import DataSync from '../utils/DataSync';

import VerCtrl from '../utils/VersionCtrl';

/*
options : {
    title: "这里是prompt的标题"，
    tip: "这里是prompt的描述，会显示在iput的下方",
    isPwd: bool, 是否为密码输入框，默认false
}
submitFun: Function, 确认回调函数，参数为输入值
cancelFun: Function, 取消回调函数，无参
*/
React.Component.prototype.Prompt = function(options, submitFun, cancelFun){
    let opts = options || {};
    this.setState({
        __promptVisible: true,
        __promptIsPwd: opts.isPwd || false,
        __promptTip: opts.tip || "",
        __promptTitle: opts.title || "",
        __promptValue: null
    });
    this.__promptSubmitFun = submitFun;
    this.__promptCancelFun = cancelFun;
}

/**
弹出菜单
options: {
    ref: "目标图标的ref"
}
*/
React.Component.prototype.PopMenu = function(options, view){
    let ref = options.ref;
    if(!ref || !this.refs[ref]){
        return;
    }
    UIManager.measure(findNodeHandle(this.refs[ref]), (x, y, w, h, px, py)=>{
        //console.log(` fx--${x},fy--${y},width--${w},height--${h},px--${px},py--${py}`);
        let top = py + 3,
            right = 10,
            rightC = WINDOWS_WIDTH - px - w / 2 - right - 8;

        this.setState({
            __popMenuVisible: true,
            __popMenuCornerRight: rightC,
            __popMenuTop: top,
            __popMenuRight: right,
            __popMenuView: view
        });
    });
}
React.Component.prototype.PopMenuHide = function(){
    this.setState({
        __popMenuVisible: false
    });
}
//img {uri: xxx} or require('xxx')
React.Component.prototype.ViewImgs = function(imgs){
    if(_.isEmpty(imgs)){
        return;
    }
    this.setState({
        __imageViewVisible: true,
        __imageViewList: imgs
    });
}

/*
content: String, 内容
delay: Float, 延时时间， 单位：秒, 默认1秒
*/
React.Component.prototype.Toast = function(content, delay){
    if(!content){
        return;
    }
    if(!delay || delay<=0){
        delay = 1;
    }
    this.setState({
        __toastVisible: true,
        __toastContent: content,
        __toastOpcity: new Animated.Value(0),
        __toastBottom: new Animated.Value(-20),
        __toastDelay: delay * 1000
    });
    setTimeout(()=>{
        Animated.parallel([
            Animated.timing(this.state.__toastOpcity, {
                toValue: 1,
                easing: Easing.linear,
                duration: 300,
            }),
            Animated.spring(this.state.__toastBottom, {
                toValue: 80,
                easing: Easing.linear,
                duration: 100,
            })
        ]).start((param)=>{
            if(param.finished){
                setTimeout(()=>{
                    this.setState({
                        __toastVisible: false
                    });
                }, delay * 1000);
            }
        });
    }, 50);
}

/*
loadingText: 加载显示文字， 默认为国际化中的loading值 或“Loading...”
*/
React.Component.prototype.Loading = function(loadingText){
    this.setState({
        __loadingText: loadingText || I18n.t("loading") || 'Loading...'
    });
    this.__loading.show();
}
React.Component.prototype.Unloading = function(){
    this.__loading.dismiss();
}

React.Component.prototype.PickHeadImg = function(succFun, errorFun){
    ImagePicker.showImagePicker({
        imageCount: 1,
        isCrop: true,
        showCropCircle: true
    }, (err, photos) => {
        if (err) {
            errorFun && errorFun(err);
            return;
        }
        succFun && succFun(photos[0]);
    })
}
React.Component.prototype.PickImg = function(succFun, errorFun){
    ImagePicker.showImagePicker({
        imageCount: 9,
        isCrop: false,
        showCropCircle: false
    }, (err, photos) => {
        if (err) {
            errorFun && errorFun(err);
            return;
        }
        succFun && succFun(photos);
    })
}

function getKeybordHeight(){
    let height = Setting.get('keyboard_height');
    if(_.isEmpty(height)){
        height = WINDOWS_WIDTH * 0.75;
    } else {
        height = parseInt(height);
    }
    return height;
}

/*
    _title: String
    _titleFun: Fun, 优先级高于_title
    _backNav: String or -1 (-1表示goBack)
    _backLabel: 左侧文字标签
    _backLabelFun: 左侧文字标签, 优先于_backLabel
    _icon: Fun 右侧图标
    _menu: Bool 是否显示菜单
    _keepSplash: Bool 保留遮罩层
*/
global.PageWrap = (WrappedComponent) => class PageWrap extends WrappedComponent {

    constructor(props){
        super(props);
        this.state = this.state || {};
        global._navigation = this.navigation = this.props.navigation;
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.__onBackPress);
        super.componentWillMount && super.componentWillMount();

        /* prompt */
        this.state.__promptVisible = false;
        this.state.__promptValue = null;
        this.state.__promptIsPwd = false;
        this.state.__promptTitle = "";
        this.state.__promptTip = "";

        /* pop-up menu */
        this.state.__popMenuVisible = false;
        this.state.__popMenuCornerRight = 5;
        this.state.__popMenuRight = 10;

        /* view images */
        this.state.__imageViewVisible = false;
        this.state.__imageViewList = [];    //{uri: xxx} or require('xxx')

        /* toast */
        this.state.__toastVisible = false;
        this.state.__toastContent = "";
        this.state.__toastOpcity = new Animated.Value(0);
        this.state.__toastBottom = new Animated.Value(20),
        this.state.__toastDelay = 1500; //ms

        /* loading */
        this.state.__loadingText = "";

        /* news */
        this.state.__newsDataList = [];
        this.state.__newsDataBean = {};
        this.state.__newsVisible = false;
        this.state.unreadCount = Initialize.UnreadCount;
        this.newsIndex = 0;

        /* exit app ctrl */
        this.__lastBackPress = 0;

        /* status bar bg color */
        this.state.__statusBarBgColor = this.__statusBarBgColor || "#8880";

        /* world manage */
        this.state.__world = global.WorldManager;
        this.state.__keybordHeight = getKeybordHeight();

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e)=>{
            let keyboardHeight = parseInt(e.endCoordinates.height);
            Setting.set('keyboard_height', keyboardHeight + "");
            this.setState({
                __keybordHeight: keyboardHeight
            });
            console.log("----------- keybord height: ",keyboardHeight);
        });
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
        BackHandler.removeEventListener('hardwareBackPress', this.__onBackPress);
        super.componentWillUnmount && super.componentWillUnmount();

        this.keyboardDidShowListener && this.keyboardDidShowListener.remove();
    }

    componentWillReceiveProps(){
        this.__countUnreadMsg();
    }

    componentDidMount(){

        this.listener = DeviceEventEmitter.addListener('UnreadCount', (unreadCount) => {
            this.setState({unreadCount});
        });
        !this._keepSplash && SplashScreen.hide();
        this.__loading = this.refs['__loading'];
        super.componentDidMount && super.componentDidMount();
        let _this = this;
        //消息提示
        if(Initialize.newsModelFlag){
            Initialize.newsModelFlag = false;
            Http.getMajor({},function(resp){
                let data = resp.data;
                if(data != null && data.length>0){
                    _this.setState({
                        __newsDataList : data,
                        __newsDataBean : data[_this.newsIndex],
                        __newsVisible : true
                    })
                }
            },function(error){
                //_this.Toast(I18n.t("error_http"));
                //Alert.alert(I18n.t('error_http'), null, [{text: I18n.t('btn_yes')}]);
            })
        }
    }

    __hideSplash = ()=>{
        SplashScreen.hide();
    }

    __countUnreadMsg = ()=>{
        let unread = realm.objects("Message").filtered("read=false").length;
        WorldManager.unreadMsgCount = unread;
        this.setState({
            __world: WorldManager
        });
    }

    __nextNews = () => {
        if(this.state.__newsDataList.length>this.newsIndex+1){
            this.newsIndex = this.newsIndex + 1;

            this.setState({
                __newsDataBean : this.state.__newsDataList[this.newsIndex],
                __newsVisible : true
            })

        }else{
            this.setState({
                __newsDataList : [],
                __newsDataBean : {},
                __newsVisible : false
            })
        }
    }

    /* header & menu ctrl */
    __onBackPress = ()=>{
        this.__back();
        return true;
    }

    __back = ()=>{
        if(this.state.__imageViewVisible){
            this.setState({
                __imageViewVisible: false
            });
            return;
        }
        let navigation = this.props.navigation;
        if(this._backNav == -1){
            navigation.goBack();
        }else if(!_.isEmpty(this._backNav)){
            navigation.navigate(this._backNav,{__i:_.random()});
        }else{
            //再按一次退出功能
            let time = Date.now();
            //console.log(time - this.__lastBackPress);
            if(time - this.__lastBackPress > 1500){
                this.Toast(I18n.t('exit_app_tip'));
                this.__lastBackPress = time;
            }else{
                BackHandler.exitApp();
            }
        }
    }
    __toMenu = (nav, params)=>{
        this.PopMenuHide();
        this.props.navigation.navigate(nav,{__i:_.random(), ...params});
    }

    /* prompt ctrl */
    __promptSubmit = ()=>{
        this.setState({
            __promptVisible: false
        });
        this.__promptSubmitFun && this.__promptSubmitFun(this.state.__promptValue);
    }
    __promptCancel = ()=>{
        this.__promptCancelFun && this.__promptCancelFun();
        this.setState({
            __promptVisible: false
        });
    }

    __ItemSeparatorComponent = () => {
        return (
            <View style={[GStyle.hr, {marginBottom: 1}]}></View>
        );
    }

    __noData = (flatlistHeight) => {
        return (
            <View style={[GStyle.col,GStyle.flex12,GStyle.posColBetween, GStyle.posCC,{height:flatlistHeight}]}>
                {/*<Image
                    style={{width: 80, height: 80, tintColor: Colors.darkX}}
                    source={require('../../res/image/nodata.png')}
                />*/}
                <Text style={[GStyle.textDarkX,GStyle.textLg, GStyle.mgt15]}>{I18n.t("no_data")}</Text>
            </View>
        );
    }
    __checkVer = ()=>{
        VerCtrl.doApkUpdate();
    }

    __cleanChatData = ()=>{
        let chatDbs = ['Message', 'Contacts', 'Group', 'Chat'];
        realm.write(()=>{
            _.forEach(chatDbs, (db)=>{
                let data = realm.objects(db);
                realm.delete(data);
            });
        });
    }
    __scanQrCode = ()=>{
        this.__toMenu("Scan", {
            id: 'qr_code',
            callback: (id, code)=>{
                if(!code){
                    return;
                }
                let arr = code.split(":");
                if(arr.length < 2){
                    return;
                }
                console.log(arr);
                let fun = arr[0].toLowerCase();
                if(fun == 'user'){
                    this.__toMenu("AddContactScreen", { userId: arr[1] })
                } else if(fun == 'group') {
                    this.__toMenu("GroupScreen", { groupId: arr[1] })
                }
            }
        });
    }

    render() {
        let hasHeader = this._title || this._titleFun || this._backNav || this._backLabelFun || this._backLabel || this._icon;
        hasHeader = !this._gostHeader && hasHeader;
        let currScreen = this.props.navigation.state.routeName;
        let hasMenu = this._menu;
        let title = (this._titleFun && this._titleFun()) || this._title;
        let backLabel = (this._backLabelFun && this._backLabelFun()) || this._backLabel;

        //判断news语言
        let language = Setting.get('language');
        let news = {};
        if(!_.isEmpty(this.state.__newsDataBean)){
            news = language == "en" ? this.state.__newsDataBean.en : this.state.__newsDataBean.zh;
        }
        let invalidVer = VerCtrl.invalidVer();

        let tcpStatus = "";
        if(!_.isEmpty(WorldManager.currUser)){
            let status = WorldManager.tcpStatus;
            if(WorldManager.tcpStatus == 'tcp_closed'){
                tcpStatus = I18n.t("tip_tcp_closed");
            } else if(_.includes(['tcp_failed', 'tcp_disconnected'], WorldManager.tcpStatus)){
                tcpStatus = I18n.t("tip_tcp_disconnect");
            }
        }

        let menuIcons = {
            chat: require('../../res/image/menu_chat.png'),
            contact: require('../../res/image/menu_contact.png'),
            discover: require('../../res/image/menu_discover.png'),
            profile: require('../../res/image/menu_profile.png'),
            chat_a: require('../../res/image/menu_chat_a.png'),
            contact_a: require('../../res/image/menu_contact_a.png'),
            discover_a: require('../../res/image/menu_discover_a.png'),
            profile_a: require('../../res/image/menu_profile_a.png'),
            home: require('../../res/image/menu_home.png'),
            home_a: require('../../res/image/menu_home_a.png'),
            miner: require('../../res/image/menu_miner.png'),
            miner_a: require('../../res/image/menu_miner_a.png'),
        };

        return (
            <View style={[{flex:1}, GStyle.bgUnder]}>
                <StatusBar backgroundColor={this.state.__statusBarBgColor} barStyle="dark-content" translucent={true}/>
                {
                hasHeader ?
                <View style={[ GStyle.header]}>
                    <View style={[ title ? GStyle.flex2 : GStyle.flex10, GStyle.row]}>
                    {
                        this._backNav ?
                        <TouchableOpacity style={[styles.backIcon, GStyle.posCC]} onPress={this.__back}>
                            <FAIcon name="angle-left" size={26} color={Colors.fore}></FAIcon>
                        </TouchableOpacity> : null
                    }
                    {
                        backLabel ?
                        <Text style={[GStyle.headerText, GStyle.mgl20]}>{backLabel}</Text> : null
                    }
                    </View>
                    {
                        title ?
                        <View style={[GStyle.flex8]}>
                            <Text style={[GStyle.center, GStyle.headerText, GStyle.textLg, GStyle.textBold]}>{title}</Text>
                        </View> : null
                    }
                    <View style={[GStyle.flex2, GStyle.posRC]}>
                    {
                        this._icon && this._icon()
                    }
                    </View>
                </View> : null
                }
                {
                    tcpStatus ?
                    <TouchableOpacity activeOpacity={0.7}
                        onPress={this.ConnetTcp}
                        style={[ GStyle.bgWarning, GStyle.pdh10, GStyle.pdv5 ]} >
                        <Text style={[ GStyle.textWhite, GStyle.textSm ]}>{tcpStatus}</Text>
                    </TouchableOpacity> : null
                }
                {super.render()}
                {
                    hasMenu ?
                        <View style={[ GStyle.bgWhite, GStyle.posRowAround, GStyle.pdb5, GStyle.bdDarkXX, GStyle.bdtHair]}>
                        {
                            [
                                {nav: 'Index', icon: 'home', name: I18n.t('menu_home')},
                                {nav: 'Miner', icon: 'miner', name: I18n.t('menu_miner')},
                                //{nav: 'DiscoverScreen', icon: 'discover', name: I18n.t('menu_discover')},
                                {nav: 'Demo3', icon: 'profile', name: I18n.t('menu_profile')}
                                //{nav: 'Demo', icon: 'user', name: I18n.t('menu_profile')}
                            ].map((_nav)=>{
                                let color = currScreen == _nav.nav ? Colors.bgPrimary : Colors.light;
                                let icon = currScreen == _nav.nav ? menuIcons[_nav.icon + "_a"] : menuIcons[_nav.icon];
                                let tipCount = this.state.__world.unreadMsgCount;
                                let tipCountLabel = tipCount > 99 ? "99+" : tipCount;
                                return (
                                    <TouchableOpacity style={[ GStyle.posCC,GStyle.pdh5 ]} key={_nav.icon} onPress={()=>{this.__toMenu(_nav.nav)}}>
                                        <View style={[GStyle.mgt10, GStyle.mgh10, GStyle.posCC]}>
                                            <Image source={icon} style={{width: 24, height: 24}}/>
                                            <Text style={[{color: color, marginTop: 3}, GStyle.textXs]}>{_nav.name}</Text>
                                            {
                                                tipCount > 0 && _nav.nav == "ChatListScreen" ?
                                                <View style={[ GStyle.dotw, {right: -10} ]}>
                                                    <Text style={[GStyle.textXs, GStyle.textWhite]}>{tipCountLabel}</Text>
                                                </View>
                                                : null
                                            }
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        </View>
                    : null
                }
                <Modal onRequestClose={()=>{}} transparent={true} visible={this.state.__promptVisible}>
                    <View style={[GStyle.flex12, GStyle.bgTransp, {justifyContent: 'center'}]}>
                        <View style={[GStyle.mg25, GStyle.pd25, GStyle.pdb10, GStyle.bgUnder, GStyle.bdRadius]}>
                            <Text style={[GStyle.textLight]}>{ this.state.__promptTitle }</Text>
                            <TextInput
                                style={[GStyle.input]}
                                defaultValue=""
                                onChangeText={(__promptValue) => this.setState({__promptValue})}
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                                secureTextEntry={this.state.__promptIsPwd}
                                {...this.props.textInputProps}/>
                            <Text style={[GStyle.textMiddle, GStyle.mgt10, GStyle.textSm]}>{ this.state.__promptTip }</Text>
                            <View style={[GStyle.posRowAround, GStyle.mgt10]}>
                                <TouchableOpacity onPress={this.__promptCancel}>
                                    <View style={[GStyle.pdh15, GStyle.pdv5]}>
                                        <Text style={[GStyle.textLight]}>
                                            {I18n.t("btn_no")}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.__promptSubmit}>
                                    <View style={[GStyle.pdh15, GStyle.pdv5]}>
                                        <Text style={[GStyle.textPrimary]}>
                                            {I18n.t("btn_yes")}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* news弹出层*/}
                <Modal onRequestClose={()=>{}} transparent={true} visible={this.state.__newsVisible}>
                    <View style={[GStyle.col, GStyle.flex12, GStyle.bgTransp, {justifyContent: 'center'}]}>
                        <View style={[GStyle.flex2]}></View>
                        <View style={[GStyle.flex8,GStyle.pdh25, {justifyContent: 'center'}]}>
                            <View style={[GStyle.pdb11, GStyle.bgUnder, GStyle.bdRadius]}>
                                <TouchableOpacity style={[{position:'absolute',top:5,right:10},GStyle.mgl5]} onPress={this.__nextNews}>
                                    <Icon name='ios-close' size={30} color={Colors.middle}/>
                                </TouchableOpacity>
                                <View style={[GStyle.row,GStyle.posRowBetween,GStyle.mg10]}>
                                    <Text style={[GStyle.flex12,GStyle.mgh25, GStyle.textLightX,GStyle.textCenter,GStyle.textLg]}>{ news.title }</Text>

                                </View>

                                <View style={[GStyle.hr]}></View>
                                <ScrollView>
                                    <Text style={[GStyle.textLight,GStyle.pd15,{lineHeight:25}]}>        { news.content }</Text>
                                </ScrollView>
                            </View>
                        </View>
                        <View style={[GStyle.flex2]}></View>
                    </View>
                </Modal>
                <Modal onRequestClose={()=>{}} transparent={true} visible={this.state.__popMenuVisible}>
                    <TouchableOpacity style={[ GStyle.flex12 ]} activeOpacity={1}
                        onPress={()=>{this.setState({__popMenuVisible: false})}}>
                        <View style={[ styles.popMenu, {top: this.state.__popMenuTop, right: this.state.__popMenuRight} ]}>
                            <FAIcon name="caret-up" size={30}
                                style={[styles.popMenuCorner, {right: this.state.__popMenuCornerRight}]}/>
                            <View style={[styles.popMenuCtn]}>
                                {
                                    this.state.__popMenuView ? this.state.__popMenuView :
                                    <View>
                                        <TouchableOpacity style={[GStyle.row, GStyle.posCT, GStyle.mgh15]} activeOpacity={0.7}
                                            onPress={()=>{this.__toMenu("GroupScreen")}}>
                                            <Image style={[styles.popMenuIcon, GStyle.mgr5]}
                                                resizeMode="contain"
                                                source={require('../../res/image/pop_add_group.png')}/>
                                            <Text style={[GStyle.textWhite]}>{I18n.t('chat_menu_create_group')}</Text>
                                        </TouchableOpacity>
                                        <View style={[ GStyle.hr, GStyle.mgv10, GStyle.bdFore ]}/>
                                        <TouchableOpacity style={[GStyle.row, GStyle.posCT, GStyle.mgh15]} activeOpacity={0.7}
                                            onPress={()=>{this.__toMenu("AddContactScreen")}}>
                                            <Image style={[styles.popMenuIcon, GStyle.mgr5]}
                                                resizeMode="contain"
                                                source={require('../../res/image/pop_add_contact.png')}/>
                                            <Text style={[GStyle.textWhite]}>{I18n.t('chat_menu_add_contact')}</Text>
                                        </TouchableOpacity>
                                        <View style={[ GStyle.hr, GStyle.mgv10, GStyle.bdFore ]}/>
                                        <TouchableOpacity style={[GStyle.row, GStyle.posCT, GStyle.mgh15]} activeOpacity={0.7}
                                            onPress={this.__scanQrCode}>
                                            <Image style={[styles.popMenuIcon, GStyle.mgr5]}
                                                resizeMode="contain"
                                                source={require('../../res/image/pop_scan.png')}/>
                                            <Text style={[GStyle.textWhite]}>{I18n.t('chat_menu_scan')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
                <Modal onRequestClose={()=>{}} transparent={true} visible={this.state.__imageViewVisible}>
                    <TouchableOpacity style={[ GStyle.flex12, GStyle.posCC, GStyle.bgWhite ]} activeOpacity={1}
                        onPress={()=>{this.setState({__imageViewVisible: false})}}>
                        <Image style={[ {width: WINDOWS_WIDTH, height: WINDOWS_HEIGHT} ]}
                            resizeMode="center"
                            source={this.state.__imageViewList[0]} />
                    </TouchableOpacity>
                </Modal>
                {
                    this.state.__toastVisible ?
                    <Animated.View style={[styles.toastCtn, GStyle.center, GStyle.bgLight, GStyle.pdh15, GStyle.pdv5, {
                        opacity: this.state.__toastOpcity,
                        bottom: this.state.__toastBottom
                    }]}>
                        <Text style={[GStyle.textUnder]}>{this.state.__toastContent}</Text>
                    </Animated.View> : null
                }
                <Loading ref='__loading' text={this.state.__loadingText}/>
                {
                    invalidVer ?
                    <TouchableOpacity style={GStyle.fullScreen} onPress={this.__checkVer}/> : null
                }
            </View>

        )
    }
}
const styles = StyleSheet.create({
    toastCtn: {
        position: 'absolute',
        //bottom: 80,
        borderRadius: 20
    },
    backIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        marginLeft: -10,
        marginTop: -20,
        marginBottom: -10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    popMenuIcon: {
        width: 20,
        height: 20
    },
    popMenu: {
        position: 'absolute',
        top: 50,
        right: 10,
        paddingTop: 10
    },
    popMenuCtn: {
        backgroundColor: Colors.popMenu,
        borderRadius: 5,
        //paddingHorizontal: 15,
        paddingVertical: 10
    },
    popMenuCorner: {
        position: 'absolute',
        color: Colors.popMenu,
        top: -10
    }
});
