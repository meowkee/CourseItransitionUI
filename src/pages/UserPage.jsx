import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { useParams, Link } from "react-router-dom";
import {
    fetchUserCollections,
    createCollection,
    deleteCollection
} from "../http/collectionAPI";
import { Routes } from "../utils/consts";
import Modal from "react-modal";
import { fetchThemes } from "../http/themeAPI";
import { observer } from "mobx-react-lite";
import { fetchUserById } from "../http/userAPI";
import { useIsAuthor } from "../hooks/useIsAuthor";

const UserPage = observer(() => {
    const { collections, themes } = useContext(Context);
    const [currentUserPage, setCurrentUserPage] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCollection, setNewCollection] = useState({
        name: "",
        description: "",
        themeId: null,
        subfields: [],
    });
    const { id } = useParams();
    const isAuthor = useIsAuthor(id);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCollections = await fetchUserCollections(id);
            collections.setCollections(fetchedCollections);
            const fetchedThemes = await fetchThemes();
            themes.setThemes(fetchedThemes);
            const fetchedUser = await fetchUserById(id);
            setCurrentUserPage(fetchedUser);
        };

        fetchData();
    }, [id, collections, themes]);

    const handleDeleteCollection = async (collectionId) => {
        await deleteCollection(collectionId);
        const data = await fetchUserCollections(id);
        collections.setCollections(data);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setNewCollection({
            name: "",
            description: "",
            themeId: null,
            subfields: [],
        });
        setIsModalOpen(false);
    };

    const handleCreateCollection = async () => {
        const themeId =
            newCollection.themeId !== null
                ? newCollection.themeId
                : themes[0].id;
        await createCollection({ ...newCollection, themeId: themeId }, id);
        const updatedCollections = await fetchUserCollections(id);
        collections.setCollections(updatedCollections);
        setIsModalOpen(false);
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
        <div className="container mx-auto p-14 relative">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">
                    {currentUserPage.user && currentUserPage.user.name}{" "}
                    collections:
                </h1>
                {isAuthor && (
                    <button
                        onClick={handleOpenModal}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                        Add collection
                    </button>
                )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {collections.collections.map((collection) => (
                    <div
                        key={collection.id}
                        className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 relative"
                    >
                        <Link
                            to={Routes.COLLECTION + `/${collection.id}`}
                            className="text-blue-500 hover:underline text-lg font-semibold mb-2 block"
                        >
                            {collection.name}
                        </Link>
                        <p className="text-gray-600 mb-4">
                            {collection.theme.name}
                        </p>
                        {isAuthor ? (
                            <button
                                onClick={() =>
                                    handleDeleteCollection(collection.id)
                                }
                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        ) : null}
                    </div>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Add Collection Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
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
            </Modal>

            {isModalOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 opacity-50"></div>
            )}
        </div>
    );
});

export default UserPage;
