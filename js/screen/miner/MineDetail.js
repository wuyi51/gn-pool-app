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
import ListPopover from '../../components/ListPopover';
let today = new Date().getTime();
let items = [];
for(let i = 0; i < 30; i++){
    let month = new Date(today).getMonth() + 1;
    let day = new Date(today).getDate();
    items.push(month + '月' + day + '日')
    today = today - 86400000
}


class MineDetail extends React.Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            isVisible: false,
            today:today
        }

        this._title = "设备详情";
        this._backNav = -1;
    }


    componentDidMount(){
    }


    render(){
        const fill = 'rgb(234, 97, 102)'
        const data = [540, 310, 440, 295, 314, 824, 611, 585, 423, 330, 635, 953, 513, 524, 350, 420, 480,350, 310, 640, 795, 354, 324, 411, 685, 523, 485,424, 750, 420, 680,]
        const contentInset = { top: 30, bottom: 30 }
        return (
            <View style={ [GStyle.container,{backgroundColor: '#F6F6F6'}] }>
                <ImageBackground source={require('../../../res/image/sky.png')} style={[{width: '100%', height: 100},GStyle.pd20]}>
                    <View style={[GStyle.row, GStyle.mgt15]}>
                        <View style={[styles.logo, GStyle.mgl10]}>
                            <Image style={ [styles.logo] } source={require('../../../res/image/miner_w.png')}></Image>
                        </View>
                        <View style={[GStyle.flex12, GStyle.logoHeight,GStyle.mgl10,GStyle.rowCenter]}>
                            <Text style={[GStyle.textDarkX]}>ID: 5cd718cdf706dc3072be3875b4a076f4</Text>
                            <View style={[GStyle.posRowBetween,GStyle.mgt5]}>
                                <Text style={[GStyle.textWhite]}>在线状态：离线(未挖坑)</Text>
                                <Text style={[GStyle.textWhite]}>设备算力：0GB</Text>
                            </View>
                        </View>
                        <View style={[GStyle.posCT, GStyle.row,GStyle.logoHeight,GStyle.mgl10]}>
                        </View>
                    </View>
                </ImageBackground>
                <View style={[GStyle.posRowBetween,GStyle.mgt15,GStyle.mgl15]}>
                    <Text style={[GStyle.textBlack]}>押注地址：5cd718cdf706dc3072be3875b4a076f4</Text>
                </View>
                <View style={[GStyle.posRowBetween,GStyle.mgt10,GStyle.mgl15, GStyle.mgr15]}>
                    <Text style={[GStyle.textBlack]}>押注金额：0 GN  <Text style={[GStyle.textSuccess,GStyle.mgl10]}>  刷新</Text></Text>
                    <Text style={[GStyle.textBlack]}>押注状态：未押注</Text>
                </View>
                <View style={[GStyle.posRowBetween,GStyle.mgt5,GStyle.mgl15, GStyle.mgr15]}>
                    <Text style={[GStyle.textBlack]}>设备描述：测试</Text>
                    <View style={[styles.unbindBtn,GStyle.posCC]}>
                        <Text style={[styles.unbindBtnText]}>解绑</Text>
                    </View>
                </View>
                <View style={[GStyle.row,GStyle.posRowBetween,GStyle.mgt20]}>
                    <View style={[GStyle.mgl15,GStyle.mgt10]}>
                        <Text style={[GStyle.textBlack,GStyle.textLg]}>设备日收益</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.setState({isVisible: true})}>
                            <Text style={[GStyle.black]}>{this.state.item || items[0]}</Text>
                        </TouchableOpacity>
                        <ListPopover
                            list={items}
                            popoverStyle={{
                                backgroundColor: '#fff',
                                width: 100,
                                borderRadius: 5,

                            }}
                            containerStyle={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'absolute',
                                width: 100,
                                zIndex: 10,
                                right: 10,
                                top: 35,
                            }}
                            isVisible={this.state.isVisible}
                            onClick={(item) => this.setState({item: item})}
                            onClose={() => this.setState({isVisible: false})}/>
                    </View>

                </View>
                <ScrollView>

                    <View style={[GStyle.row,GStyle.mgl20,GStyle.mgr20,GStyle.mgb20,{ height: 340 }]}>
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
                            <BarChart style={{ height: 320}} data={data} svg={{ fill }} contentInset={contentInset}>
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
        width: 34,
        height: 37
    },
    logoHeight: {
        height: 40
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: 4,
        marginLeft: 10,
        marginRight: 10,
        paddingHorizontal: 10,
        paddingVertical:8,
        width: 100,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#ddd',
        elevation: 3,
    },
    unbindBtn:{
        width: 60,
        height: 25,
        backgroundColor: 'rgba(221,68,34,0.2)',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#d42',

    },
    unbindBtnText: {
        color: '#d42'
    }
});

export default PageWrap(MineDetail)
