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
    StyleSheet
} from "react-native";



class Miner extends React.Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
        this.state = {

        }
        this.lastBackPress = 0;  //再按一次退出

        this._title = "矿机";
        this._menu = true;
    }


    componentDidMount(){
    }
    render(){
        return (
            <View style={ [GStyle.container, GStyle.pd10] }>
                <Text style={ [GStyle.textLight, GStyle.textBold, GStyle.center] }>
                    这里什么都没有
                </Text>
            </View>
        );
    }
}
export default PageWrap(Miner)
