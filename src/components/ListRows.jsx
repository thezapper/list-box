import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

function ColumnNames(props) 
{
    // I was going to make this flexible and get the names from the object, but there
    // is specific logic required for the status column, so there's not much point.
    //const Cols = props.names.map( (itm, idx) => (<th key={'col'+idx}>{itm}</th>));
    
    return (
        <tr className='colNames'>
            <th> </th>
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
            <th>Status</th>
        </tr>
    );
}

function Status(props)
{
    let status = props.text.charAt(0).toUpperCase() + props.text.slice(1)

    if (status === 'Available')
    {
        return (
            <td  >
                <span className='availableDot' /> {status}
            </td>
        )
    }
    else
    {
        return (
            <td>
                {status}
            </td>
        )
    }
}

function Row(props)
{
    const [checked, setChecked] = React.useState(false);

    useEffect(() => 
    {
        if (props.item.status === 'available') 
        {
            // props.selectAll used as an override from the titlebar master checkbox
            if (props.selectAll === 'true')
                setChecked(true);
            if (props.selectAll === 'false')
                setChecked(false);
        }
      },[props.selectAll]);

    const handleChange = (event) => 
    { 
        setChecked(event.target.checked);
        props.onItemSelected(event.target.checked, props.item);
    };

    return (
        <tr className={checked ? 'rowSelect' : 'rowClear'}>
            <td>
                <Checkbox 
                    checked={checked}
                    disabled={props.item.status === 'available' ? false : true}
                    onChange={handleChange}/></td>

            <td>{props.item.name}</td>
            <td>{props.item.device}</td>
            <td>{props.item.path}</td>
            <Status text={props.item.status}/>
        </tr>
    );
}

function ListRows(props) 
{
    //let colNames = Object.keys(props.data[0]);
    const rows = props.data.map( (itm, idx) => (
            <Row key={'row'+idx} 
                 item={itm} 
                 onItemSelected={props.onItemSelected} 
                 selectAll={props.selectAll}/>
        ));

    return (
        <table className='table'>
            <tbody>
                <ColumnNames />
                {rows}
            </tbody>
        </table>
    );
}

export
{
    ListRows
}