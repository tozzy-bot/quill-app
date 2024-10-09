# Quill: MERN stack application

This is a repository of Quill, a web application that was made using MongoDB, Express, React and Nodejs stack. Please follow the instructions to set up the project.

**Features**

1.  Responsive Web Design for pc, tablets and mobile
2.  Login and Registration of new Users
3.  CRUD for posts by logged in users
4.  Password Encryption before uploading it to the database

[Deployed Site](https://quill-app-frontend.onrender.com)

## Instruction
+   run npm i && npm start for both frontend and backend side to start the app.
  
---

***Registering User***
```
export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      alert('registration successful');
    } else {
      alert('registration failed');
    }
  }
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button>Register</button>
    </form>
  );
}
```

***Index Page for Logged In Users and Guest***
```
export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/post`).then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))}
    </>
  );
}
```
