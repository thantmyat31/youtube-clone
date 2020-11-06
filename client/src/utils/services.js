export const getUserImageUri = (user) => {
    if(user) {
        if(user.image) {
            return `http://localhost:2020/${user.image}`;
        } else {
            return `https://ui-avatars.com/api/?name=${user.displayName}&size=40&background=random`;
        }
    }

    return null;
}