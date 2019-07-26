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
    StyleSheet, ImageBackground, TextInput
} from "react-native";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Modals from 'react-native-modalbox';
import QRCode from 'react-native-qrcode';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            user_name: '荒野大镖客'
        }
        this.lastBackPress = 0;  //再按一次退出

        this._title = "我的";
        this._menu = true;
    }


    componentDidMount(){

    }

    showCode(){
        this.refs.codeModal.open()
    }

    closeModal(){
        this.refs.codeModal.close()
    }

    goToRecommend(){
        this.__toMenu('Recommend', {});
    }

    goToMyRecommend(){
        this.__toMenu('MyRecommend', {});
    }

    goToChangePassword(type){
        this.__toMenu('ChangePassword', {type: type});
    }

    goToBindGoogleCode(type){
        this.__toMenu('BindGoogleCode', {type: type});
    }


    render(){
        return (
            <View style={ [GStyle.container,{backgroundColor: '#f2f2f2'}] }>
                <ImageBackground source={require('../../../res/image/sky.png')} style={[{width: '100%', height: 140},GStyle.pd20]}>
                    <View style={[GStyle.row, GStyle.mgt15]}>
                        <View style={[GStyle.flex12, GStyle.logoHeight,GStyle.mgl10,GStyle.rowCenter]}>
                            <Text style={[GStyle.textDarkX,GStyle.textXxxl,GStyle.textBold]}>AndyChen</Text>
                            <Text style={[GStyle.textWhite,GStyle.textLg]}>{this.state.user_name}</Text>
                        </View>
                        <View style={[GStyle.posCT, GStyle.row,GStyle.logoHeight,GStyle.mgl10]}>
                            <TouchableOpacity activeOpacity={.5} onPress={()=>this.showCode()}>
                                <Image style={[styles.QRIcon]} source={require('../../../res/image/QR_code.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView style={[{marginTop: -50}]}>
                    <View style={[styles.InputWrap,GStyle.mgt20,GStyle.mgl20,GStyle.mgr20]}>
                        <TouchableOpacity onPress={()=>this.goToRecommend()} activeOpacity={.5} style={[GStyle.posRowBetween,GStyle.pdt15,GStyle.pdb15,GStyle.bdDarkX,GStyle.bdb,GStyle.pdh20]}>
                            <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>绑定推荐</Text>
                            <View>
                                <FAIcon name="angle-right" size={20}></FAIcon>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.goToMyRecommend()} activeOpacity={.5} style={[GStyle.posRowBetween,GStyle.pdt15,GStyle.pdb15,GStyle.bdDarkX,GStyle.bdb,GStyle.pdh20]}>
                            <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>我推荐的会员</Text>
                            <View>
                                <FAIcon name="angle-right" size={20}></FAIcon>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.5} style={[GStyle.posRowBetween,GStyle.pdt15,GStyle.pdb15,GStyle.pdh20]}>
                            <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>提币记录</Text>
                            <View>
                                <FAIcon name="angle-right" size={20}></FAIcon>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.InputWrap,GStyle.mgt20,GStyle.mgl20,GStyle.mgr20]}>
                        <TouchableOpacity onPress={()=>this.goToBindGoogleCode()} activeOpacity={.5} style={[GStyle.posRowBetween,GStyle.pdt15,GStyle.pdb15,GStyle.bdDarkX,GStyle.bdb,GStyle.pdh20]}>
                            <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>绑定谷歌验证码</Text>
                            <View>
                                <FAIcon name="angle-right" size={20}></FAIcon>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.goToChangePassword('login')} activeOpacity={.5} style={[GStyle.posRowBetween,GStyle.pdt15,GStyle.pdb15,GStyle.bdDarkX,GStyle.bdb,GStyle.pdh20]}>
                            <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>修改登录密码</Text>
                            <View>
                                <FAIcon name="angle-right" size={20}></FAIcon>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.goToChangePassword('draw')} activeOpacity={.5} style={[GStyle.posRowBetween,GStyle.pdt15,GStyle.pdb15,GStyle.pdh20]}>
                            <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>修改提币密码</Text>
                            <View>
                                <FAIcon name="angle-right" size={20}></FAIcon>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.InputWrap,GStyle.mgt20,GStyle.mgl20,GStyle.mgr20]}>
                        <View style={[GStyle.posRowBetween,GStyle.pdt15,GStyle.pdb15,GStyle.pdh20]}>
                            <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>当前版本</Text>
                            <View>
                               <Text style={[GStyle.textDark,GStyle.textXl]}>1.0.0</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.submitBtn,GStyle.center,GStyle.mgt20,GStyle.posCC]}>
                        <Text style={[GStyle.textWhite]}>退出登录</Text>
                    </View>
                    <View style={[GStyle.mgb20]}/>
                </ScrollView>
                <Modals style={[styles.codeModal]}
                        position={"center"}
                        ref={"codeModal"}
                        entry={'top'}
                        swipeToClose={false}
                        swipeArea={0}
                >
                    <TouchableOpacity onPress={()=>this.closeModal()} activeOpacity={1} style={[GStyle.posCC,GStyle.flex12]}>
                        <Text style={[GStyle.textXxl,GStyle.mgb15,GStyle.textBlack]}>{this.state.user_name}</Text>
                        <QRCode
                            value={this.state.user_name}
                            size={200}
                            bgColor='black'
                            fgColor='white'/>
                        <Text style={[GStyle.textMd,GStyle.mgt15,GStyle.textDark]}>扫一扫绑定关系</Text>
                    </TouchableOpacity>
                </Modals>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    QRIcon: {
        width: 35,
        height: 35
    },
    InputWrap: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#ddd',
        elevation: 3,

    },
    submitBtn: {
        backgroundColor: '#D11436',
        width: 150,
        height: 35,
        borderRadius: 40,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#ddd',
        elevation: 3,
    },
    codeModal: {

    }
});


export default PageWrap(Profile)
