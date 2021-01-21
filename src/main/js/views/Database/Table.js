import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './datatables.css';

const $ = require('jquery');
$.DataTable = require('datatables.net');

const columns = [
    {
        title: 'Name',
        data: 'name',
    },
    {
        title: 'Industry',
        data: 'industry'
    },
    {
        title: 'Technology',
        data: 'technology'
    },
    {
        title: 'Region',
        data: 'region'
    },
    {
        title: 'Employee Count',
        data: 'employeeCount'
    },
    {
        title: 'Total Funding',
        data: 'totalFunding'
    },
    {
        title: 'Website Link',
        data: 'websiteLink'
    },
];

function reloadTableData(names) {
    const table = $('.data-table-wrapper').find('table').DataTable();
    table.clear();
    table.rows.add(names);
    table.draw();
}

function updateTable(names) {
    const table = $('.data-table-wrapper').find('table').DataTable();
    let dataChanged = false;
    table.rows().every(function () {
        const oldNameData = this.data();
        const newNameData = names.find((nameData) => {
            return nameData.name === oldNameData.name;
        });
        if (oldNameData.nickname !== newNameData.nickname) {
            dataChanged = true;
            this.data(newNameData);
        }
       return true;
    });

    if (dataChanged) {
        table.draw();
    }
}


class Table extends Component {
    componentDidMount() {
        $(this.refs.main).DataTable({
            dom: '<"data-table-wrapper"lfrtip>',
            data: this.props.names,
            columns,
            ordering: true,
            searching: true,
            processing: true,
            paging: true,
            deferRender: true,
            scrollX: true,
            scrollY: true,
            autoWidth: false,
            lengthChange: true,
        
        });
    }

    componentWillUnmount(){
       $('.data-table-wrapper').find('table').DataTable().destroy(true);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.names.length !== this.props.names.length) {
            reloadTableData(nextProps.names);
        } else {
            updateTable(nextProps.names);
        }
        return false;
    }



    render() {
        return (
            <div>
                <table ref="main" style={{width:'80%'}}/>
            </div>);
    }
}

Table.propTypes = {
    names: PropTypes.array
};

export default Table;