export const getUserImageUrl = async (url: string) => {
    try {
        const { default: imageUrl } = await import(url);
        return imageUrl;
    } catch (err) {
        const { default: defaultImageUrl } = await import('../assets/user-profile-photos/default-user.jpg');
        return defaultImageUrl;
    }
};