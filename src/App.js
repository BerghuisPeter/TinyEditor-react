import './App.css';
import TinyEditor from "./TinyEditor";
import { useState } from "react";


const App = () => {
    const [formValue, setFormValue] = useState('<p>Hello, TinyMCE!</p>');

    return (
        <div className="p-4">
            <TinyEditor
                formValue={formValue}
                onChange={setFormValue}
            />
            <button
                className="mt-4 p-2 border"
                onClick={() => setFormValue('<p>Updated from Parent!</p>')}
            >
                Set New Content
            </button>
            <h3 className="mt-4">Live Preview:</h3>
            <div
                className="border p-2"
                dangerouslySetInnerHTML={{ __html: formValue }}
            />
        </div>
    );
};
export default App;
