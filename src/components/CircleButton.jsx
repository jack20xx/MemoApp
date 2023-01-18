import React from 'react';
import { StyleSheet, View } from 'react-native';
import { string, shape } from 'prop-types';
import { Feather } from '@expo/vector-icons'; 

export default function CircleButton(props) {
    // 子でもstyleの上書きができるようにpropsに渡す→propTypesの指定→オプショナルなので、デフォルト値を指定
    // nameを作り、プラス以外にもアイコンを自由に指定できるようにする。
    const { style, name } = props;
    return (
        <View style={[styles.circleButton, style]}>
            <Feather name={name} size={32} color="white" />
        </View>
    );
}

CircleButton.propTypes = {
    style: shape(),
    name: string.isRequired,
};

CircleButton.defaultProps = {
    style: null,
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
