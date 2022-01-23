import React from 'react';
import { withTheme, Divider } from 'react-native-paper';

function StyledDivider(props) {
    return(
        <Divider
            style={{
                width: '100%', 
                height: 0.5, 
                marginTop: '5%',
                marginBottom: '5%'
            }}
        />
    );
}

export default withTheme(StyledDivider);
