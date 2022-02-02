import React from 'react';
import { View, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store';
import { Text, Button, Checkbox } from 'react-native-paper';
import { Colors } from '../../constants'
import { useNavigation } from '../../providers';
import api from '../../utils/api';

export default function LoginScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [checked, setChecked] = React.useState(false);
    const [name, setName] = React.useState('');
    const [studentId, setStudentId] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    async function login() {
        try {
            setLoading(true)
            await api.login({'name': name, 'password': studentId})
            const res = await api.getUserInfo()
            dispatch(loginAction(res.data.data))
            setLoading(false)
            return true
        } catch (err) {
            alert(err.data.data)
        } finally {
            setLoading(false)
        }
    }

    return(
        <ScrollView>
            <View style={styles.wrapper}>
                <Image
                    source={require('../../images/fg_two.png')}
                    style={{height: 170, width: 200}}
                    resizeMode='contain'
                />
                <View style={styles.header}>
                    <Text style={styles.header_text}>Login</Text>
                </View>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder='이름'
                        onChangeText={(text) => setName(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='학번'
                        onChangeText={(text) => setStudentId(text)}
                    />
                    <View style={styles.container}>
                        <Button
                            style={styles.button}
                            labelStyle={styles.button_text}
                            onPress={async () => {
                                const loggedIn = await login()
                                if (loggedIn) {
                                    navigation.navigate('Home')
                                }
                            }}
                            loading={loading}
                        >
                            Login
                        </Button>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    header: {
        flex: 1,
        alignItems: 'center'
    },
    header_text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.darker
    },
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 10
    },
    input: {
        height: 37,
        width: 250,
        padding: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: Colors.primary_lighter,
        borderRadius: 4
    },
    checkbox_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginHorizontal: 80
    },
    button: {
        height: 37,
        width: 250,
        backgroundColor: Colors.primary,
        borderRadius: 4
    },
    button_text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.white,
        paddingLeft: 5,
        paddingRight: 14
    }
});