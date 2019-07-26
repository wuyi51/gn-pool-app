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

import QRCode from 'react-native-qrcode';

class BindGoogleCode extends React.Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            type: props.navigation.state.params.type,
            code: '',
            draw_password: '',
            step: 1,
            key: '1a79c3555ce2f24dfeb5e6c7fbfd38ba'
        }

        this._title = "Google验证码";
        this._backNav = -1;
    }


    componentDidMount(){
    }

    nextStep(){
        this.setState({
            step: 2
        })
    }

    render(){
        return (
            <View style={ [GStyle.container,{backgroundColor: '#F6F6F6'}] }>
                <ImageBackground source={require('../../../res/image/sky.png')} style={[{width: '100%', height: 120},GStyle.pd20]}>
                    <View style={[GStyle.row, GStyle.mgt10]}>
                        <View style={[styles.logo, GStyle.mgl10]}>
                            <Image style={ [styles.logo] } source={require('../../../res/image/google.png')}></Image>
                        </View>
                        <View style={[GStyle.flex12, GStyle.logoHeight,GStyle.mgl10,GStyle.rowCenter]}>
                            <Text style={[GStyle.textDarkX]}> </Text>
                            <Text style={[GStyle.textWhite,GStyle.textXl]}>{this.state.step === 1 ? '谷歌验证码注册' : '谷歌验证码密钥'}</Text>
                        </View>
                        <View style={[GStyle.posCT, GStyle.row,GStyle.logoHeight,GStyle.mgl10]}>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView>
                    {
                        this.state.step === 1 ?
                            <View style={[styles.InputWrap,GStyle.mgt20,GStyle.mgl20,GStyle.mgr20]}>
                                <View style={[GStyle.row,GStyle.pdt15,GStyle.pdb15,GStyle.bdDarkX,GStyle.bdb,GStyle.pdh10]}>
                                    <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>用户名</Text>
                                    <View style={[GStyle.flex12]}>
                                        <Text style={[GStyle.textBlack]}>AndyChen</Text>
                                    </View>
                                </View>
                                <View style={[GStyle.row,GStyle.pdh10]}>
                                    <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>提币密码</Text>
                                    <TextInput
                                        underlineColorAndroid={'transparent'}
                                        placeholder={'请输入提币密码'}
                                        style={[GStyle.flex12]}
                                        onChangeText={(draw_password) => this.setState({draw_password})}
                                        value={this.state.draw_password}
                                        secureTextEntry={true}
                                    />
                                </View>
                            </View>

                            :
                            <View style={[GStyle.pdb5]}>
                                <View style={[styles.InputWrap,GStyle.mgt20,GStyle.mgl20,GStyle.mgr20]}>
                                    <View style={[GStyle.center,GStyle.mgt20,GStyle.mgb10]}>
                                        <QRCode
                                            value={this.state.key}
                                            size={200}
                                            bgColor='black'
                                            fgColor='white'/>
                                    </View>
                                    <View style={[GStyle.row,GStyle.pdt15,GStyle.pdb15,GStyle.bdDarkX,GStyle.bdb,GStyle.pdh10]}>
                                        <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>密钥</Text>
                                        <View style={[GStyle.flex12]}>
                                            <Text style={[GStyle.textBlack]}>{this.state.key}</Text>
                                        </View>
                                    </View>
                                    <View style={[GStyle.row,GStyle.pdh10]}>
                                        <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>验证码</Text>
                                        <TextInput
                                            underlineColorAndroid={'transparent'}
                                            placeholder={'请输入谷歌验证码'}
                                            style={[GStyle.flex12]}
                                            onChangeText={(code) => this.setState({code})}
                                            value={this.state.code}
                                        />
                                    </View>
                                </View>
                                <View style={[GStyle.mgt20,GStyle.mgl20,GStyle.mgr20]}>
                                    <Text style={[GStyle.textBlack]}>注意：系统不提供谷歌验证码找回服务</Text>
                                    <Text style={[GStyle.textBlack]}>请妥善保存谷歌验证码</Text>
                                </View>
                            </View>

                    }

                    {
                        this.state.step === 1 ?
                            <TouchableOpacity onPress={()=>this.nextStep()} activeOpacity={.5} style={[styles.submitBtn,GStyle.center,GStyle.mgt20,GStyle.posCC]}>
                                <Text style={[GStyle.textWhite]}>注册</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity activeOpacity={.5} style={[styles.submitBtn,GStyle.center,GStyle.mgt15,GStyle.posCC]}>
                                <Text style={[GStyle.textWhite]}>绑定</Text>
                            </TouchableOpacity>
                    }
                    <View style={[GStyle.pdb15]}></View>
                </ScrollView>
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

export default PageWrap(BindGoogleCode)
