import * as React from 'react';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';

const FeedCard = (props: { content: string }) => {
    const { content } = props;

    return (
        <div className='ql-editor' id='editor-view'>
            <div
                dangerouslySetInnerHTML={{
                    __html: content,
                }}
            ></div>
        </div>
    );
};

export default FeedCard;
