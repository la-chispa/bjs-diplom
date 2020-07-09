'use strict';

const userForm = new UserForm();
userForm.loginFormCallback = data => console.log(data);
userForm.loginFormCallback = (data) => ApiConnector.login(data, response => setLoginErrorMessage(message));