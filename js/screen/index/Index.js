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
                <ImageBackground source={require('../../../res/image/sky.png')} style={[{width: '100%', height: 180},GStyle.pd20]}>
                     <View>
                        <Text style={ [GStyle.textWhite, GStyle.textXxxl, GStyle.textBold] }>荒野大镖客</Text>
                        <Text style={ [GStyle.textWhite] }>账号状态: 正常</Text>
                     </View>
                    <View style={[GStyle.row, GStyle.mgt25]}>
                        <View style={[styles.logo, GStyle.mgl20]}>
                            <Image style={ [styles.logo] } source={require('../../../res/image/logo_light.png')}></Image>
                        </View>
                        <View style={[GStyle.flex12]}>
                            <Text style={[GStyle.center]}>3</Text>
                        </View>
                        <View style={[]}>
                            <Text style={[GStyle.center]}>6</Text>
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
    }
});

export default PageWrap(Index)
