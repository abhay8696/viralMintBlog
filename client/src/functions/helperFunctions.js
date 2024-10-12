export const saveToLocal = (name, data) => {
    if (!data || !name) return;
    window.localStorage.setItem(name, JSON.stringify(data));
};
