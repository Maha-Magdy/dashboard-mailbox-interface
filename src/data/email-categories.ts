import type { EmailCategory } from "../types/email";

export const emailCategories: EmailCategory[] = ["work", "documents", "social", "advertising", "clients"];

export const categoryColors: Record<EmailCategory, string> = {
    work: 'primary',
    documents: 'red.500',
    social: 'blue.600',
    advertising: 'cyan.500',
    clients: 'orange.300',
};