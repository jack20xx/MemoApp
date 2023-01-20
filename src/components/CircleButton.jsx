import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { string, shape, func } from 'prop-types';

import Icon from './Icon';

export default function CircleButton(props) {
    // 子でもstyleの上書きができるようにpropsに渡す→propTypesの指定→オプショナルなので、デフォルト値を指定
    // nameを作り、プラス以外にもアイコンを自由に指定できるようにする。
    // onPressはTouchableOpacityに入っているプロパティで、それをpropsに渡すことで押す機能が他のjsxで使えるようになる。
    const { style, name, onPress } = props;
    return (
        <TouchableOpacity style={[styles.circleButton, style]} onPress={onPress}>
            <Icon name={name} size={40} color="white" />
        </TouchableOpacity>
    );
}

CircleButton.propTypes = {
    style: shape(),
    name: string.isRequired,
    onPress: func,
};

CircleButton.defaultProps = {
    style: null,
    onPress: null,
};

const styles = StyleSheet.create({
    circleButton: {
        backgroundColor: '#467fd3',
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 40,
        bottom: 40,
        shadowColor: '#000000',
        // 影の設定
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        // figmaのblurと同じ設定だと薄すぎてしまうので注意。
        shadowRadius: 8,
        // shadowの設定はiOSのみ。androidは下記が必要で、androidにしかない。
        elevation: 8,
    },
    circleButtonLabel: {
        color: '#ffffff',
        fontSize: 40,
        lineHeight: 40,
    },
});
