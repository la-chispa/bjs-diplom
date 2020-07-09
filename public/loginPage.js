'use strict';

const userForm = new UserForm();
userForm.loginFormCallback = data => console.log(data);
userForm.loginFormCallback = (data) => ApiConnector.login(data, response => {
	if (!response.success) {
		return setLoginErrorMessage(message);
	} else {
		return location.reload();
	}
});

userForm.registerFormCallback = (data) =>  ApiConnector.register(data, response => {
	if (!response.success) {
		return registerFormCallback(message);
	} else {
		return location.reload();
	}
})