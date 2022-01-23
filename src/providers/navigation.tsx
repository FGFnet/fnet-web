import React from 'react';
import { NavigationContainer, NavigationProp,  useNavigation as useNativeNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen, ChatScreen, 
    NoticeScreen, NoticeDetailScreen, NoticeCreateScreen, 
    RegisterScreen, RegisterListScreen, SettingScreen, 
    FGListScreen, FreshmenListScreen, 
    LoginScreen, LCSettingScreen, LCListScreen
} from '../screens';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export type ParamList = {
    Home: {};
    Login: {};
    Chat: {};
    Notice: {};
    NoticeDetail: {};
    NoticeCreate: {};
    Register: {};
    RegisterList: {};
    Setting: {};
    FGList: {};
    FreshmenList: {};
    LCSetting: {};
    LCList: {};
}

export const useNavigation = () => {
    return useNativeNavigation<NavigationProp<ParamList>>();
};

const Stack = createStackNavigator();

export function NavigationProvider() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    cardStyle: {backgroundColor: '#FFFFFF'}
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="RegisterList" component={RegisterListScreen}/>
                <Stack.Screen name="Chat" component={ChatScreen}/>
                <Stack.Screen name="Notice" component={NoticeScreen}/>
                <Stack.Screen name="Register" component={RegisterScreen}/>
                <Stack.Screen name="NoticeDetail" component={NoticeDetailScreen}/>
                <Stack.Screen name="NoticeCreate" component={NoticeCreateScreen}/>
                <Stack.Screen name="Setting" component={SettingScreen}/>
                <Stack.Screen name="FGList" component={FGListScreen}/>
                <Stack.Screen name="FreshmenList" component={FreshmenListScreen}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="LCSetting" component={LCSettingScreen}/>
                <Stack.Screen name="LCList" component={LCListScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}