import { $host } from ".";

export const fetchItems = async (collectionId) => {
    const { data } = await $host.get("api/item/" + collectionId);
    return data;
};
