import React from 'react';
import {
    Text,
    View
} from 'react-native';

import PropTypes from 'prop-types';
import _ from 'lodash';

export default class CutHash extends React.Component{
    static propTypes = {
        data: PropTypes.string,
        length: PropTypes.number,
        style: PropTypes.object,
        isLast: PropTypes.bool,
    };

    static defaultProps = {
        data: '',
        length: 6,
        style: {},
        isLast: false
    };

    constructor(props){
        super(props);
    }

    render(){
        const {
            data,
            length,
            style,
            isLast
        } = this.props;

        let finalData = data;

        let dataLength = data.length;
        
        if(isLast){
            if(dataLength > length){
                let start = data.substr(0, length);
                finalData = start + '...';
            }
        }else{
            if(dataLength > length * 2){
                let start = data.substr(0, length);
                let end = data.substr(dataLength-length, dataLength);
                finalData = start + "..." + end;
            }
        }
        
        return (
            <View style={{flexDirection: "row"}}>
                <Text style={[GStyle.textFore, style]}>{finalData}</Text>
            </View>
        );
    }
}
