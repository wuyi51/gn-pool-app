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

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            loading: false,
            progress: 50
        }
        this.lastBackPress = 0;  //再按一次退出

        this._title = "我的";
        this._menu = true;
    }


    componentDidMount(){

    }
    render(){
        return (
            <View style={ [GStyle.container,{backgroundColor: '#f2f2f2'}] }>
                <ImageBackground source={require('../../../res/image/sky.png')} style={[{width: '100%', height: 140},GStyle.pd20]}>
                    <View style={[GStyle.row, GStyle.mgt15]}>
                        <View style={[GStyle.flex12, GStyle.logoHeight,GStyle.mgl10,GStyle.rowCenter]}>
                            <Text style={[GStyle.textDarkX,GStyle.textXxxl,GStyle.textBold]}>AndyChen</Text>
                            <Text style={[GStyle.textWhite,GStyle.textLg]}>荒野大镖客</Text>
                        </View>
                        <View style={[GStyle.posCT, GStyle.row,GStyle.logoHeight,GStyle.mgl10]}>
                            <TouchableOpacity activeOpacity={.5}>
                                <Image style={[styles.QRIcon]} source={require('../../../res/image/QR_code.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView style={[{marginTop: -50}]}>
                    <View style={[styles.InputWrap,GStyle.mgt20,GStyle.mgl20,GStyle.mgr20]}>
                        <TouchableOpacity activeOpacity={.5} style={[GStyle.posRowBetween,GStyle.pdt15,GStyle.pdb15,GStyle.bdDarkX,GStyle.bdb,GStyle.pdh20]}>
                            <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>我的推荐</Text>
                            <View>
                                <FAIcon name="angle-right" size={20}></FAIcon>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.5} style={[GStyle.posRowBetween,GStyle.pdt15,GStyle.pdb15,GStyle.bdDarkX,GStyle.bdb,GStyle.pdh20]}>
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
                        <TouchableOpacity activeOpacity={.5} style={[GStyle.posRowBetween,GStyle.pdt15,GStyle.pdb15,GStyle.bdDarkX,GStyle.bdb,GStyle.pdh20]}>
                            <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>绑定谷歌验证码</Text>
                            <View>
                                <FAIcon name="angle-right" size={20}></FAIcon>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.5} style={[GStyle.posRowBetween,GStyle.pdt15,GStyle.pdb15,GStyle.bdDarkX,GStyle.bdb,GStyle.pdh20]}>
                            <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>修改登录密码</Text>
                            <View>
                                <FAIcon name="angle-right" size={20}></FAIcon>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.5} style={[GStyle.posRowBetween,GStyle.pdt15,GStyle.pdb15,GStyle.pdh20]}>
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
                    <View style={[GStyle.mgb20]}/>
                </ScrollView>

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
});


export default PageWrap(Profile)
