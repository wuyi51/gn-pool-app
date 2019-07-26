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
    StyleSheet,
    ImageBackground,
    TextInput
} from "react-native";


class ChangePassword extends React.Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            type: props.navigation.state.params.type,
            code: '',
            password: '',
            confirm_password: ''
        }

        this._title = "修改密码";
        this._backNav = -1;
    }


    componentDidMount(){
    }
    render(){
        return (
            <View style={ [GStyle.container,{backgroundColor: '#F6F6F6'}] }>
                <ImageBackground source={require('../../../res/image/sky.png')} style={[{width: '100%', height: 120},GStyle.pd20]}>
                    <View style={[GStyle.row, GStyle.mgt10]}>
                        <View style={[styles.logo, GStyle.mgl10]}>
                            <Image style={ [styles.logo] } source={require('../../../res/image/key_w.png')}></Image>
                        </View>
                        <View style={[GStyle.flex12, GStyle.logoHeight,GStyle.mgl10,GStyle.rowCenter]}>
                            <Text style={[GStyle.textDarkX]}> </Text>
                            <Text style={[GStyle.textWhite,GStyle.textXl]}>修改{this.state.type === 'login' ? '登录' : '提币' }密码</Text>
                        </View>
                        <View style={[GStyle.posCT, GStyle.row,GStyle.logoHeight,GStyle.mgl10]}>
                        </View>
                    </View>
                </ImageBackground>
                <View style={[styles.InputWrap,GStyle.mgt20,GStyle.mgl20,GStyle.mgr20]}>
                    <View style={[GStyle.row,GStyle.pdh10,GStyle.bdDarkX,GStyle.bdb,]}>
                        <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>新  密  码</Text>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            placeholder={'请输入新密码，6-16位字符'}
                            style={[GStyle.flex12]}
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={[GStyle.row,GStyle.pdh10,GStyle.bdDarkX,GStyle.bdb,]}>
                        <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>重复密码</Text>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            placeholder={'请输再次入新密码'}
                            style={[GStyle.flex12]}
                            onChangeText={(confirm_password) => this.setState({confirm_password})}
                            value={this.state.confirm_password}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={[GStyle.row,GStyle.pdh10]}>
                        <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>谷歌验证码</Text>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            placeholder={'请输入谷歌验证码'}
                            style={[GStyle.flex12]}
                            onChangeText={(code) => this.setState({code})}
                            value={this.state.code}
                        />
                    </View>
                </View>
                <TouchableOpacity activeOpacity={.5} style={[styles.submitBtn,GStyle.center,GStyle.mgt20,GStyle.posCC]}>
                    <Text style={[GStyle.textWhite]}>修改</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 60,
        height: 60
    },
    logoHeight: {
        height: 60
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
        backgroundColor: '#F5B737',
        width: 150,
        height: 35,
        borderRadius: 40,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#ddd',
        elevation: 3,
    }
});

export default PageWrap(ChangePassword)
