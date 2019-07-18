import React from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import PropTypes from 'prop-types';

export default class Norecord extends React.Component{
    static propTypes = {
        text: PropTypes.string,
        style: PropTypes.any,
        outStyle: PropTypes.any
    };

    static defaultProps = {
        text: "没有记录",
        style: {},
        outStyle: {}
    };

    constructor(props){
        super(props);
    }

    render(){
        const {
            text,
            style,
            outStyle
        } = this.props;
        let _style = StyleSheet.flatten(style);
        let _outStyle = StyleSheet.flatten(outStyle);

        return (
            <View style={[GStyle.posCC, GStyle.pd25, _outStyle]}>
                <Text style={[GStyle.textMiddle, GStyle.textLg, _style]}>{text}</Text>
            </View>
        );
    }
}
