import { View, Text, StyleSheet } from 'react-native';
// stringで文字列であるという型を示している。
// boolでtrueやfalseなど条件を取る。
// shapeでオブジェクトの形を決める。
import { string, bool, shape } from 'prop-types';

function Hello(props) {
    // childrenにHelloで囲まれたWorldが入ってくる。
    // const children = props.children;
    // 下記のように分割代入すると手間も省ける。また複数の代入も容易。
    const { children, bang, style } = props;
    return (
        <View>
            {/* []配列を使って左側のstyleを右側のstyleで上書きする。 */}
            <Text style={[styles.text, style]}>
                {/* Hello {children} */}
                {/* 改行すれば空白に関するエラーは消えるが、空白がなくなってしまうので、
                ｛｝とバッククォートを使って連結させる。 */}
                {/* bangがtrueであれば左側！falseであれば右側を出す */}
                {`Hello ${children}${bang ? '!' : ''}`}
            </Text>
        </View>
    );
}

// Helloに渡ってくるpropのchildrenはstring型だと示している。
Hello.propTypes = {
    // isRequiredでHelloにはchildrenが必須項目だと指定し、eslintのエラーを消す。
    children: string.isRequired,
    bang: bool,
    style: shape(),
};

// bangをオプショナルな値にするため、デフォルト値を決める。
Hello.defaultProps = {
    bang: false,
    style: null,
};

const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        backgroundColor: 'blue',
        // pxはReactでは省略できる
        fontSize: 40,
        fontWeight: 'bold',
        padding: 16,
    }
});

export default Hello;
