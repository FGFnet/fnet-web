import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import { Text,} from 'react-native-paper';
import { basicStyles, Header, InputForm, GreenButton,} from '../../components';
import {useNavigation} from '../../providers'
import api from '../../utils/api'

export default function NoticeCreateScreen({route}) {
    const navigation = useNavigation()
    const mode = route.params.mode
    const noticeId = route.params.noticeId ? route.params.noticeId : null

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect (()=> {
        init()
    }, [])
    
    async function init() {
        if (mode === 'edit') {
            const res = await api.getNotice(noticeId)
            setTitle(res.data.data.title)
            setContent(res.data.data.content)
        }
    }

    async function submitNotice () {
        try {
            if (mode==='create') {
                const data = {
                    title: title,
                    content: content
                }
                await api.createNotice(data)
                alert('등록되었습니다.')
                navigation.navigate('Notice')
            } else {
                const data = {
                    id: noticeId,
                    title: title,
                    content: content
                }
                await api.editNotice(data)
                navigation.navigate('NoticeDetail', {id: noticeId})
            }
        } catch (err) {
            alert(err)
        }
    }

    return(
        <ScrollView>
            <View style={basicStyles.container}>
                <Header title='공지사항 작성'/>
                <View style={styles.title}>
                    <Text style={styles.label}>제목</Text>
                    <InputForm
                        style={{width: '85%'}}
                        placeholder='title'
                        multiline={false}
                        height= {40}
                        onChangeText={(text) => setTitle(text)}
                        value={title}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.label}>내용</Text>
                    <InputForm
                        style={{marginTop: 10}}
                        placeholder='contents'
                        multiline={true}
                        height= {200}
                        onChangeText={(text) => setContent(text)}
                        value = {content}
                    />
                </View>
                <GreenButton
                    text='등록'
                    press={submitNotice}
                    viewStyle={{
                        paddingTop: 30,
                        width:'100%',
                        flex: 1,
                        alignItems: 'flex-end'
                    }}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    content: {
        width: '100%',
        marginTop: 20,
    },
    label: {
        flex:1,
        fontSize: 15,
        fontWeight: 'bold',
    },
});