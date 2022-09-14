import { useCallback, useState } from 'react';
import './App.css';

const url = 'https://randomuser.me/api';

const loadUser = async () => {
    const response = await fetch(url);
    const {results} = await response.json();
    return {
        name: `${results[0].name.title} ${results[0].name.first} ${results[0].name.last}`,
        picture: results[0].picture.large,
        gender: results[0].gender
    };
}
const useGetUser = (initialState = []) => {
    const [state, setState] = useState(initialState);
    const getUsers = useCallback(async () => {
        const users = await loadUser();
        return setState(users);
    }, []);
    return [state, getUsers];
}

function App() {
    const [user, setUser] = useGetUser();
    return (<div className="App">
        <header className="App-header">
                <img src={user.picture} alt={user.picture}></img>
                <p>
                <strong>{user.name}</strong> <br/>
                <small>{ user.gender }</small>
                </p>
            <button className="App-button" onClick={setUser}>Load User</button>
        </header>
    </div>);
}

export default App;
