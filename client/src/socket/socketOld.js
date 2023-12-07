import { SERVER_ADDRESS } from "../../util/config"
import io from 'socket.io-client';


const socket = io(SERVER_ADDRESS, {
    autoConnect: false
});

const sessionID = sessionStorage.getItem("sessionID");
if (sessionID) {
    console.log(sessionID)
    socket.auth = { sessionID };
}
socket.connect();

export default function Login() {



    const [token, setToken] = useState();
    const [server, setServer] = useState(undefined);
    const [username, setUserName] = useState(undefined);
    const [password, setPassword] = useState(undefined);


    socket.on("connect_error", (error) => {
        setServer(undefined);
    });

    socket.on("connect", (error) => {
        setServer("online");
    });

    socket.on("session", ({ sessionID, userID }) => {
        // attach the session ID to the next reconnection attempts
        socket.auth = { sessionID };
        // store it in the localStorage
        sessionStorage.setItem("sessionID", sessionID);
        // save the ID of the user
        socket.userID = userID;
    });

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }

    if (!server) {
        return (
            <div style={{ textAlign: 'center' }}>Server offline</div>
        );
    }
    if (!token) {
        return (
            <div className="login-wrapper">
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={e => setUserName(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
                <div>
                    <button>Sign up</button>
                </div>
            </div>
        );
    }

    return (
        <Navigate to="/home" />
    );

}
