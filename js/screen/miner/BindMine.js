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


class BindMine extends React.Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            keys: ''
        }

        this._title = "绑定矿机";
        this._backNav = -1;
    }


    componentDidMount(){
    }
    render(){
        return (
            <View style={ [GStyle.container,{backgroundColor: '#F6F6F6'}] }>
                <ImageBackground source={require('../../../res/image/sky.png')} style={[{width: '100%', height: 120},GStyle.rowCenter]}>
                    <View style={[GStyle.row]}>
                        <View style={[styles.logo, GStyle.mgl10]}>
                            <Image style={ [styles.logo] } source={require('../../../res/image/google.png')}></Image>
                        </View>
                        <View style={[GStyle.flex12, GStyle.logoHeight,GStyle.mgl10,GStyle.rowCenter]}>
                            <Text style={[GStyle.textDarkX,GStyle.textSm]}> </Text>
                            <Text style={[GStyle.textWhite,GStyle.textMd]}>矿机绑定</Text>
                        </View>
                        <View style={[GStyle.posCT, GStyle.row,GStyle.logoHeight,GStyle.mgl10]}>
                        </View>
                    </View>
                </ImageBackground>
                <View style={[styles.InputWrap,GStyle.row,GStyle.mgt20,GStyle.mgl20,GStyle.mgr20]}>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        placeholder={'设备密钥'}
                        style={[GStyle.flex12,GStyle.textSm]}
                        onChangeText={(keys) => this.setState({keys})}
                        value={this.state.keys}
                    />
                </View>
                <TouchableOpacity activeOpacity={.5} style={[styles.submitBtn,GStyle.center,GStyle.mgt20,GStyle.posCC]}>
                    <Text style={[GStyle.textWhite,GStyle.textSm]}>矿机绑定</Text>
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
        paddingHorizontal: 10,
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

export default PageWrap(BindMine)
