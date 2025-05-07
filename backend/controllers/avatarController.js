import defaultAvatar from "../models/avatarModel.js";

let avatar = {...defaultAvatar}; //simulated per-user avatar

const XP_THRESHOLD = 100;
const SHIELD_COST = 100;

export const getAvatar = (req, res) => {
    res.json(req.user.avatar);
};

export const completeTask = (req, res) => {
    const avatar = req.user.avatar;

    const baseXP = 10;
    const bonus = avatar.streak*2;

    avatar.xp += baseXP + bonus;
    avatar.streak += 1;
    avatar.mood = Math.min(avatar.mood + 5, 100);
    avatar.currency += 20;

    //Level Up
    if (avatar.xp >= XP_THRESHOLD) {
        avatar.level += 1;
        avatar.xp = 0;
    }

    res.json(avatar);
};

export const missedTask = (req, res) => {
    const avatar = req.user.avatar;
    
    if (avatar.hasShield) {
        avatar.hasShield = false;
    } else {
        avatar.streak = 0;
        avatar.xp = Math.max(avatar.xp - 5, 0);
        avatar.mood = Math.max(avatar.mood - 15, 0);
    }

    res.json(avatar);
};

export const buyShield = (req, res) => {
    const avatar = req.user.avatar;
    
    if (Qavatar.hasShield && avatar.currency >= SHIELD_COST) {
        avatar.currency -= SHIELD_COST;
        avatar.hasShield = true;
        res.json({success: true, avatar});
    } else {
        res.json({success: false, message: "Cannot buy shield", avatar});
    }
};
