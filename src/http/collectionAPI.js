import { $host } from ".";

export const fetchUserCollections = async (userId) => {
    const { data } = await $host.get("api/collection/us/" + userId);
    return data;
};

export const fetchCollection = async (collectionId) => {
    const { data } = await $host.get("api/collection/col/" + collectionId);
    return data;
}

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
