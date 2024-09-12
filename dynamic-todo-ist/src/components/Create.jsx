import React, { useState } from "react";
import axios from "axios";

const Create = () => {
    const [listData, setListData] = useState("");

    const handleTodo = () => {
        axios.post('http://localhost:5000/api/add_todo_list', { task: listData })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return (
        <>
            <input
                type="text"
                value={listData}
                onChange={(e) => setListData(e.target.value)}
            />
            <button onClick={handleTodo}>Add Data</button>
        </>
    );
}

export default Create;
