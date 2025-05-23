import React, { useState, useEffect } from 'react';

const TextAreaInput = ({ initialValue = '', onChange }) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <textarea
            value={value}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={5}
        />
    );
};

export default TextAreaInput;
