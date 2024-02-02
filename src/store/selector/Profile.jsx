import { selector } from "recoil";
import { usernameAtom } from '../atom/Profile';
import axios from 'axios';

export const profileInfoSelector = selector({
    key: "profileInfoSelector",
    get: async ({get}) => {
        const username = get(usernameAtom);
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            return response.data;
        } catch (error) {
            // console.log("An Error Occurred in profileInfoSelector: ", error);
            if (error.response.status === 404) {
                throw new Error(`User Data not found`);
            }
            throw error;
        }
    }
})