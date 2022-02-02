import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import {Text} from 'react-native-paper';
import { basicStyles, Header, PaperTable, StyledDivider, Table } from '../../components';
import api from '../../utils/api'

export default function RegisterListScreen({route}) {
    const {name} = route.params
    const lcName = name ? name: null

    const [lcMemberList, setLCMemberList] = useState([])
    const [totalRegister, setTotalRegister] = useState(0)

    const tableHeader = {'index': '#',
                        'name': '이름',
                        'department': '계열',
                        'register': '접수'}

    async function updateLCMemberList() {
        var total = 0
        lcMemberList.forEach((lcMember)=> {
            if (lcMember.register === 'O') {
                total++
            }
        })
        setTotalRegister(total)
    }

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
    useEffect(()=> {
        getLCMemberList(lcName)
    }, [])

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