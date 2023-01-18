import React from 'react';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { useFonts } from '@use-expo/font';
import { number, string, oneOf } from 'prop-types';

import icomoon from '../../assets/fonts/icomoon.ttf';
import selection from '../../assets/fonts/selection.json';

export default function Icon(props) {
    // iconが読み込まれたか判断するためのloaded
    const [fontLoaded] = useFonts({ icomoon });
    const { name, size, color } = props;
    const CustomIcon = createIconSetFromIcoMoon(selection);
    if (!fontLoaded) {
        return null;
    }
    return <CustomIcon name={name} size={size} color={color} style={{ lineHeight: size - 1 }} />;
}

Icon.propTypes = {
    // ４つの中からしか選べないような設定にしておくと、違う値が入るのを防げる。
    name: oneOf(['plus', 'delete', 'pencil', 'check']).isRequired,
    size: number,
    color: string,
};

Icon.defaultProps = {
    size: 24,
    color: '#000000',
};
