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
    TextInput,
    FlatList, RefreshControl
} from "react-native";


class MyRecommend extends React.Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            list: [
                {name: 'wangcao1'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'}
            ]
        }

        this._title = "我推荐的会员";
        this._backNav = -1;
        this.pageIndex = 1;
    }


    componentDidMount(){
    }

    _keyExtractor = (item, index) => index;

    _renderItem({item}){
        return (
            <View style={[GStyle.posRowBetween,GStyle.mgb10,GStyle.mgt10]}>
                <View style={[GStyle.center,GStyle.mgl15,GStyle.flex4]}>
                    <Text style={[GStyle.textPrimary]}>{item.name}</Text>
                </View>
                <View style={[GStyle.center,GStyle.flex4]}>
                    <Text style={[GStyle.textPrimary,GStyle.center]}>0 GB</Text>
                </View>
                <View style={[GStyle.center,GStyle.mgr15,GStyle.flex4]}>
                    <Text style={[GStyle.textPrimary,GStyle.right]}>0 人</Text>
                </View>
            </View>
        )
    }

    _checkMore(){
        this.pageIndex++;
        this.setState({
            list: this.state.list.concat(
                {name: 'wangcao1'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'},
                {name: 'wangcao'}
            )
        })
    }

    render(){
        return (
            <View style={ [GStyle.container,{backgroundColor: '#F6F6F6'}] }>
                <ImageBackground source={require('../../../res/image/sky.png')} style={[{width: '100%', height: 110},GStyle.pd20]}>
                    <View style={[GStyle.row, GStyle.mgt20]}>
                        <View style={[GStyle.flex12, GStyle.logoHeight,GStyle.mgl10,GStyle.rowCenter]}>
                            <Text style={[GStyle.textDarkX]}>用户昵称：荒野大镖客</Text>
                            <Text style={[GStyle.textDarkX,GStyle.mgt5]}>有效算力: 0 GB</Text>
                        </View>
                        <View style={[GStyle.posCT, GStyle.row,GStyle.logoHeight,GStyle.mgl10]}>
                            <Text style={[GStyle.textDarkX,GStyle.mgt20]}>会员总数：0 人</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={[styles.listWrap,GStyle.mgt20,GStyle.mgl20,GStyle.mgr20]}>
                    <View style={[styles.listTop,GStyle.posRowBetween]}>
                        <View style={[GStyle.center,GStyle.mgl15]}>
                            <Text style={[GStyle.textWhite]}>用户昵称</Text>
                        </View>
                        <View style={[GStyle.center]}>
                            <Text style={[GStyle.textWhite]}>有效算力</Text>
                        </View>
                        <View style={[GStyle.center,GStyle.mgr15]}>
                            <Text style={[GStyle.textWhite]}>会员总数</Text>
                        </View>
                    </View>
                    <View style={[{maxHeight: WINDOWS_HEIGHT - 290}]}>
                        <FlatList
                            keyExtractor={this._keyExtractor}
                            data={this.state.list}
                            extraData={this.state}
                            renderItem={this._renderItem.bind(this)}
                            onEndReachedThreshold={0.01}
                            onEndReached={this._checkMore.bind(this)}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logoHeight: {
        height: 60
    },
    listWrap: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#ddd',
        elevation: 3,
        overflow: 'hidden'
    },
    listTop: {
        backgroundColor: '#253054',
        height: 45
    }

});

export default PageWrap(MyRecommend)
