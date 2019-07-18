import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    Linking,
    StatusBar,
    BackHandler
} from 'react-native';
import SplashScreen from  'react-native-splash-screen';
import { NavigationActions } from 'react-navigation';

import Setting from '../../utils/Setting'

export default class WelcomeScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            hasLogin: false,
            test: ""
        };
    }
    componentDidMount() {
        SplashScreen.hide();
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBackPress);
    }
    _onBackPress = ()=>{
        console.log('hardwareBackPress', this);
        this.props.navigation.goBack();
        return true;
    }

    render(){
        return (
            <View style={ styles.container }>
                <StatusBar backgroundColor='#fff0' barStyle="dark-content" translucent={true}/>
                <ImageBackground
                    style={ styles.background }
                    imageStyle={{width: window.width, height: window.height}}
                    source={require('../../../res/image/bg.png')} >

                    <Text style={ styles.title }>{I18n.t("app_name")}</Text>
                    <View style={[GStyle.flex12, GStyle.colReverse, GStyle.pdb25]}>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => {this.props.navigation.navigate('AssetHomePage')}}>
                            <Text style={styles.backupText}>{I18n.t("welcome_start")}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );

    }

}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        width: window.width,
        height: window.height,
        alignItems: 'center',
    },
    title: {
        marginTop: window.height * 0.25,
        backgroundColor: 'transparent',
        fontSize: 24,
        color: '#ffffff',
        marginBottom: 50
    },
    button: {
        width: 230,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 19,
        borderRadius: 24,
        backgroundColor: '#85a8f7',
    },
    backupText: {
        color: '#ffffff',
        fontSize: 18,
    },
});