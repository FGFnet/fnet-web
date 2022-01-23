import {Colors} from '../constants';
import { StyleSheet, Dimensions } from 'react-native';

const screenSize = Dimensions.get('screen')

export const basicStyles = StyleSheet.create({
    container: {
        margin: '10%',
        flex: 1,
        alignItems: 'flex-start'
    },
    contentText: {
        marginBottom: 8,
    },
    insideContainer: {
        padding: '5%',
        width: '100%'
    },
    insideRowContainer: {
        flexDirection: 'row',
        padding: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paperTable: {
        height: screenSize.height * 0.6,
        textAlign: 'center'
    },
    lightText: {
        color: Colors.light,
        fontSize: 10
    }
})