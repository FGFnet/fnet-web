import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Text} from 'react-native-paper';
import { basicStyles, GreenButton, Header } from '../../components';
import {useNavigation} from '../../providers'
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import type { AppState, User } from '../../store';
import api from '../../utils/api'

export default function NoticeScreen() {
    const navigation = useNavigation();
    const loggedUser = useSelector<AppState, User>((state) => state.loggedUser)
    function navigate(){navigation.navigate('NoticeCreate', {mode: 'create'})}

    const [noticeList, setNoticeList] = useState([])
    const [refresing, setRefresing] = useState(false)
    const [loading, setLoading] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            getNoticeList()
        }, [])
    )

    async function getNoticeList() {
        setLoading(true)
        try {
            const res = await api.getNoticeList()
            setNoticeList(res.data.data.results)
        } catch (err) {
            alert(err)
        } finally {
            setLoading(false)
        }
    }

    function dateFormatter(date) {
        const create_time = new Date(date)
        const now = new Date()
        var diff = (now.getTime() - create_time.getTime())/(1000*60)
        if (diff<60) {
            diff = Math.round(diff)
            return diff + "분 전"
        } else if (diff<60*24) {
            diff = Math.round(diff/60)
            return diff + "시간 전"
        } else {
            diff = Math.round(diff/(60*24))
            return diff + "일 전"
        }
    }

    const Item = ({item}) => (
        <TouchableOpacity
            style={styles.notice}
            onPress={() => navigation.navigate('NoticeDetail', {id: item.id})}
        >
            <Text style={styles.notice_title}>{item.title}</Text>
            <Text style={basicStyles.lightText}>{dateFormatter(item.create_time)}</Text>
        </TouchableOpacity>
    )

    const renderItem = ({item}) => (
        <Item
            item={item}
        />
    )

    return(
        <View style={basicStyles.container}>
            <View style={styles.header}>
                <Header title='공지사항'/>
                { loggedUser.is_admin && <GreenButton text='+new' press={navigate}/> }
            </View>
            <FlatList
                ListEmptyComponent={
                    <Text style={{textAlign: 'center'}}>No Notice</Text>
                }
                data={noticeList}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                style={styles.notice_list}
                refreshing={refresing}
                onRefresh={getNoticeList}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    notice_container: {
        margin: '5%'
    },
    notice_list: {
        width: '100%',
        padding: '5%'
    },
    notice: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    notice_title:{
        fontSize: 16,
        fontWeight: 'bold',
    },
});