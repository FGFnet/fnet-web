import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { Colors } from '../../constants'
import { basicStyles, Header, StyledDivider } from '../../components';
import {useNavigation} from '../../providers';

export default function SettingScreen() {
    const navigation = useNavigation();

    return(
        <ScrollView>
            <View style={basicStyles.container}>
                <Header title='설정'/>
                <StyledDivider/>
                <List.Section style={styles.list}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('FGList',{})
                        }}
                    >
                        <List.Item title="FG List"
                            titleStyle={styles.list_item_title}
                            style={styles.list_item}
                            right={() => <List.Icon color={Colors.darker} icon="chevron-forward-outline" />}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('FreshmenList',{})
                        }}
                    >
                        <List.Item title="Freshmen List"
                            titleStyle={styles.list_item_title}
                            style={styles.list_item}
                            right={() => <List.Icon color={Colors.darker} icon="chevron-forward-outline" />}/>
                    </TouchableOpacity>
                </List.Section>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        width: '100%'
    },
    list_item: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.light
    },
    list_item_title: {
        color: Colors.darker
    }
});