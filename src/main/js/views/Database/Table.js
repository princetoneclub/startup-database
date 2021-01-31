import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Database.css'
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';
import { Button } from 'react-bootstrap';

addStyle(Button, 'view-more');

const $ = require('jquery');
$.DataTable = require('datatables.net');

const columns = [
    {
        class: "details-control",
        orderable: false,
        data: '',
        defaultContent:""
    },
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
        data: 'employeeCount',
        visible: false
    },
    {
        title: 'Total Funding',
        data: 'totalFunding',
        visible: false
    },
    {
        title: 'Website Link',
        data: 'websiteLink',
        visible: false
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

function format ( d ) {
    return '<b>Employee Count:</b> '+d.employeeCount+'<br>'+
        '<b>Total Funding:</b> '+d.totalFunding+'<br>'+
        '<b>Website:</b> '+'<a class="website-link" href="'+d.websiteLink+'" target="_blank">'+d.websiteLink+'</a>'+
        '<a class="website-link" href="'+'/startuppage'+d.id+'">'+'View More'+'</a>';
}

class Table extends Component {
    state = {
        viewStartup: false,
        startup:'',
    }
    constructor(props) {
        super(props);
        this.displayInfo = this.displayInfo.bind(this);
        this.displayTable = this.displayTable.bind(this);
    }
    componentDidMount() {
        var detailRows=[]
        var dt = $(this.refs.main).DataTable({
            dom: '<"data-table-wrapper"lfrtip>',
            data: this.props.names,
            columns,
            ordering: true,
            searching: true,
            processing: true,
            paging: true,
            deferRender: true,
            // scrollX: true,
            // scrollY: true,
            // scrollCollapse:true,
            autoWidth: false,
            lengthChange: true,
            order: [[1,'asc']],
            // serverSide: true,
            // stripeClasses:[]
        });
        // $(this.refs.main).on( 'click', 'tr td.details-control', function () {
        //     var tr = $(this).closest('tr');
        //     var row = dt.row( tr );
        //     var idx = $.inArray( tr.attr('id'), detailRows );
     
        //     if ( row.child.isShown() ) {
        //         tr.removeClass( 'details' );
        //         row.child.hide();
     
        //         // Remove from the 'open' array
        //         detailRows.splice( idx, 1 );
        //     }
        //     else {
        //         tr.addClass( 'details' );
        //         row.child( format( row.data() ) ).show();
     
        //         // Add to the 'open' array
        //         if ( idx === -1 ) {
        //             detailRows.push( tr.attr('id') );
        //         }
        //     }
        // } );
     
        // On each draw, loop over the `detailRows` array and show any child rows
        dt.on( 'draw', function () {
            $.each( detailRows, function ( i, id ) {
                $('#'+id+' td.details-control').trigger( 'click' );
            } );
        } );
        
        $(this.refs.main).on( 'click', 'tr', async function () {
            var tr = $(this).closest('tr');
            var row = dt.row( tr );
            var data = dt.rows(['.selected']).data().toArray();
            var startupId = data.id;
            await axios
                .get('/api/companies/' + startupId)
                .then(res => {
                    console.log(res);
                    this.setState(
                        {
                            startup: res.data,
                            viewStartup: true
                        }
                    );
                })
                .catch(err => console.log(err));
            
        }.bind(this));
    }

    displayTable() {
        this.setState({
            viewStartup: false
        });
    }

    async displayInfo(startupId) {
    	await axios
			.get('/api/companies/' + startupId)
			.then(res => {
				this.setState(
					{
						startup: res.data,
						viewStartup: true
					}
				);
			})
			.catch(err => console.log(err));
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
        let display;
        let viewStartup = this.state.viewStartup;

        if (!viewStartup) {
            display = (
                <div>
                    <div>
                        <table ref="main" class="display"/>
                    </div>
                </div>
            );
        } else {
            display = (
                <StartupProfile
                    // startup={this.state.startup}
                    name={this.state.startup.name}
					industry={this.state.startup.industry}
					technology={this.state.startup.technology}
                    region={this.state.startup.region}
                    employeeCount={this.state.startup.employeeCount}
                    totalFunding={this.state.startup.totalFunding}
                    websiteLink={this.state.startup.websiteLink}
                    onClick={this.displayTable}
                />
            );
        }

        return <div>{display}</div>;
    }
}

function StartupProfile(props) {
	return (
		<div>
			<div id="user-profile">
				<div id="chunk">
					<p id="header">
						{props.name}
					</p>
					<p id="information"> Name: {props.name}</p>
					<p id="information"> Industry: {props.industry}</p>
					<p id="information"> Technology: {props.technology}</p>
					<p id="information"> Region: {props.region}</p>
					<p id="information"> Employee Count: {props.employeeCount}</p>
					<p id="information"> Total Funding: {props.totalFunding}</p>
					<p id="information"> Website Link: <a href={props.websiteLink}>{props.websiteLink}</a></p>
				</div>
			</div>
			<BackButton onClick={props.onClick} />
		</div>
	);
}

function BackButton(props) {
	return (
		<div id="welcome-content">
			<Row className="center-block text-center">
				<div>
					<Button bsStyle="admin" bsSize="large" onClick={props.onClick}>
						Back
					</Button>
				</div>
			</Row>
		</div>
	);
}

Table.propTypes = {
    names: PropTypes.array
};

export default Table;