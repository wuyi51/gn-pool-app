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


class Recommend extends React.Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            keys: ''
        }

        this._title = "绑定推荐";
        this._backNav = -1;
    }


    componentDidMount(){
    }

    barcodeReceived(){

    }

    render(){
        return (
            <View style={ [GStyle.container,{backgroundColor: '#F6F6F6'}] }>
                <ImageBackground source={require('../../../res/image/sky.png')} style={[{width: '100%', height: 120},GStyle.pd20]}>

                </ImageBackground>
                <View style={[styles.InputWrap,GStyle.row,GStyle.mgt20,GStyle.mgl20,GStyle.mgr20]}>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        placeholder={'客户端ID'}
                        style={[GStyle.flex12,GStyle.center]}
                        onChangeText={(keys) => this.setState({keys})}
                        value={this.state.keys}
                    />
                    <View style={[GStyle.center]}>
                        <Image style={ [styles.scan] } source={require('../../../res/image/camera.png')}></Image>
                    </View>
                </View>
                <View style={[styles.submitBtn,GStyle.center,GStyle.mgt20,GStyle.posCC]}>
                    <Text style={[GStyle.textWhite]}>推荐绑定</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    InputWrap: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#ddd',
        elevation: 3,

    },
    scan: {
        width: 38,
        height: 38
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

export default PageWrap(Recommend)
