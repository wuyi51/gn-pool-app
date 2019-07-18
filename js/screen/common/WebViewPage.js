import React from 'react'
import {
    StyleSheet,
    WebView,
    View,
    TouchableOpacity,
    Image,
    Text,
    Share,
    Platform,
    BackHandler
} from 'react-native'

import Icon from 'react-native-vector-icons/SimpleLineIcons';

const WEBVIEW_REF = 'webview';

export default class WebViewPage extends React.Component {

    static navigationOptions = ({navigation}) => ({
        tabBarVisible: false,
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            url: props.navigation.state.params.url,
            title: props.navigation.state.params.title,
        }
        this._onBackPress = this._onBackPress.bind(this);

    }

    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this._onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBackPress);
    }

    _onBackPress(){
        this.props.navigation.goBack();
        return true;
    }

    _share(){
        Share.share({
            url: this.state.url,
            title: this.state.title,
        }).then(result => console.log(result))
            .catch(err => console.log(err))
        ;
    }

    _refresh(){
        this.refs[WEBVIEW_REF].reload();
    }

    render() {
        return (
            <View style={ GStyle.container }>

                <View style={GStyle.header}>
                    <TouchableOpacity onPress={() => {this.props.navigation.goBack()}}>
                        <Icon name="arrow-left" size={18} color={Colors.fore}></Icon>
                    </TouchableOpacity>
                    <View style={[GStyle.flex12]}>
                        <Text style={[GStyle.textLightX, GStyle.center]}>{this.state.title}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {this._refresh()}} style={GStyle.mgr20}>
                        <Icon name="refresh" size={18} color={Colors.middle}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this._share()}}>
                        <Icon name="share" size={18} color={Colors.middle}></Icon>
                    </TouchableOpacity>
                </View>
                <WebView
                    ref={WEBVIEW_REF}
                    startInLoadingState={true}
                    source={{uri: this.state.url}}/>
            </View>
        );
    }
}
