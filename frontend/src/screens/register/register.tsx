import React, { useState, useEffect } from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import { Header, Table } from '../../components';
import {basicStyles} from '../../components/basic_styles'
import { Colors } from '../../constants';
import api from '../../utils/api';

export default function RegisterScreen() {
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

    const tableHeader = {'index': '#',
                        'name': '이름',
                        'phone_number': '전화번호',
                        'lc': 'LC',
                        'register': '접수'}

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
                </View>

                <View style={{width: '100%'}}>
                    <Table
                        header={tableHeader}
                        data={tableData}
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
    },
});