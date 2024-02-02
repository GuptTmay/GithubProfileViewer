import { atom } from "recoil";

export const usernameAtom = atom({
    key: "usernameAtom",
    default: "",
})

export const renderProfileAtom = atom({
    key: "renderProfileAtom",
    default: false,
});

export const renderInfoAtom = atom({
    key: "renderInfoAtom",
    default: 0,
})