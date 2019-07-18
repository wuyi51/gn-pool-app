import React from 'react';
import {
    Animated,
    Easing,
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    Platform,
    BackHandler
} from 'react-native';

import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

export default class ScanQRCodeScreen extends React.Component {

    static Id = {
        ID_IMPORT_KEYSTORE: 0,
        ID_IMPORT_MNEMONIC: 1,
        ID_IMPORT_PRIVATE_KEY: 2,
        ID_IMPORT_WATCH: 3,
        ID_SEND_SCREEN_HEADER: 4,
        ID_CREATE_CONTACT: 5,
        ID_EDIT_CONTACT: 6,
    };

    static navigationOptions = ({navigation}) => ({
        tabBarVisible: false,
        header: null,
    });

    constructor(props) {
        super(props);
        this.state = {
            moveAnim: new Animated.Value(-200),
            random:_.random()
        };
        this.title = '扫描';
        this._onBackPress = this._onBackPress.bind(this);

        this.runAnimation = true;
    }

    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this._onBackPress);
    }

    componentWillUnmount() {
        this.runAnimation = false;
        BackHandler.removeEventListener('hardwareBackPress', this._onBackPress);
    }

    componentDidMount() {
        this.startAnimation();
        //this.onBarCodeRead('123');
    }

    componentWillReceiveProps(){

    }

    _onBackPress(){
        this.props.navigation.goBack();
        return true;
    }

    startAnimation = () => {
        if(!this.runAnimation) return;
        this.state.moveAnim.setValue(-200);
        Animated.timing(
            this.state.moveAnim,//初始值
            {
                toValue: 0,
                duration: 1500,
                easing: Easing.linear
            }//结束值
        ).start(() => this.startAnimation());//开始
    };

    onBarCodeRead = (result) => {
        let id = this.props.navigation.state.params.id;
        let screen = this.props.navigation.state.params.screen;
        let data = result.data;

        console.log(id, data);
        this.props.navigation.state.params.callback(id, data);
        //this.props.navigation.goBack();
        if(_.isEmpty(screen)){
            this.props.navigation.goBack();
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Camera
                    style={styles.preview}
                    onBarCodeRead={this.onBarCodeRead}>
                    <View style={styles.rectangleContainer}>
                        <View style={styles.rectangle}/>
                        <Animated.View style={[
                            styles.border,
                            {transform: [{translateY: this.state.moveAnim}]}]}/>
                    </View>
                </Camera>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {this.props.navigation.goBack()}}>
                        <Icon name="ios-arrow-dropleft-circle-outline" size={40} color="#fff8"></Icon>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        //justifyContent: 'center',        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        //height: Platform.OS === 'ios' ? 68 : 56,
        //alignItems: 'center',
        position: 'absolute',
        top: 35,
        left: 25
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: 200,
        height: 2,
        backgroundColor: '#00FF00',
    }
});
