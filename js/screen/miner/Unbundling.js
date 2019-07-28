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


class Unbundling extends React.Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            code: ''
        }

        this._title = "解绑矿机";
        this._backNav = -1;
    }


    componentDidMount(){
    }
    render(){
        return (
            <View style={ [GStyle.container,{backgroundColor: '#F6F6F6'}] }>
                <ImageBackground source={require('../../../res/image/sky.png')} style={[{width: '100%', height: 100},GStyle.rowCenter]}>
                    <View style={[GStyle.row]}>
                        <View style={[styles.logo, GStyle.mgl10]}>
                            <Image style={ [styles.logo] } source={require('../../../res/image/google.png')}></Image>
                        </View>
                        <View style={[GStyle.flex12, GStyle.logoHeight,GStyle.mgl10,GStyle.rowCenter]}>
                            <Text style={[GStyle.textDarkX]}> </Text>
                            <Text style={[GStyle.textWhite,GStyle.textMd]}>矿机解绑</Text>
                        </View>
                        <View style={[GStyle.posCT, GStyle.row,GStyle.logoHeight,GStyle.mgl10]}>
                        </View>
                    </View>
                </ImageBackground>
                <View style={[styles.InputWrap,GStyle.mgt20,GStyle.mgl20,GStyle.mgr20]}>
                    <View style={[GStyle.row,GStyle.pdt15,GStyle.pdb15,GStyle.bdDarkX,GStyle.bdb,GStyle.pdh10]}>
                        <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10,GStyle.textSm]}>ID</Text>
                        <View style={[GStyle.flex12]}>
                            <Text style={[GStyle.textBlack,GStyle.textSm]}>5cd718cdf706dc3072be3875b4a076f4</Text>
                        </View>
                    </View>
                    <View style={[GStyle.row,GStyle.pdt15,GStyle.pdb15,GStyle.bdDarkX,GStyle.bdb,GStyle.pdh10]}>
                        <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10,GStyle.textSm]}>设备算力</Text>
                        <View style={[GStyle.flex12]}>
                            <Text style={[GStyle.textBlack,GStyle.textSm]}>0 GB</Text>
                        </View>
                    </View>
                    <View style={[GStyle.row,GStyle.pdt15,GStyle.pdb15,GStyle.bdDarkX,GStyle.bdb,GStyle.pdh10]}>
                        <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10,GStyle.textSm]}>设备状态</Text>
                        <View style={[GStyle.flex12]}>
                            <Text style={[GStyle.textBlack,GStyle.textSm]}>离线</Text>
                        </View>
                    </View>
                    <View style={[GStyle.row,GStyle.pdt15,GStyle.pdb15,GStyle.bdDarkX,GStyle.bdb,GStyle.pdh10]}>
                        <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10,GStyle.textSm]}>挖矿状态</Text>
                        <View style={[GStyle.flex12]}>
                            <Text style={[GStyle.textBlack,GStyle.textSm]}>未挖矿</Text>
                        </View>
                    </View>
                    <View style={[GStyle.row,GStyle.pdt15,GStyle.pdb15,GStyle.bdDarkX,GStyle.bdb,GStyle.pdh10]}>
                        <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10,GStyle.textSm]}>押注状态</Text>
                        <View style={[GStyle.flex12]}>
                            <Text style={[GStyle.textBlack,GStyle.textSm]}>未押注</Text>
                        </View>
                    </View>
                    <View style={[GStyle.row,GStyle.pdh10]}>
                        <Text style={[GStyle.center,GStyle.textBlack,GStyle.mgr10,GStyle.textSm]}>验证码</Text>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            placeholder={'请输入谷歌验证码'}
                            style={[GStyle.flex12,GStyle.textSm]}
                            onChangeText={(code) => this.setState({code})}
                            value={this.state.code}
                        />
                    </View>
                </View>
                <TouchableOpacity activeOpacity={.5} style={[styles.submitBtn,GStyle.center,GStyle.mgt20,GStyle.posCC]}>
                    <Text style={[GStyle.textWhite,GStyle.textSm]}>矿机解绑</Text>
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

export default PageWrap(Unbundling)
