import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink } from "reactstrap";
import IsLoginForm from "./IsLoginForm";
import IsSignUpForm from "./IsSignUpForm";

const LoginModal = ({ buttonLabel, signUpUser, loginUser }) => {
    const [modal, setModal] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    const toggle = () => {
        setModal(!modal);
        setShowLogin(true);
    };

    const toggleLogin = () => setShowLogin(!showLogin);

    return (
        <div>
            <NavLink onClick={toggle}>{buttonLabel}</NavLink>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    {showLogin ? "Login" : "Sign Up"}
                </ModalHeader>
                <ModalBody>
                    {showLogin ? (
                        <IsLoginForm loginUser={loginUser} toggle={toggle} />
                    ) : (
                            <IsSignUpForm signUpUser={signUpUser} toggle={toggle} />
                        )}
                </ModalBody>
                <ModalFooter>
                    <Button color="link" onClick={toggleLogin}>
                        {showLogin
                            ? "Not registered? Sign Up Now"
                            : "Already a user? Sign In"}
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default LoginModal;