import { $host } from ".";

export const fetchItems = async (collectionId) => {
    const { data } = await $host.get("api/item/col/" + collectionId);
    return data;
};

export const fetchOneItem = async (itemId) => {
    const { data } = await $host.get("api/item/" + itemId);
    return data;
};

export const createItem = async (item, collectionId) => {
    const { data } = await $host.post("api/item", {
        name: item.name,
        tags: item.tags,
        fields: item.fields,
        collectionId: collectionId,
    });
    return data;
};

export const deleteItem = async (itemId) => {
    const { data } = await $host.delete("api/item/" + itemId);
    return data;
};
