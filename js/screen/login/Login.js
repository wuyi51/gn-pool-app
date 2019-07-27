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


class Login extends React.Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            tab_index: 0,
            login_username: '',
            login_password: '',
            login_verify: '',
            register_username: '',
            register_nick: '',
            register_password: '',
            register_confirm_password: '',
            register_draw_password: '',
            register_confirm_draw_password: '',
            register_verify: '',
        }

        this._title = "";
        this.lastBackPress = 0;
    }


    componentDidMount(){
    }

    selectTab(tab_index){
        this.setState({tab_index})
    }

    _login(){

    }

    _register(){

    }

    render(){
        return (
            <View style={ [GStyle.container,{backgroundColor: '#F6F6F6'}] }>
                <ScrollView>
                    <View style={[GStyle.mgt25,GStyle.center]}>
                        <Image style={ [styles.logo] } source={require('../../../res/image/logo.png')}></Image>
                    </View>
                    <Image style={ [styles.logo_word,GStyle.center,GStyle.mgt10] } source={require('../../../res/image/logo_word.png')}></Image>
                    <View style={[GStyle.posCC,GStyle.row,GStyle.mgt25]}>
                        <Text onPress={()=>this.selectTab(0)} style={[this.state.tab_index === 0 ? GStyle.textPrimary : GStyle.textBlack,GStyle.mgr25,GStyle.textLg]}>登录</Text>
                        <Text onPress={()=>this.selectTab(1)} style={[this.state.tab_index === 1 ? GStyle.textPrimary : GStyle.textBlack,GStyle.mgl25,GStyle.textLg]}>注册</Text>
                    </View>
                    {
                        this.state.tab_index === 0 ?
                            // 登录
                            <View style={[styles.InputWrap,GStyle.mgt20,GStyle.mgl20,GStyle.mgr20]}>
                                <View style={[GStyle.row,GStyle.pdh10,GStyle.bdDarkX,GStyle.bdb,]}>
                                    <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>用户名</Text>
                                    <TextInput
                                        underlineColorAndroid={'transparent'}
                                        placeholder={'请输入用户名'}
                                        style={[GStyle.flex12]}
                                        onChangeText={(login_username) => this.setState({login_username})}
                                        value={this.state.login_username}
                                    />
                                </View>
                                <View style={[GStyle.row,GStyle.pdh10,GStyle.bdDarkX,GStyle.bdb,]}>
                                    <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>密     码</Text>
                                    <TextInput
                                        underlineColorAndroid={'transparent'}
                                        placeholder={'请输入密码'}
                                        style={[GStyle.flex12]}
                                        onChangeText={(login_password) => this.setState({login_password})}
                                        value={this.state.login_password}
                                        secureTextEntry={true}
                                    />
                                </View>
                                <View style={[GStyle.row,GStyle.pdh10]}>
                                    <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>验证码</Text>
                                    <TextInput
                                        underlineColorAndroid={'transparent'}
                                        placeholder={'请输入验证码'}
                                        style={[GStyle.flex12]}
                                        onChangeText={(login_verify) => this.setState({login_verify})}
                                        value={this.state.login_verify}
                                    />
                                    <Image style={ [styles.code,GStyle.center] } source={require('../../../res/image/test_code.png')}></Image>
                                </View>
                            </View>
                            :
                            // 注册
                            <View style={[styles.InputWrap,GStyle.mgt20,GStyle.mgl20,GStyle.mgr20]}>
                                <View style={[GStyle.row,GStyle.pdh10,GStyle.bdDarkX,GStyle.bdb,]}>
                                    <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>用户名</Text>
                                    <TextInput
                                        underlineColorAndroid={'transparent'}
                                        placeholder={'6-16个中英文，下划线'}
                                        style={[GStyle.flex12]}
                                        onChangeText={(login_username) => this.setState({login_username})}
                                        value={this.state.login_username}
                                    />
                                </View>
                                <View style={[GStyle.row,GStyle.pdh10,GStyle.bdDarkX,GStyle.bdb,]}>
                                    <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>昵称</Text>
                                    <TextInput
                                        underlineColorAndroid={'transparent'}
                                        placeholder={'2-16个中英文、符号'}
                                        style={[GStyle.flex12]}
                                        onChangeText={(register_username) => this.setState({register_username})}
                                        value={this.state.register_username}
                                    />
                                </View>
                                <View style={[GStyle.row,GStyle.pdh10,GStyle.bdDarkX,GStyle.bdb,]}>
                                    <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>登录密码</Text>
                                    <TextInput
                                        underlineColorAndroid={'transparent'}
                                        placeholder={'请输入登录密码'}
                                        style={[GStyle.flex12]}
                                        onChangeText={(register_password) => this.setState({register_password})}
                                        value={this.state.register_password}
                                        secureTextEntry={true}
                                    />
                                </View>
                                <View style={[GStyle.row,GStyle.pdh10,GStyle.bdDarkX,GStyle.bdb,]}>
                                    <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>确认登录密码</Text>
                                    <TextInput
                                        underlineColorAndroid={'transparent'}
                                        placeholder={'请再次输入登录密码'}
                                        style={[GStyle.flex12]}
                                        onChangeText={(register_confirm_password) => this.setState({register_confirm_password})}
                                        value={this.state.register_confirm_password}
                                        secureTextEntry={true}
                                    />
                                </View>
                                <View style={[GStyle.row,GStyle.pdh10,GStyle.bdDarkX,GStyle.bdb,]}>
                                    <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>登录密码</Text>
                                    <TextInput
                                        underlineColorAndroid={'transparent'}
                                        placeholder={'请输入提币密码'}
                                        style={[GStyle.flex12]}
                                        onChangeText={(register_draw_password) => this.setState({register_draw_password})}
                                        value={this.state.register_draw_password}
                                        secureTextEntry={true}
                                    />
                                </View>
                                <View style={[GStyle.row,GStyle.pdh10,GStyle.bdDarkX,GStyle.bdb,]}>
                                    <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>确认提币密码</Text>
                                    <TextInput
                                        underlineColorAndroid={'transparent'}
                                        placeholder={'请再次输入提币密码'}
                                        style={[GStyle.flex12]}
                                        onChangeText={(register_confirm_draw_password) => this.setState({register_confirm_draw_password})}
                                        value={this.state.register_confirm_draw_password}
                                        secureTextEntry={true}
                                    />
                                </View>
                                <View style={[GStyle.row,GStyle.pdh10]}>
                                    <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10]}>验证码</Text>
                                    <TextInput
                                        underlineColorAndroid={'transparent'}
                                        placeholder={'请输入验证码'}
                                        style={[GStyle.flex12]}
                                        onChangeText={(register_verify) => this.setState({register_verify})}
                                        value={this.state.register_verify}
                                    />
                                    <Image style={ [styles.code,GStyle.center] } source={require('../../../res/image/test_code.png')}></Image>
                                </View>
                            </View>
                    }
                    {
                        this.state.tab_index === 0 ?
                            <TouchableOpacity onPress={()=>this._login()} activeOpacity={.5} style={[styles.submitBtn,GStyle.center,GStyle.mgt25,GStyle.posCC]}>
                                <Text style={[GStyle.textWhite]}>登录</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=>this._register()} activeOpacity={.5} style={[styles.submitBtn,GStyle.center,GStyle.mgt20,GStyle.posCC]}>
                                <Text style={[GStyle.textWhite]}>注册</Text>
                            </TouchableOpacity>
                    }

                    <View style={[GStyle.mgb10]}></View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 80,
        height: 80,
        marginTop: 60,
    },
    logo_word:  {
        width: 235,
        height: 34
    },
    InputWrap: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#ddd',
        elevation: 3,

    },
    code: {
        width: 90,
        height: 30
    },
    submitBtn: {
        backgroundColor: 'rgb(88,255,194)',
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

export default PageWrap(Login)
