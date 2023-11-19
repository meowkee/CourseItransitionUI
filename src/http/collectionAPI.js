import { $host } from ".";

export const fetchCollections = async (id) => {
    const { data } = await $host.get("api/collection/" + id);
    return data;
};

export const createCollection = async (collection, userId) => {
    const { data } = await $host.post("api/collection", {
        name: collection.name,
        description: collection.description,
        userId: userId,
        themeId: collection.themeId,
        fields: collection.subfields,
    });
    return data;
};

export const deleteCollection = async (id) => {
    const { data } = await $host.delete("api/collection/" + id);
    return data;
};
