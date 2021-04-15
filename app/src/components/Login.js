import login from '../services/login';

import Toggable from './Toggable';

function Login({ setErrorMessage, username, setUsername, password, setPassword, setUser }) {

    //Form Actions
    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        try {
            const credentials = {
                username,
                password
            };

            const user = await login(credentials);
            setUser(user);
            //Guardamos el token en LocalStorage
            window.localStorage.setItem('loggedUser', JSON.stringify(user));

        } catch (error) {
            setErrorMessage('Credenciales inválidas');
            //En 5 segundos se borra el mensaje para que desaparezca de la pantalla
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }

    }

    const changeLoginUsername = (event) => {
        setUsername(event.target.value);
    }

    const changeLoginPassword = (event) => {
        setPassword(event.target.value);
    }

    return (
        <Toggable buttonLabel="Mostrar login">

            <form onSubmit={handleLoginSubmit}>
                <div>
                    <input
                        type="text"
                        value={username}
                        name='username'
                        placeholder="Usuario"
                        onChange={changeLoginUsername}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        name='password'
                        placeholder="Contraseña"
                        onChange={changeLoginPassword}
                    />
                </div>
                <div>
                    <button id="login-form-button">Login</button>
                </div>
            </form>

        </Toggable>
    );
}

export default Login;
