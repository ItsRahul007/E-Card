import React from 'react'
import Login from './Login';
import Signup from './Signup';

interface auth {
    rout: string;
}
const Auth: React.FC<auth> = ({ rout }) => {
    return (
        <section>
            {rout.toLocaleLowerCase() === "login" && <Login />}
            {rout.toLocaleLowerCase() === "signup" && <Signup />}
        </section>
    )
}

export default Auth;