import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Typography from '@mui/material/Typography';
// import './styles.css';

export const Editor = () => {
    const [html, setHtml] = useState('');

    const handleChange = (html: any) => {
        setHtml(html);
    };

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
    ];

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    };

    const placeholder = 'Напишите что нибудь...';
    return (
        <div className='text-editor'>
            <Typography variant='h4' sx={{ mb: 6 }}>
                Управление объявлением
            </Typography>
            <ReactQuill
                theme='snow'
                onChange={handleChange}
                value={html}
                modules={modules}
                formats={formats}
                bounds={'.app'}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Editor;
