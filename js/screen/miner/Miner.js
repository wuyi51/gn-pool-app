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
    FlatList,
    RefreshControl
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";



class Miner extends React.Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            isRefreshing: false,
            miners: [
                {
                    id: 'ed1754d2e3b466763a99f248b02df1cc',
                    status: 'ON',
                    mineStatus: 'ON',
                    stakeStatus: 'Y'
                },
                {
                    id: '1a79c3555ce2f24dfeb5e6c7fbfd38ba',
                    status: 'ON',
                    mineStatus: 'OFF',
                    stakeStatus: 'Y'
                },
                {
                    id: '5cd718cdf706dc3072be3875b4a076f4',
                    status: 'OFF',
                    mineStatus: 'OFF',
                    stakeStatus: 'N'
                },
                {
                    id: 'f518a82126a6543ed8e55f9b9c233ece',
                    status: 'OFF',
                    mineStatus: 'OFF',
                    stakeStatus: 'N'
                },
                {
                    id: '473648e220745ff6d7ab72f674693e13',
                    status: 'ON',
                    mineStatus: 'OFF',
                    stakeStatus: 'N'
                },
                {
                    id: 'ca92097fdbc424f6f8a2f8a98cf4acb9',
                    status: 'OFF',
                    mineStatus: 'ON',
                    stakeStatus: 'Y'
                },
            ]
        }
        this.lastBackPress = 0;  //再按一次退出

        this._title = "矿机";
        this._menu = true;
        this.pageIndex = 1;
    }


    componentDidMount(){
    }

    goToDetail(){
        this.__toMenu('MineDetail', {});
    }

    goToBindMiner(){
        this.__toMenu('BindMine', {});
    }

    _keyExtractor = (item, index) => index;

    _renderItem({item}){
        return (
            <TouchableOpacity activeOpacity={.8}  onPress={()=>this.goToDetail()} style={[styles.itemView,GStyle.mgl15,GStyle.mgr15,GStyle.mgb15,GStyle.pd15]}>
                <View style={[GStyle.posRowBetween]}>
                    <Text style={[GStyle.textPrimary]}>状态：
                        <Text style={[item.status === 'ON' ? GStyle.textPrimary : GStyle.textError]}>{item.status === 'ON' ? '在线' : '离线'}</Text>
                        {
                            item.status === 'ON' ?
                                <Text style={[item.mineStatus === 'ON' ? GStyle.textPrimary : GStyle.textError]}> {item.mineStatus === 'ON' ? '(挖坑中)' : '(未挖坑)'}</Text>
                                :
                                <Text/>
                        }

                    </Text>
                    <Text style={[GStyle.textPrimary]}>算力：1GB</Text>
                </View>
                <Text style={[GStyle.textPrimary,GStyle.mgt5]}>设备ID：{item.id}</Text>
                <View style={[GStyle.posRowBetween,GStyle.mgt5]}>
                    <Text numberOfLines={1} style={[GStyle.textPrimary,{width:WINDOWS_WIDTH - 120}]}>押注地址：ca92097fdbc424f6f8a2f8a98cf4acb9ca92097fdbc4</Text>
                    <Text style={[item.stakeStatus === 'Y' ? GStyle.textPrimary : GStyle.textError]}>{item.stakeStatus === 'Y' ? '(已押注)' : '(未押注)'}</Text>
                </View>
                <View style={[GStyle.posRowBetween,GStyle.mgt5]}>
                    <Text style={[GStyle.textPrimary]}>描述：用来搜索</Text>
                    <Text style={[GStyle.textPrimary]}>最后上线：07-16 06:41</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _footerView(){
        return(
            <View style={[{height: 15}]}/>
        )
    }

    _onRefresh(){
       this.setState({
           miners: [
               {
                   id: 'ed1754d2e3b466763a99f248b02df1cc',
                   status: 'ON',
                   mineStatus: 'ON',
                   stakeStatus: 'Y'
               },
               {
                   id: '1a79c3555ce2f24dfeb5e6c7fbfd38ba',
                   status: 'ON',
                   mineStatus: 'OFF',
                   stakeStatus: 'Y'
               },
               {
                   id: '5cd718cdf706dc3072be3875b4a076f4',
                   status: 'OFF',
                   mineStatus: 'OFF',
                   stakeStatus: 'N'
               }
           ]
       })
    }

    _checkMore(){
        this.pageIndex++;
        this.setState({
            miners: this.state.miners.concat(
                {
                    id: 'ed1754d2e3b466763a99f248b02df1cc',
                    status: 'ON',
                    mineStatus: 'ON',
                    stakeStatus: 'Y'
                },
                {
                    id: '1a79c3555ce2f24dfeb5e6c7fbfd38ba',
                    status: 'ON',
                    mineStatus: 'OFF',
                    stakeStatus: 'Y'
                },
                {
                    id: '5cd718cdf706dc3072be3875b4a076f4',
                    status: 'OFF',
                    mineStatus: 'OFF',
                    stakeStatus: 'N'
                },
            )
        })
    }

    _getList(){

    }

    render(){
        return (
            <View style={ [GStyle.container,{backgroundColor: '#f2f2f2'}] }>
                <ImageBackground source={require('../../../res/image/sky.png')} style={[{width: '100%', height: 100},GStyle.pd20]}>
                    <View style={[GStyle.row, GStyle.mgt15]}>
                        <View style={[styles.logo, GStyle.mgl10]}>
                            <Image style={ [styles.logo] } source={require('../../../res/image/miner_w.png')}></Image>
                        </View>
                        <View style={[GStyle.flex12, GStyle.logoHeight,GStyle.mgl10,GStyle.rowCenter]}>
                            <Text style={[GStyle.textDarkX]}> </Text>
                            <Text style={[GStyle.textWhite,GStyle.textMd]}>矿机<Text style={[GStyle.textDarkX, GStyle.textXl]}> 4</Text> 台， 在线<Text style={[GStyle.textDarkX, GStyle.textXl]}> 0</Text> 台</Text>
                        </View>
                        <View style={[GStyle.posCT, GStyle.row,GStyle.logoHeight,GStyle.mgl10]}>
                            <TouchableOpacity activeOpacity={.5} onPress={()=>this.goToBindMiner()} style={[styles.addWrap,GStyle.posCC, GStyle.row]}>
                                <Icon name='md-add' size={22} color={Colors.white}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                <View style={[styles.ctrBar]}>
                </View>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    data={this.state.miners}
                    extraData={this.state}
                    renderItem={this._renderItem.bind(this)}
                    ListFooterComponent={this._footerView}
                    ListHeaderComponent={this._footerView}
                    onEndReachedThreshold={0.01}
                    onEndReached={this._checkMore.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#333"
                            title="Loading..."
                            titleColor="#333"
                            colors={['#333', '#333', '#333']}
                            progressBackgroundColor="#fff"
                        />
                    }
                />
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
        height: 37
    },
    ctrBar: {
        height: 50,
        backgroundColor: '#ddd'
    },
    itemView: {
        height: 110,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#ddd',
        elevation: 3,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    addWrap: {
        width: 30,
        height: 30,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#fff'
    }
});

export default PageWrap(Miner)
