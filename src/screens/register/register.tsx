import React, { useState, useEffect } from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Header, InputForm, PaperTable } from '../../components';
import {basicStyles} from '../../components/basic_styles'
import { Colors } from '../../constants';
import api from '../../utils/api';

export default function RegisterScreen() {
    const checkboxKey = 'register'
    const [tableData, updateTableData] = React.useState([])
    const [searchQuery, setSearchQuery] = React.useState('')
    const [loading, setLoading] = useState(false);

    async function fetchUsers () {
        try {
            setLoading(true)
            const res = await api.getFreshmanList()
            updateTableData(res.data.data)
        } catch (err) {
            alert(err)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const tableHeader = {'#': 'index',
                        '이름': 'name',
                        '전화번호': 'phone_number',
                        'LC': 'lc',
                        '접수': 'register'}

    const onChangeSearch = (query) => {
        setSearchQuery(query)
    }

    async function onSubmit () { // search by freshman name
        try {
            setLoading(true)
            const res = await api.searchFreshman(searchQuery)
            updateTableData(res.data.data)
        } catch (err) {
            alert(err)
        }
        setLoading(false)
    }

    async function Register (id) {
        try {
            await api.registerFreshman({'id': id})
            if (!!searchQuery) {
                await onSubmit()
            } else {
                await fetchUsers()
            }
        } catch (err) {
            alert(err)
        }
    }

    return(
        <ScrollView nestedScrollEnabled = {true}>
            <View style={basicStyles.container}>
                <View style={styles.header}>
                    <Header title='접수' marginBottom={0}/>
                    <View style={styles.searchBar}>
                        <InputForm
                            style={{width: '80%'}}
                            height={35}
                            value={searchQuery}
                            onChangeText={onChangeSearch}
                            multiline={false}
                            onSubmitEditing={onSubmit}
                            placeholder='이름'
                        />
                        <Icon
                            style={styles.inputIcon}
                            name="search-outline"
                            color={Colors.light}
                            size={18}
                        />
                    </View>
                </View>

                <View style={{width: '100%'}}>
                    <PaperTable
                        header={tableHeader}
                        data={tableData}
                        checkboxKey={checkboxKey}
                        toggleFunc={Register}
                        loading={loading}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    searchBar: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    inputIcon: {
        position: 'absolute',
        paddingRight: 10
    },
});