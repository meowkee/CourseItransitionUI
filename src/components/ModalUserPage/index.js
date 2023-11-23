import { useContext, useState } from "react";
import { createCollection, fetchUserCollections } from "../../http/collectionAPI";
import { Context } from "../..";

export const ModalUserPage = ({id, handleCloseModal}) => {
    const [newCollection, setNewCollection] = useState({
        name: "",
        description: "",
        themeId: null,
        subfields: [],
    });
    const {collections, themes} = useContext(Context);

    const handleCreateCollection = async () => {
        const themeId =
            newCollection.themeId !== null
                ? newCollection.themeId
                : themes.themes[0].id;
        await createCollection({ ...newCollection, themeId: themeId }, id);
        const updatedCollections = await fetchUserCollections(id);
        collections.setCollections(updatedCollections);
        handleCloseModal();
    };

    const handleAddSubfield = () => {
        setNewCollection((prev) => ({
            ...prev,
            subfields: [...prev.subfields, { name: "", type: "text" }],
        }));
    };

    const handleSubfieldChange = (index, field, value) => {
        setNewCollection((prev) => ({
            ...prev,
            subfields: prev.subfields.map((subfield, i) =>
                i === index ? { ...subfield, [field]: value } : subfield
            ),
        }));
    };

    const handleTypeChange = (index, value) => {
        handleSubfieldChange(index, "type", value);
    };

    const modalContentStyle = {
        maxHeight: "80vh",
        overflowY: "auto",
    };

    return (
        <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-lg max-w-xl w-full overflow-y-auto"
            style={modalContentStyle}
        >
            <h2 className="text-2xl font-bold mb-4">Add Collection</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Name:
                </label>
                <input
                    type="text"
                    className="mt-1 p-2 border rounded w-full"
                    value={newCollection.name}
                    onChange={(e) =>
                        setNewCollection((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Description (Markdown):
                </label>
                <textarea
                    className="mt-1 p-2 border rounded w-full"
                    value={newCollection.description}
                    onChange={(e) =>
                        setNewCollection((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Theme:
                </label>
                <select
                    className="mt-1 p-2 border rounded w-full"
                    value={newCollection.themeId}
                    onChange={(e) =>
                        setNewCollection((prev) => ({
                            ...prev,
                            themeId: e.target.value,
                        }))
                    }
                >
                    {themes.themes.map((theme) => (
                        <option key={theme.id} value={theme.id}>
                            {theme.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Subfields:
                </label>
                {newCollection.subfields.map((subfield, index) => (
                    <div key={index} className="mb-2">
                        <input
                            type="text"
                            placeholder="Name"
                            className="mt-1 p-2 border rounded w-full"
                            value={subfield.name}
                            onChange={(e) =>
                                handleSubfieldChange(
                                    index,
                                    "name",
                                    e.target.value
                                )
                            }
                        />
                        <select
                            className="mt-1 p-2 border rounded w-full"
                            value={subfield.type}
                            onChange={(e) =>
                                handleTypeChange(index, e.target.value)
                            }
                        >
                            <option value="text">Text</option>
                            <option value="date">Date</option>
                            <option value="boolean">Boolean</option>
                            <option value="string">String</option>
                            <option value="number">Number</option>
                        </select>
                    </div>
                ))}
                <button
                    onClick={handleAddSubfield}
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    +
                </button>
            </div>
            <div className="flex justify-between">
                <button
                    onClick={handleCreateCollection}
                    className="bg-green-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-green-600"
                >
                    Create Collection
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
