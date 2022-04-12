import { MenuItem, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ReactDataGrid, { Column } from 'react-data-grid';

export default function DataGrid() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/episode/')
            .then(res => res.json())
            .then(data => setData(data.results));
    }, []);

    interface Row {
        id: number;
        client: string;
        air_date: string;
        episode: string;
    }

    const issueTypes = [
        { id: 'bug', value: 'Bug' },
        { id: 'epic', value: 'Epic' },
        { id: 'story', value: 'Story' },
    ];

    const columns: Column<Row>[] = [
        { key: 'id', name: '', width: 50, editable: true },
        { key: 'name', name: 'Name' },
        { key: 'air_date', name: 'Air Date' },
        { key: 'episode', name: 'Episode' },
        {
            key: 'issueType',
            name: 'Task Type',
            editor: (p: any) => (
                <select value={p.row.country} onChange={e => p.onRowChange({ ...p.row, country: e.target.value }, true)}>
                    {issueTypes.map(value => (
                        <option key={value.id}>{value.value}</option>
                    ))}
                </select>
            ),
            editable: true,
        },
        // { key: "episode", name: "Episode" },
        // { key: "episode", name: "Episode" }
    ];

    return <ReactDataGrid columns={columns} rowGetter={i => data[i]} rowsCount={data.length} minHeight={1000} />;
}

const issueTypes = [
    { id: 'bug', value: 'Bug' },
    { id: 'epic', value: 'Epic' },
    { id: 'story', value: 'Story' },
];
