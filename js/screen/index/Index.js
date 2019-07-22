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
    ImageBackground
} from "react-native";


class Index extends React.Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            loading: false,
            progress: 50
        }
        this.lastBackPress = 0;  //再按一次退出

        this._title = "Gallop Network";
        this._menu = true;
    }


    componentDidMount(){
    }
    render(){
        return (
            <View style={ [GStyle.container] }>
                <ImageBackground source={require('../../../res/image/sky.png')} style={[{width: '100%', height: 170},GStyle.pd20]}>
                     <View>
                        <Text style={ [GStyle.textWhite, GStyle.textXxxl, GStyle.textBold] }>荒野大镖客</Text>
                        <Text style={ [GStyle.textDarkX] }>账号状态: 正常</Text>
                     </View>
                    <View style={[GStyle.row, GStyle.mgt25]}>
                        <View style={[styles.logo, GStyle.mgl10]}>
                            <Image style={ [styles.logo] } source={require('../../../res/image/logo_light.png')}></Image>
                        </View>
                        <View style={[GStyle.flex12,GStyle.posCT, GStyle.row,GStyle.logoHeight,GStyle.mgl10]}>
                            <Text style={[GStyle.textWhite,GStyle.textXl,GStyle.bdb,GStyle.pdb5,styles.bdCWhite]}>0.0092638 <Text style={[GStyle.textDarkX, GStyle.textMd]}> GN</Text></Text>
                        </View>
                        <View style={[GStyle.posCT, GStyle.row,GStyle.logoHeight,GStyle.mgl10]}>
                            <View style={[ GStyle.row, GStyle.posCC, GStyle.bgWhite,styles.btn]}>
                                <Text style={[GStyle.center,GStyle.textBlack]}>提币</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
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
    bdCWhite: {
        borderColor: '#fff'
    },
    btn: {
        width: 50,
        height: 20,
        borderRadius: 20
    }
});

export default PageWrap(Index)
