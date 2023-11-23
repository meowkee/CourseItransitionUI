import { useContext, useState } from "react";
import { Context } from "../..";
import { createItem, fetchItems } from "../../http/itemAPI";

export const ModalItemPage = ({ id, handleCloseModal }) => {
    const {
        collections: { currentCollection }, items
    } = useContext(Context);
    const [newItem, setNewItem] = useState({
        name: "",
        tags: [],
        fields: currentCollection.fields.map((field) => ({
            fieldId: field.id,
            value: "",
        })),
    });

    const handleCreateItem = async () => {
        try {
            console.log(newItem);
            await createItem(newItem, currentCollection.id);
            const updatedItems = await fetchItems(currentCollection.id);
            items.setItems(updatedItems);
            handleCloseModal();
        }
        catch (e) {
            console.log(e);
        }
        
    };

    const modalContentStyle = {
        maxHeight: "80vh",
        overflowY: "auto",
    };

    const handleFieldChange = (fieldId, value) => {
        setNewItem((prev) => ({
            ...prev,
            fields: prev.fields.map((field) =>
                field.fieldId === fieldId ? { ...field, value } : field
            ),
        }));
    };

    return (
        <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-lg max-w-xl w-full overflow-y-auto"
            style={modalContentStyle}
        >
            <h2 className="text-2xl font-bold mb-4">Add item</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Name:
                </label>
                <input
                    type="text"
                    className="mt-1 p-2 border rounded w-full"
                    value={newItem.name}
                    onChange={(e) =>
                        setNewItem((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Tags:
                </label>
                <input
                    type="text"
                    className="mt-1 p-2 border rounded w-full"
                    value={newItem.tags.join(", ")}
                    onChange={(e) =>
                        setNewItem((prev) => ({
                            ...prev,
                            tags: e.target.value.split(", "),
                        }))
                    }
                />
            </div>
            {currentCollection.fields?.map((field) => (
                <div key={field.id} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        {field.name}:
                    </label>
                    <input
                        type="text"
                        className="mt-1 p-2 border rounded w-full"
                        value={
                            newItem.fields.find((f) => f.fieldId === field.id)
                                ?.value || ""
                        }
                        onChange={(e) =>
                            handleFieldChange(field.id, e.target.value)
                        }
                    />
                </div>
            ))}
            <div className="flex justify-between">
                <button
                    onClick={handleCreateItem}
                    className="bg-green-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-green-600"
                >
                    Create Item
                </button>
                <button
                    onClick={handleCloseModal}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};
