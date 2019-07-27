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



class News extends React.Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
        this.state = {

        }
        this.lastBackPress = 0;  //再按一次退出

        this._title = "银河动态";
        this._menu = true;
    }


    componentDidMount(){
    }
    render(){
        return (
            <View style={ [GStyle.container, GStyle.pd10] }>
                <Text style={ [GStyle.textMiddle, GStyle.textBold, GStyle.center,GStyle.mgt25] }>
                    银河动态即将上线，敬请期待
                </Text>
            </View>
        );
    }
}
export default PageWrap(News)
