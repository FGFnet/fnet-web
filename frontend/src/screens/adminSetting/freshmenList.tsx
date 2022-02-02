import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Header, Table } from '../../components';
import { Colors } from '../../constants';
import * as DocumentPicker from 'expo-document-picker';
import api from '../../utils/api';

export default function FreshmenListScreen() {
    const tableHeader= {'index': '#', 'name': '이름', 'phone_number': '전화번호', 'lc': 'LC', 'department': '계열'}
    const [tableData, updateTableData] = React.useState([])
    const [loading, setLoading] = useState(false)
    const [singleFile, setSingleFile] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const res = await api.getFreshmanList()
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
                const res = await api.uploadFreshman(formData);
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

    return(
        <ScrollView nestedScrollEnabled = {true}>
            <View style={styles.header}>
                <Header title='Freshmen List' marginBottom={0}/>
            </View>

            <Table
                header={tableHeader}
                data={tableData}
                loading={loading}
            />

            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={selectFile}>
                <Text style={styles.buttonTextStyle}>Select Freshmen List (Excel)</Text>
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
        paddingTop: '10%',
        paddingRight: '10%',
        paddingLeft: '10%'
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
