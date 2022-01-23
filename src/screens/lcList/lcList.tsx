import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { InputForm, Header, PaperTable, basicStyles } from '../../components';
import { Colors } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../../utils/api';

export default function LCListScreen({route}) {
  const tableHeader= {'#': 'index', '이름': 'name', '계열': 'department'}
  const [tableData, updateTableData] = React.useState([])
  const [loading, setLoading] = useState(false)
  const [searchData, setSearchData] = React.useState([])
  const [searchQuery, setSearchQuery] = React.useState('')
  const lcName =  route.params.lcName

  useEffect(() => {
      const fetchUsers = async () => {
          try {
              setLoading(true)
              const res = await api.getLCMemberList(lcName)
              updateTableData(res.data.data)
              setSearchData(res.data.data)
          } catch (err) {
          }
          setLoading(false)
      }
      fetchUsers()
  }, [])

  const onChangeSearch = (query) => {
      setSearchQuery(query)
      const searchResult = []
      searchData.forEach((value) => {
          for (var key in value) {
              if (value[key].toString().search(query) !== -1) {
                  const data = Object.assign({}, value)
                  searchResult.push(data)
                  break
              }
          }
      })
      updateTableData(searchResult)
  }

  return(
      <ScrollView nestedScrollEnabled = {true}>
          <View style={basicStyles.container}>
            <View style={styles.header}>
                <Header title={lcName.toUpperCase() + ' Members'} marginBottom={0}/>
                <View style={styles.searchBar}>
                    <InputForm
                        style={{width: '80%'}}
                        height={35}
                        value={searchQuery}
                        onChangeText={onChangeSearch}
                    />
                    <Icon
                        style={styles.inputIcon}
                        name="search-outline"
                        color={Colors.light}
                        size={18}
                    />
                </View>
            </View>

            <View style={{width: '100%'}}>
                <PaperTable
                    header={tableHeader}
                    data={tableData}
                    loading={loading}
                />
            </View>
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
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
});