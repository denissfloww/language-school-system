import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';


interface IEditorProps {
    editorValue: string;
    setEditorValue?: (value: string) => void;
    isReadOnly?: boolean;
}

export const Editor = (props: IEditorProps) => {
    const { editorValue, setEditorValue, isReadOnly } = props;

    const handleChange = (html: any) => {
        if (setEditorValue) {
            setEditorValue(html);
        }
    };

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'align',
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
            [{ header: '1' }, { header: '2' }, { font: ['Nunito'] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image', 'video'],
            ['clean'],
            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    };

    const placeholder = 'Напишите что нибудь...';
    return (
        <div className='text-editor'>
            <ReactQuill
                theme={isReadOnly ? 'bubble' : 'snow'}
                readOnly={isReadOnly}
                onChange={handleChange}
                value={editorValue}
                modules={modules}
                formats={formats}
                bounds={'.app'}
                className='ql-editor'
                placeholder={placeholder}
            />
        </div>
    );
};

export default Editor;
