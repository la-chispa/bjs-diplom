const userLogout = new LogoutButton();
userLogout.action = logout => console.log(logout);
userLogout.action = (logout) => ApiConnector.logout(response => {
	if (response) {
		return location.reload();
	}
})
