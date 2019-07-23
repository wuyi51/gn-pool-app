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
    StyleSheet, ImageBackground
} from "react-native";
import _ from "lodash";


class AccountDetail extends React.Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            loading: false,
            progress: 50
        }

        this._title = "账户详情";
        this._backNav = -1;
    }


    componentDidMount(){
    }


    render(){
        return (
            <View style={ [GStyle.container] }>
                <ImageBackground source={require('../../../res/image/sky.png')} style={[{width: '100%', height: 120},GStyle.pd20]}>
                    <View style={[GStyle.row, GStyle.mgt10]}>
                        <View style={[styles.logo, GStyle.mgl10]}>
                            <Image style={ [styles.logo] } source={require('../../../res/image/logo_light.png')}></Image>
                        </View>
                        <View style={[GStyle.flex12, GStyle.logoHeight,GStyle.mgl10,GStyle.rowCenter]}>
                            <Text style={[GStyle.textDarkX]}>7月累计收益</Text>
                            <Text style={[GStyle.textWhite,GStyle.textXl]}>0<Text style={[GStyle.textDarkX, GStyle.textMd]}> GN</Text></Text>
                        </View>
                        <View style={[GStyle.posCT, GStyle.row,GStyle.logoHeight,GStyle.mgl10]}>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView>

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

});

export default PageWrap(AccountDetail)
