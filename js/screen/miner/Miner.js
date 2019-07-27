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
    RefreshControl,
    TextInput
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FAIcon from 'react-native-vector-icons/FontAwesome';



class Miner extends React.Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            isRefreshing: false,
            status: 0,
            mining: 0,
            stake: 0,
            search_type: 0,
            keywords: '',
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

    changeStatus(){
        if(this.state.status === 0){
            this.setState({
                status: 1
            })
        }else if(this.state.status === 1){
            this.setState({
                status: 2
            })
        }else if(this.state.status === 2){
            this.setState({
                status: 0
            })
        }
    }

    changeMining(){
        if(this.state.mining === 0){
            this.setState({
                mining: 1
            })
        }else if(this.state.mining === 1){
            this.setState({
                mining: 2
            })
        }else if(this.state.mining === 2){
            this.setState({
                mining: 0
            })
        }
    }

    changeStake(){
        if(this.state.stake === 0){
            this.setState({
                stake: 1
            })
        }else if(this.state.stake === 1){
            this.setState({
                stake: 2
            })
        }else if(this.state.stake === 2){
            this.setState({
                stake: 0
            })
        }
    }

    _changeSearchType(){
        this.setState({
            search_type: this.state.search_type === 0 ? 1 : 0
        })
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
                <View style={[styles.ctrBar,GStyle.posRowBetween,GStyle.mgl15,GStyle.mgr15]}>
                    {
                        this.state.search_type === 0 ?
                            <TouchableOpacity onPress={()=>this.changeStatus()} activeOpacity={.5}
                                              style={[styles.status_bar,
                                                  this.state.status === 0 ?
                                                      styles.bgInfo
                                                      :
                                                      this.state.status === 1 ?
                                                          styles.bgGreen
                                                          :
                                                          styles.bgRed
                                              ]}
                            >
                                {
                                    this.state.status === 0 ?
                                        <Text style={[GStyle.textBlack]}>状态</Text>
                                        :
                                        this.state.status === 1 ?
                                            <Text style={[styles.textGreen]}>在线</Text>
                                            :
                                            <Text style={[GStyle.textError]}>离线</Text>

                                }
                            </TouchableOpacity>
                            :
                            <View/>
                    }
                    {
                        this.state.search_type === 0 ?
                            <TouchableOpacity onPress={()=>this.changeMining()} activeOpacity={.5}
                                              style={[styles.status_bar,
                                                  this.state.mining === 0 ?
                                                      styles.bgInfo
                                                      :
                                                      this.state.mining === 1 ?
                                                          styles.bgGreen
                                                          :
                                                          styles.bgRed
                                              ]}
                            >
                                {
                                    this.state.mining === 0 ?
                                        <Text style={[GStyle.textBlack]}>挖矿</Text>
                                        :
                                        this.state.mining === 1 ?
                                            <Text style={[styles.textGreen]}>挖矿中</Text>
                                            :
                                            <Text style={[GStyle.textError]}>未挖矿</Text>

                                }
                            </TouchableOpacity>
                            :
                            <View/>
                    }

                    {
                        this.state.search_type === 0 ?
                            <TouchableOpacity onPress={()=>this.changeStake()} activeOpacity={.5}
                                              style={[styles.status_bar,
                                                  this.state.stake === 0 ?
                                                      styles.bgInfo
                                                      :
                                                      this.state.stake === 1 ?
                                                          styles.bgGreen
                                                          :
                                                          styles.bgRed
                                              ]}
                            >
                                {
                                    this.state.stake === 0 ?
                                        <Text style={[GStyle.textBlack]}>押注</Text>
                                        :
                                        this.state.stake === 1 ?
                                            <Text style={[styles.textGreen]}>已押注</Text>
                                            :
                                            <Text style={[GStyle.textError]}>未押注</Text>

                                }
                            </TouchableOpacity>
                            :
                            <View/>
                    }

                    {
                        this.state.search_type === 0 ?
                            <View/>
                            :
                            <View style={[styles.searchView]}>
                                <FAIcon name="search" size={16}></FAIcon>
                                <TextInput
                                    underlineColorAndroid={'transparent'}
                                    placeholder={'设备描述'}
                                    style={[GStyle.flex12,styles.searchInput]}
                                    onChangeText={(keywords) => this.setState({keywords})}
                                    value={this.state.keywords}
                                    />
                            </View>
                    }



                    <View style={[styles.status_bar]}>
                        <Text style={[GStyle.textBlack]}>搜索</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{this._changeSearchType()}} activeOpacity={.5} style={[styles.status_bar_change]}>
                        <Icon name='md-arrow-dropdown' size={22} color={Colors.black}></Icon>
                    </TouchableOpacity>
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
        alignItems: 'center'
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
    },
    status_bar: {
        width: 60,
        height: 30,
        backgroundColor: 'rgb(213,213,213)',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgb(213,213,213)'
    },
    status_bar_change: {
        width: 20,

    },
    textGreen: {
        color: '#15a200'
    },
    bgInfo: {
        backgroundColor: 'rgb(213,213,213)',
        borderColor: 'rgb(213,213,213)'
    },
    bgGreen: {
        backgroundColor: 'rgba(21,162,0,0.2)',
        borderColor: 'rgba(21,162,0,1)'
    },
    bgRed: {
        backgroundColor: 'rgba(221,83,54,0.2)',
        borderColor: 'rgba(221,83,54,1)'
    },
    searchView: {
        width: WINDOWS_WIDTH - 150,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#ddd',
        elevation: 3,
        backgroundColor: '#fff',
        borderRadius: 35,
        marginRight: 10,
        height: 35,
        flexDirection: 'row',
        alignItems:'center',
        paddingLeft: 10

    },
    searchInput: {
        height: 30,
        padding: 0,
        marginLeft: 10
    }
});

export default PageWrap(Miner)
