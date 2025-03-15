import { createContext } from 'react'
import { useState, useEffect } from 'react';
const AuthState = createContext(); // Context generated to save user's info across pages automatically

//Functional component: provide the context to its child components, where {children } = prop = nested components (pages) inside AuthStateProvider
const AuthStateProvider = ({ children }) => {
    //Initialize state variable and state function to update the variable

    const [user, setUser] = useState(() => {
        //Ways the state variable (user) will be assign
        //1 -- get the saved user in localStorage
        //2 -- create a default guest user
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : {
            username: "guest",
            role: "guest"
        }
    }
    );
    //////////////////////////////
    //----Update localStorage whenever user state changes using useEffect hook. 
    //The dependency array [user] ensures this effect runs only when user changes
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);
    /////////////////////////////
    //---Provide context
    return (
        <AuthState.Provider value={{ user, setUser }}>
            {children}
        </AuthState.Provider>
    );
};


export { AuthState, AuthStateProvider };