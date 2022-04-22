import { MenuItem, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ReactDataGrid from 'react-data-grid';
import { Editors } from 'react-data-grid-addons';
const { DropDownEditor } = Editors;

const countries = [
    { id: 'bug', value: 'Bug', title: 'Bug', text:'Bug' },
    { id: 'epic', value: 'Epic', title: 'Epic', text: 'Epic' },
    { id: 'story', value: 'Story', title: 'Story', text: 'Story' },
];

const IssueTypeEditor = <DropDownEditor options={countries} />;

export default function DataGrid() {
    const issueTypes = [
        { id: 'bug', value: 'Bug' },
        { id: 'epic', value: 'Epic' },
        { id: 'story', value: 'Story' },
    ];

    const data = [
        { id: 0, title: 'Task 1', country: 'Bug' },
        { id: 1, title: 'Task 2', country: 'Story' },
        { id: 2, title: 'Task 3', country: 'Epic' },
    ];

    const columns = [
        { key: 'id', name: '', width: 50, editable: true, frozen: true },
        { key: 'title', name: 'Name', editable: true },
        {
            key: 'country',
            name: 'Country',
            editor: IssueTypeEditor,
            // editor: (p) => {
            //     console.log(p);
            //     return (
            //         <select
            //             value={p.value}
            //             onChange={e => {
            //                 console.log(...p.row);
            //                 // p.onRowChange({ ...p.row, country: e.target.value }, true);
            //             }}
            //         >
            //             {countries.map(country => (
            //                 <option key={country.id}>{country.value}</option>
            //             ))}
            //         </select>
            //     );
            // },

            // editor: (p: any) => (
            //     <select value={p.row.issueType} onChange={e => p.onRowChange({ ...p.row, issueType: e.target.value }, true)}>
            //         {issueTypes.map(value => (
            //             <option key={value.id}>{value.value}</option>
            //         ))}
            //     </select>
            // ),
            editable: true,
        },
    ];

    return (
        <ReactDataGrid
            columns={columns}
            onGridRowsUpdated={e => {
                console.log(e);
            }}
            enableCellSelect={true}
            rowGetter={i => data[i]}
            rowsCount={data.length}
            minHeight={800}
        />
    );
}
