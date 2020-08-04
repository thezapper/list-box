import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {TitleBar} from './TitleBar.jsx';
import {ListRows} from './ListRows.jsx';

let selectedItems = new Set();
function DownloadList(props) 
{
    const [numSelected, setNumSelected] = React.useState(0);
    const [allSelectStatus, setAllSelect] = React.useState('none');
    let maxSelectable = 0;

    props.listData.forEach(el => {
        if (el.status === 'available')
            maxSelectable++;
    });

    let onItemSelected = (val, item) =>
    {
        //console.log("Item selected, ", val);
        let newNum = numSelected;

        // if an item has been selected increase the selection count
        if (val === true)
        {
            newNum = numSelected + 1;
            selectedItems.add(item);
        }
        else
        {
            newNum = numSelected - 1;
            selectedItems.delete(item);
        }    
        console.dir(selectedItems);


        setNumSelected(newNum);

        if (newNum === maxSelectable)
            setAllSelect('true');
        else if (newNum === 0)
            setAllSelect('false');
        else
            setAllSelect('indeterminate');
    }

    let onMasterSelect = (val) =>
    {
        if (val === true)
        {
            setNumSelected(maxSelectable);
            setAllSelect('true');

            props.listData.forEach(el => {
                if (el.status === 'available')
                    selectedItems.add(el);
            });
        }
        else  
        {
            setNumSelected(0);
            setAllSelect('false');
            selectedItems.clear();
        }
    }
    
    let onDownload = () =>
    {
        let downloadList = 'Items to Download:\n\n';
        selectedItems.forEach(function(item)
        {
            downloadList += (item.device + ' - ' + item.path + '\n' );
        });
        console.log(downloadList);

        alert(downloadList);
    }

    return (
        <div className='downloadList'>
            <TitleBar 
                numSelected={numSelected} 
                selectState={allSelectStatus} 
                masterSelect={onMasterSelect}
                download={onDownload} />
            <ListRows data={props.listData} onItemSelected={onItemSelected} selectAll={allSelectStatus} />
        </div>
    );
}

export
{
    DownloadList,
}