import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {Text, Modal, Portal} from 'react-native-paper';
import { basicStyles, GreenButton, Header, InputForm } from '../../components';
import DatePicker from '@dietime/react-native-date-picker';
import api from '../../utils/api'

export default function LCSettingScreen() {
    const [selectDay, setSelectDay] = useState("")

    const [firstDate, setFirstDate] = useState("");
    const [secondDate, setSecondDate] = useState("");
    const [thirdDate, setThirdDate] = useState("");
    const [firstLC, setFirstLC] = useState("");
    const [secondLC, setSecondLC] = useState("");
    const [thirdLC, setThirdLC] = useState("");

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

    const showDatePicker = (selectDay) => {
        setSelectDay(selectDay);
        showModal()
    };

    const onChangeDate = (selectedDate) => {
        const currentDate = selectedDate;
        selectDay === "1" ? setFirstDate(currentDate) :
        selectDay === "2" ? setSecondDate(currentDate) :
        selectDay === "3" ? setThirdDate(currentDate) : null
    }

    const getDate = () => {
        if(selectDay === "1"){
            return firstDate
        } else if (selectDay === "2") {
            return secondDate
        } else {
            return thirdDate
        }
    }

    async function updateLC (name, schedule) {
        const data = {
            name: name,
            schedule: schedule.getFullYear() + "-" + (schedule.getMonth()+1) + "-" + schedule.getDate()
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
                setFirstDate(new Date(lcList[0].schedule))
            } 
            if (lcList[1]){
                setSecondLC(lcList[1].name)
                setSecondDate(new Date(lcList[1].schedule))
            } 
            if (lcList[2]){
                setThirdLC(lcList[2].name)
                setThirdDate(new Date(lcList[2].schedule))
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
                            value={firstDate ? new Date(firstDate.getTime() - (firstDate.getTimezoneOffset() * 60000)).toISOString().slice(0,10) : null}
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
                            value={secondDate ? new Date(secondDate.getTime() - (secondDate.getTimezoneOffset() * 60000)).toISOString().slice(0,10) : null}
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
                            value={thirdDate ? new Date(thirdDate.getTime() - (thirdDate.getTimezoneOffset() * 60000)).toISOString().slice(0,10) : ""}
                            height={40}
                            pointerEvents="none"
                            style={{width: '100%',}}
                        />
                    </TouchableOpacity>
                    <Portal>
                        <Modal 
                            visible={visible} 
                            onDismiss={hideModal} 
                            contentContainerStyle={containerStyle}
                        >
                            <DatePicker
                                onChange={(value) => onChangeDate(value)}
                                value={getDate()}
                                format="yyyy-mm-dd"
                                startYear={new Date().getFullYear()}
                            />
                        </Modal>
                    </Portal>
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
