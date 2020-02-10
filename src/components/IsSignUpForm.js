import React, { useState } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback, Form } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const IsSignUpForm = ({ signUpUser, toggle }) => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [delay, setDelay] = useState(null);
    const [usernameValid, setUsernameValid] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState("");

    const successCallback = () => {
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        toggle();
    };

    const validateForm = () => {
        return email.length > 0 && password.length > 0 && username.length > 0 && confirmPassword.length > 0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        signUpUser(username, email, password, successCallback);
    }

    const checkUsername = newUsername => {

        console.log("Making API call to check username!");

        axios
            .get(`https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`)

            .then(response => {

                console.log(response.data);

                if (response.data.valid) {
                    setUsernameValid(true);
                }

                else {
                    setUsernameValid(false);
                }
            });
    };

    const handleInput2 = e => {
        clearTimeout(delay);
        setUsername(e.target.value)

        const newUsername = e.target.value;
        setUsername(newUsername);

        const newDelay = setTimeout(() => {
            checkUsername(newUsername);
        }, 500);

        setDelay(newDelay);

    };

    const handleInput = e => {
        setEmail(e.target.value)
    }

    const handleInput3 = e => {
        setPassword(e.target.value)
    }

    const handleInput4 = e => {
        setConfirmPassword(e.target.value)
    }

    const getInputProp = () => {
        if (!username.length) {
            return null;
        }

        if (username.length <= 6) {
            return { invalid: true };
        }

        if (usernameValid) {
            return { valid: true };
        } else {
            return { invalid: true };
        }
    };

    const getFormFeedback = () => {
        if (!username.length) {
            return null;
        }

        if (username.length <= 6) {
            return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
        }

        if (usernameValid) {
            return <FormFeedback valid>Sweet! That name is available</FormFeedback>;
        } else {
            return <FormFeedback invalid>Sorry! Username is taken</FormFeedback>;
        }
    };

    const getInputProp2 = () => {
        if (!password.length) {
            return null;
        }

        if (password.length <= 6) {
            return { invalid: true };
        }
    };

    const getFormFeedback2 = () => {
        if (!password.length) {
            return null;
        }

        if (password.length <= 6) {
            return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
        }
    };

    const getInputProp3 = () => {
        if (!confirmPassword.length) {
            return null;
        }

        if (password !== confirmPassword) {
            return { invalid: true };
        }
    };

    const getFormFeedback3 = () => {
        if (!confirmPassword.length) {
            return null;
        }

        if (password !== confirmPassword) {
            return <FormFeedback invalid>Password does not match the original password</FormFeedback>;
        }
    };

    return (
        <div className="SignUp">
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        autoFocus
                        type="email"
                        value={email}
                        onChange={handleInput}
                    />
                </FormGroup>

                <FormGroup >
                    <Label>Username</Label>
                    <Input
                        autoFocus
                        type="text"
                        value={username}
                        onChange={handleInput2}
                        {...getInputProp()}
                    />
                    {getFormFeedback()}
                </FormGroup>

                <FormGroup >
                    <Label>Password</Label>
                    <Input
                        type="password"
                        value={password}
                        onChange={handleInput3}
                        {...getInputProp2()}
                    />
                    {getFormFeedback2()}
                </FormGroup>

                <FormGroup controlId="password" bsSize="large">
                    <Label>Confirm Password</Label>
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={handleInput4}
                        {...getInputProp3()}
                    />
                    {getFormFeedback3()}
                </FormGroup>

                <Button disabled={!validateForm()} type="submit">Submit</Button>
            </Form>
        </div>
    );
}

export default IsSignUpForm;