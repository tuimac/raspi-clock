import React from 'react';
import "react-resizable/css/styles.css";

import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Checkbox
} from '@mui/material';

import Utils from '../../utils/Utils';
import { StyledTableCell } from './FileListStyles';
import FileListPreview from './FileListPreview';

class FileListTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      column: {
        'name': 'Name',
        'owner': 'Owner',
        'mtime': 'ModifiedTime',
        'size': 'Size'
      },
      check_list: []
    };
    this.handleAllChecked = this.handleAllChecked.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.getCheckList = this.getCheckList.bind(this);
  }

  getCheckList() {
    this.props.getCheckList(this.state.check_list);
  }

  handleAllChecked = async (event) => { 
    if(event.target.checked) {
      let tmp_check_list = [];
      this.props.items.row.forEach((item) => tmp_check_list.push(item.name));
      await this.setState({ check_list: tmp_check_list });
    } else {
      await this.setState({ check_list: [] });
    }
    this.getCheckList();
  }

  handleChecked = async (event, itemname) => {
    let tmp_check_list = this.state.check_list;
    if(event.target.checked) {
      tmp_check_list.push(itemname);
      await this.setState({ check_list: tmp_check_list });
    } else {
      tmp_check_list.splice(tmp_check_list.indexOf(itemname), 1);
      await this.setState({ check_list: tmp_check_list });
    }
    this.getCheckList();
  }

  render() {
    return(
      <>
        <FileListPreview path={ this.props.path } ref={ instance => { this.listpreview = instance } } />
        <TableContainer sx={{ maxHeight: window.innerHeight * 0.75 }}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow key='header'>
                <StyledTableCell align='center' style={{ width: '5%' }}>
                  <Checkbox
                    onChange={ (e) => this.handleAllChecked(e) }
                  />
                </StyledTableCell>
                { Object.keys(this.state.column).map((index) => (
                  <StyledTableCell align='center' key={ this.state.column[index] } style={{ width: '23%' }}>{ this.state.column[index] }</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              { this.props.path.length === 0
                ? ''
                : <TableRow hover onClick={ (e) => this.props.backwardDirectory() } key='../'>
                    <StyledTableCell></StyledTableCell>
                    { Object.keys(this.state.column).map((index) => (
                      this.state.column[index] === 'Name'
                      ? <StyledTableCell key={ '.. /' }>.. /</StyledTableCell>
                      : <StyledTableCell key={ this.state.column[index] + index.toString() }></StyledTableCell>
                    ))}
                  </TableRow>
              }
              { Object.keys(this.props.items.row).map((row) => (
                this.props.items.row[row].type === 'directory'
                ? <TableRow hover key={ this.props.items.row[row].name }>
                    <StyledTableCell align='center'>
                      <Checkbox
                        checked={ this.state.check_list.indexOf(this.props.items.row[row].name) !== -1 }
                        onChange={ (e) => this.handleChecked(e, this.props.items.row[row].name) }
                      />
                    </StyledTableCell>
                    { Object.keys(this.state.column).map((column) => (
                      column === 'name'
                      ? <StyledTableCell onClick={ (e) => this.props.forwardDirectory(this.props.items.row[row].name) } key={ this.props.items.row[row].name + column }>{ decodeURIComponent(this.props.items.row[row][column] + '/') }</StyledTableCell>
                      : column === 'mtime'
                        ? <StyledTableCell onClick={ (e) => this.props.forwardDirectory(this.props.items.row[row].name) } key={ this.props.items.row[row].name + column }>{ Utils.convert_to_datetime(this.props.items.row[row][column]) }</StyledTableCell>
                        : <StyledTableCell onClick={ (e) => this.props.forwardDirectory(this.props.items.row[row].name) } key={ this.props.items.row[row].name + column }>{ this.props.items.row[row][column] }</StyledTableCell>
                    ))}
                  </TableRow>
                : <TableRow hover key={ this.props.items.row[row].name }>
                    <StyledTableCell align='center'>
                      <Checkbox
                        checked={ this.state.check_list.indexOf(this.props.items.row[row].name) !== -1 }
                        onChange={ (e) => this.handleChecked(e, this.props.items.row[row].name) }
                      />
                    </StyledTableCell>
                    { Object.keys(this.state.column).map((column) => (
                      column === 'mtime'
                      ? <StyledTableCell onClick={ (e) => this.listpreview.openPreview(this.props.items.row[row].name) } key={ this.props.items.row[row].name + column }>{ Utils.convert_to_datetime(this.props.items.row[row][column]) }</StyledTableCell>
                      : <StyledTableCell onClick={ (e) => this.listpreview.openPreview(this.props.items.row[row].name) } key={ this.props.items.row[row].name + column }>{ decodeURIComponent(this.props.items.row[row][column]) }</StyledTableCell>
                    ))}
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };
}

export default FileListTable;
