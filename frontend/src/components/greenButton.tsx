import React from 'react';
import {Colors} from '../constants';
import { withTheme } from 'react-native-paper';
import {Text, TouchableOpacity} from 'react-native';

function GreenButton(props) {
    const align = props.align
    return(
        <TouchableOpacity
            onPress={props.press}
            style={{
                margin: 10,
                alignItems: align,
                flex: 1,
                width: '100%'
            }}
        >
            <Text
                style={{
                    color: Colors.darker,
                    backgroundColor: Colors.primary_lighter,
                    fontWeight: 'bold',
                    paddingLeft: 5,
                    paddingRight: 14
                }}
            >{props.text}</Text>
        </TouchableOpacity>
    );
}

export default withTheme(GreenButton);
