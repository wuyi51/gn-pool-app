import React from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import PropTypes from 'prop-types';
import _ from 'lodash';
import Setting from '../utils/Setting';


if(_.isEmpty(Setting.get('currency'))) Setting.set("currency",Config.currency || 'USD');

export default class Money extends React.Component{
    static propTypes = {
        symbol: PropTypes.string,
        amount: PropTypes.number,
        style: PropTypes.object,
        convert: PropTypes.bool,
        money: PropTypes.bool
    };

    static defaultProps = {
        symbol: '',
        amount: 0,
        style: {},
        convert: false,
        money : false
    };

    constructor(props){
        super(props);
    }

    render(){
        const {
            symbol,
            amount,
            style,
            convert,
            money
        } = this.props;
        let smallStyle = _.clone(StyleSheet.flatten(style));
        smallStyle.fontSize = (smallStyle.fontSize || StyleSheet.flatten(GStyle.textXxxl).fontSize) * 0.7;

        let _symbol = symbol;
        let _realAmount = amount;

        if(convert){
            let currency = Setting.get('currency');
            if(!money)_realAmount = EthUtils.convertProp(_symbol,_realAmount);
            _symbol = currency == 'RMB' ? "￥" : "$";

        }

        let _amount = (_realAmount + "").split('.');
        let _int = _amount[0];

        let _length = 4;
        if(_symbol == "￥" || _symbol == "$")_length = 2;
        let _dec = _.padEnd(_amount[1] || '0', _length, '0').substr(0, _length);

        return (
            <View style={{flexDirection: "row"}}>
                <Text style={[GStyle.textFore, style]}>{_symbol ? _symbol + ' ' : ''}{_int}.</Text>
                <Text style={[GStyle.textFore, style]}>{_dec}</Text>
            </View>
        );
    }
}
