import React from 'react';
import {
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

export default class Prompt extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        tip: PropTypes.string,
        visible: PropTypes.bool,
        isPwd: PropTypes.bool,
        defaultValue: PropTypes.string,
        onCancel: PropTypes.func,
        onSubmit: PropTypes.func,
        textInputProps: PropTypes.object,
    };

    static defaultProps = {
        visible: false,
        isPwd: true,
        defaultValue: '',
    };

    state = {
        value: '',
        isPwd: false,
        visible: false,
    };

    componentDidMount() {
        this.setState({
            visible: !!this.props.visible,
            value: this.props.defaultValue, 
            isPwd: !!this.props.isPwd
        });
        console.log(" prompt did mount: " + this.state.visible);
    }

    componentWillReceiveProps(nextProps) {
        const { visible, isPwd, defaultValue } = nextProps;
        this.setState({ visible, isPwd, value:defaultValue});
        console.log(" prompt will receive: " + visible);
    }

    _onSubmitPress = ()=>{
        const { value } = this.state;
        this.props.onSubmit && this.props.onSubmit(value);
    };

    _onCancelPress = ()=>{
        this.setState({visible: false});
        this.props.onCancel && this.props.onCancel();
    };

    _close = ()=>{
        this.setState({visible: false});
    };

    render() {
        console.log("-=-=-==- prompt: " + this.state.visible);
        const {
            visible,
            title,
            tip,
            defaultValue
        } = this.props;
        return (
            <Modal onRequestClose={()=>{}} transparent={true} visible={this.state.visible}>
                <View style={[GStyle.flex12, GStyle.bgTransp, {justifyContent: 'center'}]}>
                    <View style={[GStyle.mg25, GStyle.pd25, GStyle.pdb10, GStyle.bgUnder, GStyle.bdRadius]}>
                        <Text style={[GStyle.textLight]}>{ title }</Text>
                        <TextInput
                            style={[GStyle.input]}
                            defaultValue={defaultValue}
                            onChangeText={(vale) => this.setState({vale})}
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                            secureTextEntry={this.state.isPwd}
                            {...this.props.textInputProps}/>
                        <Text style={[GStyle.textMiddle, GStyle.mgt10, GStyle.textSm]}>{ tip }</Text>
                        <View style={[GStyle.posRowAround, GStyle.mgt10]}>
                            <TouchableOpacity onPress={this._onCancelPress}>
                                <View style={[GStyle.pdh15, GStyle.pdv5]}>
                                    <Text style={[GStyle.textLight]}>
                                        {I18n.t("btn_no")}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._onSubmitPress}>
                                <View style={[GStyle.pdh15, GStyle.pdv5]}>
                                    <Text style={[GStyle.textPrimary]}>
                                        {I18n.t("btn_yes")}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
};


const styles = StyleSheet.create({
    content: {

    }
});
