import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";

const BASE_URL='https://quill-app-backend.onrender.com';

export default function CreatePost() {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(ev) {
    const data = new FormData();
    data.append('title', title);
    data.append('summary', summary);
    data.append('content', content);
    data.append('file', files[0]);
    ev.preventDefault();
    const response = await axios.post(`${BASE_URL}/post`, 
      data,
      { 
        headers: { 'Content-Type': 'multipart/form-data' }, 
        withCredentials: true,
      });
    //const response = await fetch(`${BASE_URL}/post`, {
      //method: 'POST',
      //body: data,
      //credentials: 'include',
    //});
    console.log(response);
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form onSubmit={createNewPost}>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{marginTop:'5px'}}>Create post</button>
    </form>
  );
}
