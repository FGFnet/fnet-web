import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Header, InputForm, PaperTable } from '../../components';
import { Colors } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import * as DocumentPicker from 'expo-document-picker';
import api from '../../utils/api';

export default function FGListScreen() {
    const tableHeader= {'#': 'index', '이름': 'name', '학번': 'student_id', 'admin': 'is_admin'}
    const [tableData, updateTableData] = React.useState([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = React.useState('')
    const [singleFile, setSingleFile] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const res = await api.getFGList()
            updateTableData(res.data.data)
        } catch (err) {
            alert(err)
        }
        setLoading(false)
    }

    const uploadFile = async () => {
        if (singleFile != null) {
            const formData = new FormData();
            formData.append('file', singleFile)
            
            setLoading(true)
            try {
                const res = await api.uploadFGFile(formData);
                if (!res.data.error) {
                    alert('Upload Successful');
                    setSingleFile(null)
                    await fetchUsers()
                }
            } catch (err) {
                alert(err)
            } finally {
                setLoading(false)
            }
        } else {
            alert("No file selected")
        }
    };

    const selectFile = async () => {
        try {
            const res = await DocumentPicker.getDocumentAsync();
            if (res.type === 'cancel') {
                alert('Canceled');
            } else {
                setSingleFile(res.file)
            }
        } catch (err) {
            setSingleFile(null);
            alert('Unknown Error: ' + JSON.stringify(err));
        }
    };

    useEffect(() => {
        fetchUsers()
    }, [])

    const onChangeSearch = (query) => {
        setSearchQuery(query)
    }

    async function onSubmit () { // search by fg name
        try {
            setLoading(true)
            const res = await api.searchFG(searchQuery)
            updateTableData(res.data.data)
        } catch (err) {
            alert(err)
        }
        setLoading(false)
    }

    return(
        <ScrollView>
            <View style={styles.header}>
                <Header title='FG List' marginBottom={0}/>
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

            <PaperTable
                header={tableHeader}
                data={tableData}
                loading={loading}
            />
            
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={selectFile}>
                <Text style={styles.buttonTextStyle}>Select FG List (Excel)</Text>
            </TouchableOpacity>
            {singleFile != null ? (
                <Text style={styles.textStyle}>
                    File: {singleFile.name ? singleFile.name : ''}
                </Text>
            ) : null}
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={uploadFile}>
                <Text style={styles.buttonTextStyle}>Upload Selected File</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        paddingTop: '10%',
        paddingRight: '10%',
        paddingLeft: '10%'
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
    textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
        color: Colors.primary
    },
    buttonStyle: {
        backgroundColor: Colors.primary,
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: Colors.primary,
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
});