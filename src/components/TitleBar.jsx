import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import GetAppIcon from '@material-ui/icons/GetApp';

function TitleBar(props) 
{
    let checked = false;
    let indeterminate = false;

    if (props.selectState === 'indeterminate')
        indeterminate = true;
    else if (props.selectState === 'true')
        checked = true;

    const handleChange = (event) => {
        props.masterSelect(event.target.checked);
      };

    const onDownloadClicked = (evt) =>
    {
        props.download();
    }

    return (
        <div className='titleBar'>
            <Checkbox 
                checked={checked}
                indeterminate={indeterminate}
                onChange={handleChange}
            />
            {props.numSelected === 0 ? 'None Selected' : 'Selected ' + props.numSelected}
            
            <div className='downloadButton' onClick={onDownloadClicked}>
                <GetAppIcon className='downloadIcon' />      
                Download Selected
            </div>

        </div>
    );
}

export
{
    TitleBar,
}