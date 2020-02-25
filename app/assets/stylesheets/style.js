import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    containerForActivityIndicator: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    appbarText: {
        fontSize: 20,
        left: 10,
        color: Colors.white,
    },

    appbar: {
        top: 0,
        left: 0,
        right: 0,
        height: 70
    },
});

export default styles;