import { create } from "zustand";

type MailboxState = {
    unreadMailsCount: number;
    setUnreadMailsCount: (count: number) => void;
}

export const useMailboxStore = create<MailboxState>((set) => ({
    unreadMailsCount: 0,
    setUnreadMailsCount: (count) => set(() => ({ unreadMailsCount: count })),
}));