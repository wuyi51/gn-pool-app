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

import SplashScreen from  'react-native-splash-screen';
import Loading from "../../components/Loading";
import ProgressBar from "../../components/ProgressBar";
import Setting from '../../utils/Setting'
import Icon from 'react-native-vector-icons/Ionicons';


import _ from 'lodash';


class DemoScreen extends React.Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            loading: false,
            progress: 50
        }
        this.lastBackPress = 0;  //再按一次退出

        this._title = "Demo2 Page";
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
export default PageWrap(DemoScreen)
