import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    LayoutAnimation,
}  from 'react-native';

export default class ProgressBarClassic extends React.Component {
    constructor() {
        super();
        this.state = {
            progress: 0,
            init_animation: false,
        }
    }

    componentDidMount() {
        LayoutAnimation.spring();
        this.setState({progress: this.props.progress});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({progress: nextProps.progress});
    }

    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    render() {
        let value = false;
        let valueBalloon = false;
        let label = false;
        let marginTop = 0;

        switch (this.props.valueStyle) {
            case 'balloon':
                valueBalloon = (
                    <View style={styles.flexBox}>
                        <View style={[{flex:this.state.progress}]}>
                            <View style={styles.progressBar__balloon}>
                                <View style={styles.progressBar__balloonArrow}/>
                                <Text style={styles.progressBar__balloonVal}>{this.state.progress}%</Text>
                            </View>
                        </View>
                        <View style={[{flex: 100 - this.state.progress}]}/>
                    </View>
                );
                marginTop = 30;

                break;
            case 'none':
                break;
            default:
                value = (
                    <View style={styles.progressBar_mes}>
                        <Text style={styles.progressBar__val}>{this.state.progress}%</Text>
                    </View>
                );
                break
        }

        if (this.props.valueStyle !== 'balloon' && this.props.label) {
            marginTop = 20;
            label = (
                <View style={styles.labelWrap}>
                    <Text style={styles.label}>{this.props.label} {this.props.value && `: ${this.props.value}` }</Text>
                </View>
            )
        }

        return (
            <View>
                {valueBalloon}
                {label}
                <View style={[styles.flexBox, styles.progressBar]}>
                    <View style={[styles.progressBar_left, {flex: this.state.progress}]}>
                        {value}
                    </View>
                    <View style={[styles.progressBar_right, {flex: 100 - this.state.progress}]}/>
                </View>

            </View>
        );
    }
}

ProgressBarClassic.defaultProps = {
    progress: 0,
};

const styles = StyleSheet.create({
    flexBox: {
        height: 2,
        flexDirection: 'row',
    },
    progressBar: {
        overflow: 'hidden',
        marginHorizontal: 20,
        height: 2,
        backgroundColor: '#cfcfcf',
    },
    progressBar_left: {
        backgroundColor: '#2286fc',
    },
    progressBar_right: {
        backgroundColor: '#cfcfcf',
    },
    progressBar_mes: {
        position: 'absolute',
        right: 0,
        paddingRight: 5,
        backgroundColor: 'rgba(0,0,0,0)',
        flexDirection: 'row',
    },
    progressBar__balloon: {
        position: 'absolute',
        padding: 3,
        right: -15,
        backgroundColor: '#2286fc',
        borderRadius: 2,
        paddingRight: 5,
        flexDirection: 'row',
    },
    progressBar__balloonArrow: {
        position: 'absolute',
        bottom: -10,
        right: 0,
        backgroundColor: '#2286fc',
        borderRadius: 30,
        width:30,
        height:30,
    },
    progressBar__val: {
        color: '#fff',
    },
    progressBar__balloonVal: {
        textAlign: 'center',
        color: '#fff',
    },
    labelWrap: {
        position: 'absolute',
        top: 0,
        left: .2,
    },
    label: {
        color: 'rgb(0, 122, 255)',
        paddingHorizontal: 10,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        textAlign: 'center'
    }
});