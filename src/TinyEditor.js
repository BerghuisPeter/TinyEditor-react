// components/TinyEditor.jsx
import React, { useEffect, useRef } from 'react';

const TinyEditor = ({ formValue = '', onChange }) => {
    const editorRef = useRef(null);
    const textareaRef = useRef(null);
    const lastPropValue = useRef(formValue);

    useEffect(() => {
        const loadEditor = () => {
            if (window.tinymce) return initEditor();

            const script = document.createElement('script');
            script.src = '/tinymce/tinymce.min.js';
            script.referrerPolicy = 'origin';
            script.onload = initEditor;
            document.body.appendChild(script);
        };

        const initEditor = () => {
            window.tinymce.init({
                license_key: 'gpl',
                target: textareaRef.current,
                menubar: false,
                height: 300,
                plugins: 'link lists code table autolink',
                toolbar:
                    'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link code',
                setup: (editor) => {
                    editorRef.current = editor;

                    editor.on('Change KeyUp', () => {
                        const content = editor.getContent();
                        lastPropValue.current = content;
                        if (onChange) onChange(content);
                    });
                },
                init_instance_callback: (editor) => {
                    editor.setContent(formValue || '');
                    lastPropValue.current = formValue;
                },
            });
        };

        loadEditor();

        return () => {
            if (editorRef.current) {
                console.log('destroyed');
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (
            editorRef.current &&
            formValue !== lastPropValue.current &&
            editorRef.current.getContent() !== formValue
        ) {
            editorRef.current.setContent(formValue || '');
            lastPropValue.current = formValue;
        }
    }, [formValue]);

    return <textarea ref={textareaRef} />;
};

export default TinyEditor;
