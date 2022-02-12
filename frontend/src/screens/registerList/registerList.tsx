import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import {Text} from 'react-native-paper';
import { basicStyles, Header, StyledDivider, Table } from '../../components';
import api from '../../utils/api'
import { useFocusEffect } from '@react-navigation/native';

export default function RegisterListScreen({route}) {
    const {name} = route.params
    const lcName = name ? name: null

    const [lcMemberList, setLCMemberList] = useState([])
    const [totalRegister, setTotalRegister] = useState(0)
    const [nscRegister, setNscRegister] = useState(0)
    const [hsscRegister, setHssclRegister] = useState(0)

    const tableHeader = {'index': '#',
                        'name': '이름',
                        'department': '계열',
                        'register_show': '접수'}

    async function updateLCMemberList() {
        var total = 0
        var nsc = 0
        var hssc = 0
        lcMemberList.forEach((lcMember)=> {
            if (lcMember.register_show === 'O') {
                total++
                if (lcMember.department === '자연과학계열' || lcMember.department === '공학계열') {
                    nsc++
                } else {
                    hssc++
                }
            }
        })
        setTotalRegister(total)
        setNscRegister(nsc)
        setHssclRegister(hssc)
    }

    useFocusEffect(
        React.useCallback(() => {
            getLCMemberList(lcName)
        },[])
    )

    useEffect(()=>{
        updateLCMemberList()
    },[lcMemberList])
    
    async function getLCMemberList(name) {
        try {
            const res = await api.getLCMemberList(name)
            setLCMemberList(res.data.data)
        } catch(err) {
        }
    }

    return(
        <ScrollView nestedScrollEnabled = {true}>
            <View style={basicStyles.container}>
                <Header title='접수 현황'/>
                <StyledDivider/>
                <View style={styles.body}>
                    <View style={styles.insideRowContainer}>
                        <ImageBackground
                            style={styles.lcNum}
                            source={require('../../images/register_list__ellipse.png')}
                        >
                            <Text style={{fontWeight: 'bold', fontSize: 17}}> {lcName} </Text>
                        </ImageBackground>
                        <View style={styles.registeredNumContainer}>
                            <View style={[styles.registeredNum, {paddingBottom: 5}]}>
                                <Text style={{fontWeight: 'bold'}}> 전체 접수 인원 </Text>
                                <Text style={{fontWeight: 'bold'}}> {totalRegister} </Text>
                            </View>
                            <View style={[styles.registeredNum, {paddingBottom: 5}]}>
                                <Text style={{fontSize: 12}}> 인사캠 접수 인원 </Text>
                                <Text style={{fontSize: 12}}> {hsscRegister} </Text>
                            </View>
                            <View style={[styles.registeredNum, {paddingBottom: 5}]}>
                                <Text style={{fontSize: 12}}> 자과캠 접수 인원 </Text>
                                <Text style={{fontSize: 12}}> {nscRegister} </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <StyledDivider/>
                <View style={{width: '100%'}}>
                    <Table header={tableHeader} data={lcMemberList}/>
                    </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        alignItems: 'center',
        width: '100%',
        padding: '5%',
    },
    insideRowContainer: {
        flexDirection: 'row',
    },
    lcNum: {
        height: 67.64,
        width: 93.87,
        justifyContent: 'center',
        alignItems: 'center',
    },
    registeredNumContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 30,
        minHeight: 67.64
    },
    registeredNum: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    table: {
        width: '100%',
    }
});