const userLogout = new LogoutButton();
userLogout.action = () => {
	ApiConnector.logout((response) => {
		if (response.success) {
			location.reload();
		}
	});
}

ApiConnector.current((response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
})

const userRatesBoard = new RatesBoard();
getRatesBoard = () => {
	ApiConnector.getStocks((response) => {
		if (response.success) {
			userRatesBoard.clearTable();
			userRatesBoard.fillTable(response.data);
		}
	})
}
getRatesBoard();
setInterval(getRatesBoard, 60000);

const userMoneyManager = new MoneyManager();
userMoneyManager.addMoneyCallback = (data) => ApiConnector.addMoney(data, response => {
	if (response.success) {
		userMoneyManager.setMessage(false, `Вы пополнили счёт на ${data.amount} ${data.currency}`);
		ProfileWidget.showProfile(response.data);
	} else { 
		userMoneyManager.setMessage(true, response.data);
	}
});

userMoneyManager.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, response => {
	if (response.success) {
		userMoneyManager.setMessage(false, `Вы конвертировали ${data.fromAmount} ${data.fromCurrency} в ${data.targetCurrency}`);
		ProfileWidget.showProfile(response.data);
	} else { 
		userMoneyManager.setMessage(true, response.data);
	}
})

userMoneyManager.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, response => {
	if (response.success) {
		userMoneyManager.setMessage(false, `Вы перевели ${data.amount} ${data.currency}`);
		ProfileWidget.showProfile(response.data);
	} else { 
		userMoneyManager.setMessage(true, response.data);
	}
})

const userFavoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
	if (response.success) {
		userFavoritesWidget.clearTable();
		userFavoritesWidget.fillTable(response.data);
		userMoneyManager.updateUsersList(response.data);
	}
})

userFavoritesWidget.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, response => {
	if (response.success) {
		userFavoritesWidget.setMessage(false, `Вы добавили пользователя ${data.name} в адресную книгу`)
		userFavoritesWidget.clearTable();
		userFavoritesWidget.fillTable(response.data);
		userMoneyManager.updateUsersList(response.data);
	} else {
		userFavoritesWidget.setMessage(true, response.data);
	}
})

userFavoritesWidget.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, response => {
	if (response.success) {
		userFavoritesWidget.setMessage(false, `Вы удалили пользователя из адресной книги`)
		userFavoritesWidget.clearTable();
		userFavoritesWidget.fillTable(response.data);
		userMoneyManager.updateUsersList(response.data);
	} else {
		userFavoritesWidget.setMessage(true, response.data);
	}
})














