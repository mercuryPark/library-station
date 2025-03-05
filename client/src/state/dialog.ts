import { atom } from "jotai";

export const creatDialogState = atom({
    visible: false,
});

export const editDialogState = atom({
    visible: false,
    data: null,
});
