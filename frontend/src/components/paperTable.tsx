import React from 'react';
import {ScrollView, Platform, StyleSheet, View, FlatList} from 'react-native';
import {DataTable, IconButton, ActivityIndicator} from 'react-native-paper';
import {basicStyles} from './basic_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants';
export default function PaperTable(props) {
  var data = props.data
  var checkboxKey = props.checkboxKey
  var loading = props.loading
  var tableStyle = ('tableStyle' in props) ? props.tableStyle : basicStyles.paperTable
  var header = ('header' in props) ? Object.keys(props.header) :
              (data === undefined) ? null : Object.keys(data[0])
  var index = 1
  if (header === null) return null

  var tableHeader = header.map((title) => 
    <DataTable.Title key={title} style={{justifyContent: 'center'}}>
      {title}
    </DataTable.Title>
  )
  
  if (loading === true) {
    return (
      <View>
        <DataTable style={tableStyle}>
          <DataTable.Header>
            {tableHeader}
          </DataTable.Header>
          <ActivityIndicator 
            animating={true} 
            size={'large'} 
            color={Colors.primary_lighter} 
            style={{marginTop: basicStyles.paperTable.height/3}}
          />
        </DataTable>
      </View>
    )
  }

  var tableBody = data.map((val) => 
    <DataTable.Row key={val['id']}>
      {
        Object.values(props.header).map((title) =>
          <DataTable.Cell key={title} style={{justifyContent: 'center'}}>
            {
              checkboxKey === title ? 
                (Platform.OS === "ios" ? 
                  <Icon 
                    size={18}
                    name={val[title] ? 
                    "heart-outline" : "heart-dislike-outline"}
                    onPress={() => props.toggleFunc(val['id'])}
                  >
                  </Icon> : 
                  <IconButton 
                    size={18}
                    icon={val[title] ? 
                    "heart-outline" : "heart-dislike-outline"}
                    onPress={() => props.toggleFunc(val['id'])}
                  ></IconButton>
                ) :
              title === 'index' ? index++ :
              title in val ? val[title].toString() : null
            }
          </DataTable.Cell>
        )
      }
    </DataTable.Row>
  )

  return (
    <DataTable style={tableStyle}>
      <DataTable.Header>
        {tableHeader}
      </DataTable.Header>
      <ScrollView nestedScrollEnabled = {true}>
        {tableBody}
      </ScrollView>
    </DataTable>
  )
}

const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center'
  }
});