import { pagination } from "./Response";
import User from "./User";


export interface Follow {
    followCount: number;
    followers: pagination<User[]>;
    follows: pagination<User[]>;
    followerCount: number;
}