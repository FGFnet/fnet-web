import React from 'react';
import {Colors} from '../constants';
import {Text, View} from 'react-native';

export const Header = (props) => {
    
    var marginBottom = ('marginBottom' in props) ? props.marginBottom : 30

    return(
        <View>
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: marginBottom,
                    backgroundColor: Colors.accent,
                    paddingLeft: 5,
                    paddingRight: 14,
                    color: Colors.darker
                }}
            >{props.title}</Text>
        </View>
    )
}