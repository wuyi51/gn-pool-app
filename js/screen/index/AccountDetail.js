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
import _ from "lodash";
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'


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
        const fill = 'rgb(234, 97, 102)'
        const data = [540, 310, 440, 295, 314, 824, 611, 585, 423, 330, 635, 953, 513, 524, 350, 420, 480,350, 310, 640, 795, 354, 324, 411, 685, 523, 485,424, 750, 420, 680,]
        const contentInset = { top: 30, bottom: 30 }
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
                    <View style={[GStyle.row,GStyle.mgl20,GStyle.mgr20,{ height: 400 }]}>
                        <YAxis
                            data={data}
                            contentInset={{top: 30, bottom: 30}}
                            svg={{
                                fill: 'black',
                                fontSize: 10,
                            }}
                            style={{

                            }}
                            numberOfTicks={10}
                            formatLabel={(value) => `${value}  `}
                        />
                        <View style={{flex: 1, marginLeft: 16}}>
                            <BarChart style={{ height: 380}} data={data} svg={{ fill }} contentInset={contentInset}>
                                <Grid />
                            </BarChart>
                            <XAxis
                                style={{ marginHorizontal: -10 ,marginTop: 5}}
                                data={data}
                                formatLabel={(value, index) => {
                                    if(index % 2 === 0){
                                        return index + 1
                                    }else {
                                        return ''
                                    }

                                }}
                                contentInset={{ left: 10, right: 10 }}
                                svg={{ fontSize: 10, fill: 'black' }}
                            />
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

});

export default PageWrap(AccountDetail)
