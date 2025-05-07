import bcrypt from 'bcryptjs';

export class User {
    constructor(username, password) {
        this.username = username;
        this.passwordHash = bcrypt.hashSync(password, 10);
        this.avatar = {
            level: 1,
            xp: 0,
            currency: 0,
            streak: 0,
            mood: 100,
            hasShield: false,
            inventory: [],
        };
    }
    validatePassword(password) {
        return bcrypt.compareSync(password, this.passwordHash);
    }
}

//Temporary "database" (object) for users
export const users = {}; // {username: User}