import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {Text, Modal, Portal} from 'react-native-paper';
import { basicStyles, GreenButton, Header, InputForm } from '../../components';
import api from '../../utils/api'
import { DatePickerModal } from 'react-native-paper-dates'

export default function LCSettingScreen() {
    const [selectDay, setSelectDay] = useState("")

    const [firstDate, setFirstDate] = useState("");
    const [secondDate, setSecondDate] = useState("");
    const [thirdDate, setThirdDate] = useState("");
    const [firstLC, setFirstLC] = useState("");
    const [secondLC, setSecondLC] = useState("");
    const [thirdLC, setThirdLC] = useState("");
    const [dates, setDates] = useState<Date[] | undefined>();

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const showDatePicker = (selectDay) => {
        setSelectDay(selectDay);
        showModal()
    };

    const onDismiss = React.useCallback(() => {
        setVisible(false);
      }, [setVisible]);


    const onConfirm = React.useCallback((params) => {
        setVisible(false);
        setDates(params.dates);
        let first = new Date(params.dates[0]);
        let second = new Date(params.dates[1]);
        let third = new Date(params.dates[2]);
        first.setDate(first.getDate() + 1)
        second.setDate(second.getDate() + 1)
        third.setDate(third.getDate() + 1)
        setFirstDate(first.toISOString().substring(0, 10))
        setSecondDate(second.toISOString().substring(0, 10))
        setThirdDate(third.toISOString().substring(0, 10))
      }, []);
    
    const getDate = () => {
        let today = new Date()
        let date
        if(selectDay === "1"){
            date = firstDate ? new Date(firstDate) : today
        } else if (selectDay === "2") {
            date = secondDate ? new Date(secondDate) : today
        } else {
            date = thirdDate ? new Date(thirdDate) : today
        }
        return date
    }

    async function updateLC (name, schedule) {
        const data = {
            name: name,
            schedule: schedule
        }
        try {
            const res = await api.updateLC(data)
            if(res.data.error === false) {
                alert("저장되었습니다")
            }
        } catch(err) {
        }
    }

    async function getLCList() {
        try {
            const res = await api.getLC()
            const lcList = res.data.data
            if (lcList[0]) {
                setFirstLC(lcList[0].name)
                setFirstDate(lcList[0].schedule)
            } 
            if (lcList[1]){
                setSecondLC(lcList[1].name)
                setSecondDate(lcList[1].schedule)
            } 
            if (lcList[2]){
                setThirdLC(lcList[2].name)
                setThirdDate(lcList[2].schedule)
            }   
        } catch(err) {
        }
    }

    useEffect(()=> {
        getLCList()
    }, [])

    return(
        <ScrollView>
            <View style={basicStyles.container}>
                <Header title='LC 설정'/>

                <View style={basicStyles.insideRowContainer}>
                    <Text style={{paddingRight: 20}}>첫쨋날</Text>
                    <InputForm
                        placeholder='LC명'
                        height={40}
                        style={{width: '40%', paddingRight: 20}}
                        value={firstLC}
                        onChangeText={text=>setFirstLC(text)}
                    />
                    <TouchableOpacity style={{width: '40%'}} onPress={()=>showDatePicker('1')}>
                        <InputForm
                            placeholder='날짜'
                            editable={false}
                            value={firstDate ? firstDate : null}
                            height={40}
                            pointerEvents="none"
                            style={{width: '100%'}}
                        />
                    </TouchableOpacity>
                </View>
                <GreenButton
                    text='저장'
                    press={()=>updateLC(firstLC, firstDate)}
                    align= 'flex-end'
                />

                <View style={basicStyles.insideRowContainer}>
                    <Text style={{paddingRight: 20}}>둘쨋날</Text>
                    
                    <InputForm
                        placeholder='LC명'
                        height={40}
                        style={{width: '40%', paddingRight: 20}}
                        value={secondLC}
                        onChangeText={text=>setSecondLC(text)}
                    />
                    <TouchableOpacity style={{width: '40%'}} onPress={()=>showDatePicker('2')}>
                        <InputForm
                            placeholder='날짜'
                            editable={false}
                            value={secondDate ? secondDate : null}
                            height={40}
                            pointerEvents="none"
                            style={{width: '100%',}}
                        />
                    </TouchableOpacity>
                </View>
                <GreenButton
                    text='저장' 
                    align= 'flex-end'
                    press={() => updateLC(secondLC, secondDate)}
                />

                <View style={basicStyles.insideRowContainer}>
                    <Text style={{paddingRight: 20}}>셋쨋날</Text>
                    
                    <InputForm
                        placeholder='LC명'
                        height={40}
                        style={{width: '40%', paddingRight: 20}}
                        value={thirdLC}
                        onChangeText={text=>setThirdLC(text)}
                    />
                    <TouchableOpacity style={{width: '40%'}} onPress={()=>showDatePicker('3')}>
                        <InputForm
                            placeholder='날짜'
                            editable={false}
                            value={thirdDate ? thirdDate : ""}
                            height={40}
                            pointerEvents="none"
                            style={{width: '100%',}}
                        />
                    </TouchableOpacity>

                    <DatePickerModal
                        locale="en"
                        mode="multiple"
                        visible={visible}
                        onDismiss={onDismiss}
                        date={getDate()}
                        onConfirm={onConfirm}
                    />
                </View>
                <GreenButton
                    text='저장'
                    align= 'flex-end' 
                    width= '100%'
                    press={() => updateLC(thirdLC, thirdDate)}
                />
            </View>
        </ScrollView>
        
    )
}
