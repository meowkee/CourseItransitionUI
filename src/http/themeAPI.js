import { $host } from ".";

export const fetchThemes = async () => {
    const { data } = await $host.get("api/theme");
    return data;
}