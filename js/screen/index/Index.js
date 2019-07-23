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

    goToAccountDetail(){
        this.__toMenu('AccountDetail', {});
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
                <ScrollView>
                    <TouchableOpacity activeOpacity={0.5}  onPress={()=>this.goToAccountDetail()} style={ [GStyle.mgt15,GStyle.mgr15] }>
                        <Text style={[GStyle.right,GStyle.textBlack]}>账户详情</Text>
                    </TouchableOpacity>
                    <View style={ [GStyle.mgl0,GStyle.mgr10,GStyle.row,GStyle.mgt15] }>
                        <View style={[styles.lineDouble,GStyle.flex12,GStyle.mgr10,GStyle.mgl10]}>
                            <Image style={[styles.lineDoubleImg]} source={require('../../../res/image/sky_0.png')}></Image>
                            {/*  通过height控制灰度范围，假设进度为60%，height值为（1-0.6）* 80    */}
                            <View style={[styles.cover,{height: 32}]}>
                                <Image style={[styles.coverImg]} source={require('../../../res/image/sky_0_gray.png')}></Image>
                            </View>
                            <View style={[styles.info,GStyle.pd10,GStyle.posColBetween]}>
                                <Text style={[GStyle.textWhite]}>自有算力</Text>
                                <Text style={[GStyle.textWhite,GStyle.textRight]}>0T/0T</Text>
                            </View>
                        </View>
                        <View style={[styles.lineDouble,GStyle.flex12]}>
                            <Image style={[styles.lineDoubleImg]} source={require('../../../res/image/sky_1.png')}></Image>
                            <View style={[styles.cover,{height: 50}]}>
                                <Image style={[styles.coverImg]} source={require('../../../res/image/sky_1_gray.png')}></Image>
                            </View>
                            <View style={[styles.info,GStyle.pd10,GStyle.posColBetween]}>
                                <Text style={[GStyle.textWhite]}>自有算力</Text>
                                <Text style={[GStyle.textWhite,GStyle.textRight]}>0T/0T</Text>
                            </View>
                        </View>
                    </View>
                    <View style={ [GStyle.mgl0,GStyle.mgr10,GStyle.row,GStyle.mgt15] }>
                        <View style={[styles.lineDouble,GStyle.flex12,GStyle.mgr10,GStyle.mgl10]}>
                            <Image style={[styles.lineDoubleImg]} source={require('../../../res/image/sky_2.png')}></Image>
                            <View style={[styles.cover,{height: 17}]}>
                                <Image style={[styles.coverImg]} source={require('../../../res/image/sky_2_gray.png')}></Image>
                            </View>
                            <View style={[styles.info,GStyle.pd10,GStyle.posColBetween]}>
                                <Text style={[GStyle.textWhite]}>自有算力</Text>
                                <Text style={[GStyle.textWhite,GStyle.textRight]}>0T/0T</Text>
                            </View>
                        </View>
                        <View style={[styles.lineDouble,GStyle.flex12]}>
                            <Image style={[styles.lineDoubleImg]} source={require('../../../res/image/sky_3.png')}></Image>
                            <View style={[styles.cover,{height: 0}]}>
                                <Image style={[styles.coverImg]} source={require('../../../res/image/sky_3_gray.png')}></Image>
                            </View>
                            <View style={[styles.info,GStyle.pd10,GStyle.posColBetween]}>
                                <Text style={[GStyle.textWhite]}>自有算力</Text>
                                <Text style={[GStyle.textWhite,GStyle.textRight]}>0T/0T</Text>
                            </View>
                        </View>
                    </View>
                    <View style={ [GStyle.mgl0,GStyle.mgr10,GStyle.row,GStyle.mgt15] }>
                        <View style={[styles.lineSinger,GStyle.flex12,GStyle.mgl10]}>
                            <Image style={[styles.lineSingerImg]} source={require('../../../res/image/sky_4.png')}></Image>
                            {/*  通过height控制灰度范围，假设进度为60%，height值为（1-0.6）* 60    */}
                            <View style={[styles.cover,{height: 0}]}>
                                <Image style={[styles.coverImg]} source={require('../../../res/image/sky_4_gray.png')}></Image>
                            </View>
                            <View style={[styles.singer_info,GStyle.pd10,GStyle.posRowBetween]}>
                                <Text style={[GStyle.textWhite,GStyle.center]}>全网有效矿工</Text>
                                <Text style={[GStyle.textWhite,GStyle.center]}>0人</Text>
                            </View>
                        </View>
                    </View>
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
    bdCWhite: {
        borderColor: '#fff'
    },
    btn: {
        width: 50,
        height: 20,
        borderRadius: 20
    },
    lineDouble: {
        height: 80,
        borderTopLeftRadius:8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        position: 'relative',
        overflow: 'hidden'
    },
    info: {
        height: 80,
        width: '100%',
        position: 'absolute'
    },
    singer_info: {
        height: 60,
        width: '100%',
        position: 'absolute'
    },
    lineDoubleImg: {
        height: 80,
        width: '100%',
        position: 'absolute'
    },
    cover: {
        width: '100%',
        position: 'absolute',
        overflow: 'hidden',
        backgroundColor: 'transparent'
    },
    coverImg: {
        height: 80,
        width: '100%',
    },
    lineSinger: {
        height: 60,
        borderTopLeftRadius:8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        position: 'relative',
        overflow: 'hidden'
    },
    lineSingerImg: {
        height: 60,
        width: '100%',
        position: 'absolute'
    }
});

export default PageWrap(Index)
