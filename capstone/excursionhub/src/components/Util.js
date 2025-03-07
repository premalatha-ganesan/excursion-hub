export default function getUserInitials(user) {
    const firstInitial = user.firstName ? user.firstName[0] : "";
    const lastInitial = user.lastName ? user.lastName[0] : "";
    return (firstInitial + lastInitial).toUpperCase();
}

 