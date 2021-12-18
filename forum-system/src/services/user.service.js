import Backendless from 'backendless';

export class UserService {

    userStore = Backendless.Data.of("Users")

    async getUserById(id) {
        return await this.userStore.findById(id);
    }

    async getUserByUsername(username) {
        const clause = `username = '${username}'`;
        const query = Backendless.DataQueryBuilder.create().setWhereClause(clause);

        try {
            return await this.userStore.findFirst(query)
        } catch (e) {
            return null;
        }
    }

    async checkIfUserIsLoggedIn() {
        return await Backendless.UserService.isValidLogin();
    }

    async checkIfCurrUserIsAdmin() {
        const currUser = await this.getCurrUser();
        return currUser.isAdmin;
    }

    async registerNewUser(username, email, password) {
        const user = new Backendless.User();
        Object.assign(user, {username, email, password})
        await Backendless.UserService.register(user);
        await this.logoutUser()
        await Backendless.UserService.login(username, password, true);
    }

    async verifyIfUserIsLoggedIn() {
        return await Backendless.UserService.isValidLogin();
    }

    async loginUser(username, password, rememberMe) {
        try {
            if (!rememberMe) {
                rememberMe = false;
            }
            await Backendless.UserService.login(username, password, rememberMe);
            return true;
        } catch (e) {
            return false;
        }
    }

    async getCurrUser() {
        try {
            return await Backendless.UserService.getCurrentUser();
        } catch (e) {
            return null;
        }
    }

    async verifyEmailUnique(email) {
        let emailClause = `email = '${email}'`
        let queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(emailClause);

        try {
            return !await this.userStore.findFirst(queryBuilder);
        } catch (e) {
            return false;
        }
    }

    async verifyUsernameUnique(username) {
        let usernameClause = `username = '${username}'`
        let queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(usernameClause);

        try {
            return !await this.userStore.findFirst(queryBuilder);
        } catch (e) {
            return false;
        }
    }

    async logoutUser() {
        await Backendless.UserService.logout();
    }
}
