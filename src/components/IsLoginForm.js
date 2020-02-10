import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, FormGroup, Input, Label, Form } from "reactstrap";
import { toast } from "react-toastify";

const IsLoginForm = ({ loginUser, toggle }) => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const successLogin = () => {
        toggle()
        setUsername('')
        setPassword('')
    }

    const validateForm = () => {
        return username.length > 0 && password.length > 0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        loginUser(username, password, successLogin)
    }
    const handleInput = e => {
        setUsername(e.target.value)
    }

    const handleInput2 = e => {
        setPassword(e.target.value)
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Username</Label>
                    <Input
                        autoFocus
                        type="text"
                        value={username}
                        onChange={handleInput}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        value={password}
                        onChange={handleInput2}
                    />
                </FormGroup>

                <Button disabled={!validateForm()} type="submit">Login</Button>
            </Form>
        </div>
    );
}

export default IsLoginForm;