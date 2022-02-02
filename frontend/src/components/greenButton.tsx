import React from 'react';
import {Colors} from '../constants';
import { withTheme, Button } from 'react-native-paper';
import {View} from 'react-native';

function GreenButton(props) {
    return(
        <View style = {props.viewStyle}>
            <Button
                labelStyle={{
                    color: Colors.darker,
                    backgroundColor: Colors.primary_lighter,
                    fontWeight: 'bold',
                    paddingLeft: 5,
                    paddingRight: 14
                }}
                onPress={props.press}
                uppercase={false}
            > {props.text} </Button>
        </View>
    );
}

export default withTheme(GreenButton);
