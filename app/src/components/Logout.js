
function Logout({ user, setUser }) {

    const handleLogout = () => {
        setUser(null);
        //Eliminamos el token en LocalStorage
        window.localStorage.removeItem('loggedUser');
    }

    return (
        <div className="logout">
            <h2>Hola <b>{user.name}</b></h2>
            <button
                onClick={handleLogout}
            >Salir
            </button>
        </div>
    );
}

export default Logout;
