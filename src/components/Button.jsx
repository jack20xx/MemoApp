import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { func, string, shape } from 'prop-types';

export default function Button(props) {
    const { label, onPress, style } = props;
    return (
        // ２つ目にstyleを指定することで、親で変更できる。
        <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
            <Text style={styles.buttonLabel}>{label}</Text>
        </TouchableOpacity>
    );
}

Button.propTypes = {
    label: string.isRequired,
    onPress: func,
    style: shape(),
};

Button.defaultProps = {
    onPress: null,
    style: null,
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#467fd3',
        borderRadius: 4,
        // テキストに合わせてボックスが調整される。
        alignSelf: 'flex-start',
        marginBottom: 24,
    },
    buttonLabel: {
        fontSize: 16,
        lineHeight: 32,
        paddingHorizontal: 32,
        paddingVertical: 8,
        color: '#ffffff',
    },
});
