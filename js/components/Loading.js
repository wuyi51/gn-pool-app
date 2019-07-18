import React from 'react';
import PropTypes from 'prop-types';

import {
    StyleSheet,
    Dimensions,
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import CircleProgress from './CircleProgress'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default  class Loading extends React.Component {

    static LOADING_WIDTH = 100;
    static LOADING_HEIGHT = 80;

    static defaultProps = {
        pointerEvents: false,
        timeout: 0,
    };
    static propTypes = {
        text: PropTypes.string,
        textStyle: PropTypes.any,
        pointerEvents: PropTypes.bool,
        bottomStyle: PropTypes.any,
        loadingStyle: PropTypes.any,
        timeout: PropTypes.number,
        onLoadingTimeout: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.isShown = false;
        this.state = {
            loading: (<View />),
        }
        this.offsetX = 0;
        this.offsetY = 0;
        this.timeout = props.timeout;
        this.onLoadingTimeout = props.onLoadingTimeout;
        this.timeoutEvent = undefined;

    }

    render() {
        return this.state.loading;
    }

    show(text, pointerEvents) {
        if (!this.isShown) {
            if (typeof(text) === 'boolean') {
                pointerEvents = text;
                text = '';
            }
            text = text ? text : this.props.text;
            this.setState({
                loading: this._getLoading({
                    ...this.props,
                    text: text,
                    pointerEvents: pointerEvents
                })
            });
            if (this.timeout > 0) {
                this.timeoutEvent = setTimeout(() => {
                    if (this.isShown) {
                        this.dismiss();
                        this.onLoadingTimeout && this.onLoadingTimeout();
                    }
                }, this.timeout);
            }
            this.isShown = true;
        }
    }

    dismiss() {
        if (this.isShown) {
            this.setState({
                loading: (<View />)
            });
            this.isShown = false;
            this.timeoutEvent && clearInterval(this.timeoutEvent);
        }
    }

    setLoadingOffset(x, y) {
        this.offsetX = x;
        this.offsetY = y;
        return this;
    }

    setLoadingTimeout(timeout, onLoadingTimeout) {
        this.timeout = timeout;
        this.onLoadingTimeout = onLoadingTimeout;
        return this;
    }

    clearLoadingTimeout() {
        this.timeout = 0;
        this.onLoadingTimeout = undefined;
    }

    isShown() {
        return this.isShown;
    }

    _getLoading(props) {
        let offsetStyle = {};
        if (this.offsetY !== 0 || this.offsetX !== 0) {
            offsetStyle.top = SCREEN_HEIGHT / 2 + this.offsetY / 2 - Loading.LOADING_HEIGHT / 2;
            offsetStyle.left = SCREEN_WIDTH / 2 + this.offsetX / 2 - Loading.LOADING_WIDTH / 2;
        }
        return (
            <View pointerEvents={!!props && props.pointerEvents ? 'none' : 'auto'} style={styles.container}>
                <View style={[styles.loadingBody]}>
                    <CircleProgress />
                    <Text style={[styles.loadingText, props.textStyle]}>
                        {!!props && props.text ? props.text : 'Loading...'}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff2',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingBody: {
        width: 100,
        height: 80,
        borderRadius: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        color: 'white',
        backgroundColor: 'transparent',
        marginTop: 5
    }
});

