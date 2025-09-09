import { v4 as uuidv4 } from 'uuid';
import { mockEmails } from "../data/mock-emails";
import type { Email } from "../types/email";

const EMAIL_STORAGE_KEY = 'email-storage';

export const initializeEmails = () => {
    if (!localStorage.getItem(EMAIL_STORAGE_KEY)) {
        localStorage.setItem(EMAIL_STORAGE_KEY, JSON.stringify(mockEmails));
    }
};

// Create a new email
export const sendNewEmail = (email: Omit<Email, 'id' | 'sentAt' | 'isRead'>) => {
    const emails: Email[] = JSON.parse(localStorage.getItem(EMAIL_STORAGE_KEY) || '[]');
    const newEmail: Email = {
        ...email,
        id: uuidv4(),
        sentAt: new Date().toISOString(),
        isRead: false,
    };
    emails.push(newEmail);
    localStorage.setItem(EMAIL_STORAGE_KEY, JSON.stringify(emails));
    return newEmail;
};

// Read an email
export const getEmail = (emailId: string | number) => {
    const emails: Email[] = JSON.parse(localStorage.getItem(EMAIL_STORAGE_KEY) || '[]');
    return emails.find(email => email.id === emailId);
}

// Read emails for a specific user
export const getEmailsForUser = (userEmail: string, folderId?: string) => {
    const emails: Email[] = JSON.parse(localStorage.getItem(EMAIL_STORAGE_KEY) || '[]');

    if (folderId === 'inbox') {
        return emails.filter(email => email.to.email === userEmail).sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
    }

    if (folderId === 'sent') {
        return emails.filter(email => email.from.email === userEmail).sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
    }

    return [];
};

// Read the count of unread emails for a specific user
export const getCountOfUnreadEmails = (userEmail: string) => {
    const emails: Email[] = JSON.parse(localStorage.getItem(EMAIL_STORAGE_KEY) || '[]');

    return emails.filter(email => email.to.email === userEmail && !email.isRead).length;
};

// Update an email (mark as read)
export const markEmailAsRead = (emailId: string | number) => {
    const emails: Email[] = JSON.parse(localStorage.getItem(EMAIL_STORAGE_KEY) || '[]');
    const updatedEmails = emails.map(email =>
        email.id === emailId ? { ...email, isRead: true } : email
    );
    localStorage.setItem(EMAIL_STORAGE_KEY, JSON.stringify(updatedEmails));
};

// Delete an email
export const deleteEmail = (emailId: string | number) => {
    const emails: Email[] = JSON.parse(localStorage.getItem(EMAIL_STORAGE_KEY) || '[]');
    const updatedEmails = emails.filter(email => email.id !== emailId);
    localStorage.setItem(EMAIL_STORAGE_KEY, JSON.stringify(updatedEmails));
};
