import * as React from "react";
import { usePagination, useTable, useGlobalFilter, useAsyncDebounce } from 'react-table';
import { Colors } from "../constants";
import styled from 'styled-components';
import { ActivityIndicator, IconButton, Button } from "react-native-paper";
import {View} from 'react-native';

const Styles = styled.div`
  input {
    backgroundColor: Colors.white;
    border: #D0DBCC solid 1px;
    height: 20px;
    padding: 8px;
  },
  table {
    border-spacing: 0;
    width: 100%;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #E5E7E9;

      :last-child {
        border-right: 0;
      }
    }
  }
`
function GlobalFilter({
  globalFilter,
  setGlobalFilter,
}) {
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="검색"
      />
    </span>
  )
}

function MakeTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setPageSize,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state
  } = useTable(
    {
      columns, data, initialState: { pageIndex: 0, pageSize : 30 },
    },
    useGlobalFilter, usePagination
  )

  return (
    <>
      <table {...getTableProps()}>
        <thead style={{borderBottom: 2, borderBottomColor: Colors.light}}>
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'right',
              }}
            >
              <GlobalFilter
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} style={{color: Colors.darker, fontSize: 12}}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()} style={{textAlign: 'center', color: Colors.darker, fontSize: 12}}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
        <Button onPress={() => previousPage()} disabled={!canPreviousPage}
          style={{width: 30, height: 30}}>
          {'<'}
        </Button>
        <Button onPress={() => nextPage()} disabled={!canNextPage}
          style={{width: 30, height: 30}}>
        {'>'}
        </Button>{' '}
      </View>
    </>
  )
}

export default function Table(props) {
    var data = props.data
    var loading = props.loading
    var header = props.header
    var tableHeader = []

    for (let key in header) {
        if (key === 'index') {
            tableHeader.push({
                Header: header[key], accessor: key,
                Cell: (row) => { let idx: number = row.row.id; ++idx; return <div>{idx}</div>; }
            })
        } else if (key === 'is_admin') {
              tableHeader.push({
                Header: header[key], accessor: key,
                Cell: (row) => { 
                  console.log(row)
                  if(row.data[row.row.index].is_admin) return <div>O</div>; 
                  else return <div>X</div>;
                }
            })
        } else if (key === 'register') {
            tableHeader.push({
                Header: header[key], accessor: key,
                Cell: (row) => { 
                    //row 별 index : row.data[row.row.index].id
                    return (
                        <IconButton 
                          style={{paddingRight: 10}}
                          size={18}
                          icon={row.data[row.row.index].register ? 
                          "heart-outline" : "heart-dislike-outline"}
                          onPress={() => props.toggleFunc(row.data[row.row.index].id)}
                        ></IconButton>
                    )
                }
            })
        } else {
            tableHeader.push({ Header: header[key], accessor: key })
        }
    }

    const columns = React.useMemo(() => tableHeader, [])
    const dataList = React.useMemo(() => data, [data])

    if (loading) {
        return (
            <Styles>
                <ActivityIndicator 
                    animating={true} 
                    size={'large'} 
                    color={Colors.primary_lighter} 
                    style={{marginTop: 30}}
                />
            </Styles>
        )
    }
    return (
        <Styles>
            <MakeTable columns={columns} data={dataList} />
        </Styles>
    );
}
