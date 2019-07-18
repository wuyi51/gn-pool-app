import React from 'react';
import {
    View,
    TouchableWithoutFeedback
} from "react-native";

const dismissKeyboard = require('dismissKeyboard')
global.AutoHideKeyboard = (WrappedComponent) => class AutoHideKeyboard extends React.Component {
    render() {
        return (
            <TouchableWithoutFeedback style={{flex:1}} onPress={dismissKeyboard}>
                <View style={{flex:1}}>
                    <WrappedComponent {...this.props}/>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
