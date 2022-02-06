import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { Menu, MenuItem } from 'react-native-material-menu';
import { basicStyles, InputForm, GreenButton, StyledDivider } from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import api from '../../utils/api'
import { useNavigation } from '../../providers'
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import type { AppState, User } from '../../store';

export default function NoticeDetailScreen({route}) {
    const navigation = useNavigation();
    const loggedUser = useSelector<AppState, User>((state) => state.loggedUser)

    const {id} = route.params
    const noticeId = id ? id : null
    const [noticeTitle, setNoticeTitle] = useState('')
    const [noticeContent, setNoticeContent] = useState('')
    const [noticeTimeDiff, setNoticeTimeDiff] = useState('')
    const [commentContent, setcommentContent] = useState('')
    const [noticeComment, setNoticeComment] = useState([])

    const [menuVisible, setMenuVisible] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true)
        await setTimeout(()=>setRefreshing(false),1000)
    }, [])

    const openMenu = () => {
        setMenuVisible(true)
    }
    const closeMenu = () => {
        setMenuVisible(false)
    }

    const editNotice = ()=> {
        navigation.navigate('NoticeCreate', {mode: 'edit', noticeId: noticeId})
    }
    const deleteNotice = async () => {
        await api.deleteNotice(noticeId)
        navigation.navigate('Notice')
    }

    //1년 이상 차이 : 년도만 표시, 1개월 이상 차이: *개월로 표시, 1일 이상 차이: *일 *시간, 이외: *시간 *분
    const calculateTimeDiff = (time) => {
        let diff = ''
        const createTimeDate = new Date(time)
        const nowDate = new Date()
        const nowYear = nowDate.getFullYear()
        const createTimeYear = createTimeDate.getFullYear()

        if(nowYear-createTimeYear != 0) {
            diff += nowYear-createTimeYear
            diff += '년 전'
        } else {
            let diffDate = nowDate.getTime() - createTimeDate.getTime()
            if (diffDate < 0) {
                diff = '0분 전'
                return diff
            }
            const daySec = 24 * 60 * 60 * 1000
            const diffMonth = Math.floor(diffDate/(daySec*30))
            diffDate = diffDate - diffMonth * daySec * 30
            const diffDay = Math.floor(diffDate/daySec)
            diffDate = diffDate - diffDay * daySec
            const diffHour = Math.floor(diffDate/(1000*60*60))
            diffDate = diffDate - diffHour * 1000 * 60 * 60
            const diffMin = Math.floor(diffDate/(1000*60))
            
            if (diffMonth > 0) diff += diffMonth + '개월 전'
            else if (diffDay > 0) {
                if (diffHour > 0) diff += diffDay + '일 ' + diffHour + '시간 전'
                else diff += diffDay + '일 전'
            }
            else if (diffHour > 0) {
                if (diffMin > 0) diff += diffHour + '시간 ' + diffMin + '분 전'
                else diff += diffHour + '시간 전'
            }
            else diff+= diffMin + '분 전'
        }
        return diff
    }

    async function getNotice () {
        setLoading(true)
        try {
            const res = await api.getNotice(noticeId)
            setNoticeTitle(res.data.data.title)
            setNoticeContent(res.data.data.content)
            setNoticeTimeDiff(calculateTimeDiff(res.data.data.create_time))
        } catch(err) {
            alert(err)
        } finally {
            setLoading(false)
        }
    }

    async function getNoticeComment (){
        try {
            const res = await api.getCommentList(noticeId)
            const commentList = res.data.data.results
            commentList.map((comment)=> {
                const timeDiff = calculateTimeDiff(comment.create_time)
                const time = { "time_diff": timeDiff }
                Object.assign(comment, time)
            })
            setNoticeComment(commentList)
        } catch(err) {
            alert(err)
        }
    }

    async function createComment (){
        try {
            const data = {
                notice_id: noticeId,
                content: commentContent
            }
            await api.createComment(data)
            await getNoticeComment()
            setcommentContent('')
        } catch (err) {
            alert(err)
        }
    }

    const changeStatus = async (comment) => {
        const status = comment.check
        const data = {
            notice_id: comment.notice,
            comment_id: comment.id,
            check: !status
        }
        try{
            await api.checkComment(data)
            await getNoticeComment()
        } catch(err){
            alert(err)
        }
    }
    useFocusEffect(
        React.useCallback(()=>{
            getNotice()
            getNoticeComment()
        }, [noticeId])
    )

    let commentView = noticeComment.map((comment) => {
            return (
                <View style={basicStyles.insideContainer} key={comment.id}>
                    <View style={styles.commentHeader}>
                        <Text style={basicStyles.contentText}>{comment.created_by.name} FG</Text>
                        <Text style={basicStyles.lightText}>{comment.time_diff}</Text>
                    </View>
                    <View style={styles.commentContent}>
                        <Text style={basicStyles.contentText}>{comment.content}</Text>
                        { !!loggedUser.is_admin && 
                            <BouncyCheckbox
                            isChecked={comment.check}
                            onPress={async () => {
                                await changeStatus(comment)
                            }}
                            fillColor={Colors.primary_lighter}
                        /> }
                    </View>
                </View>
            )
        }
    )
    
    return(
        <View style={{flex:1}}>
            {
                loggedUser.is_admin && 
                <View style={{flexDirection:'row', justifyContent:'flex-end', alignContent: 'center', position: 'absolute', top: 10, right: 10}}>
                    <Menu
                        visible={menuVisible}
                        anchor={<IconButton icon="ellipsis-horizontal" onPress={openMenu} size={15}/>}
                        onRequestClose={closeMenu}
                    >
                        <MenuItem onPress={editNotice}><Icon name="create-outline"/> Edit</MenuItem>
                        <MenuItem onPress={deleteNotice}><Icon name="trash-outline"/> Delete</MenuItem>
                    </Menu>
                </View>
            }
            <View style={basicStyles.container}>
                <View style={basicStyles.insideContainer}>
                    <View style={styles.noticeTitle}>
                        <Text style={styles.noticeTitleText}>{noticeTitle}</Text>
                        <Text style={basicStyles.lightText}>{noticeTimeDiff}</Text>
                    </View>
                    <View style={styles.noticeContent}>
                        <Text style={basicStyles.contentText}>{noticeContent}</Text>
                    </View>
                </View>
                <StyledDivider/>
                <ScrollView
                    style={styles.comment} 
                    nestedScrollEnabled = {true}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {commentView}
                </ScrollView>
                <View style={styles.commentInput}>
                    <InputForm
                        style={styles.commentInputForm}
                        multiline={false}
                        height={40}
                        editable={true}
                        value={commentContent}
                        onChangeText={(text)=>setcommentContent(text)}
                    />
                    <GreenButton
                        text='입력'
                        press={createComment}
                        align='flex-end'
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    noticeTitle: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    noticeTitleText: {
        backgroundColor: Colors.primary_lighter,
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 5,
        paddingRight: 14,
    },
    noticeContent: {
        padding: 10
    },
    comment: {
        width: '100%',
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    commentContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    commentInput: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    commentInputForm: {
        margin: 0,
        width: '70%'
    },
    time: {
        color: Colors.light
    },
    checkbox: {

    }
});