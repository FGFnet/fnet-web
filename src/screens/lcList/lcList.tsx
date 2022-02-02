import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header, Table, basicStyles } from '../../components';
import api from '../../utils/api';

export default function LCListScreen({route}) {
  const tableHeader= {'index': '#', 'name': '이름', 'department': '계열'}
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
            </View>

            <View style={{width: '100%'}}>
                <Table
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
    },
});