export type EmailCategory = 'work' | 'documents' | 'social' | 'advertising' | 'clients';

export interface Email {
    id: string | number;
    from: {
        name: string;
        email: string;
    };
    to: {
        name: string;
        email: string;
    };
    cc?: {
        name: string;
        email: string;
    };
    sentAt: string;
    subject: string;
    body: string;
    category?: EmailCategory;
    hasAttachment: boolean;
    isRead: boolean;
}