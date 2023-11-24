import React, { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../../index.js";
import { observer } from "mobx-react-lite";
import { fetchCollection } from "../../http/collectionAPI.js";
import { useParams } from "react-router-dom";
import { deleteItem, fetchItems } from "../../http/itemAPI.js";
import Markdown from "react-markdown";
import Modal from "react-modal";
import { ModalItemPage } from "../../components/ModalItemPage/index.js";
import { Spinner } from "../../components/Spinner/index.js";
import { ItemTable } from "../../components/ItemTable/index.js";

export const CollectionPage = observer(() => {
    const { collections, items } = useContext(Context);
    const { id } = useParams();
    const [selectedItems, setSelectedItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const getAndSetItems = useCallback(
        async (id) => {
            const fetchedItems = await fetchItems(id);
            items.setItems(fetchedItems);
        },
        [items]
    );

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const fetchedCurrentCollection = await fetchCollection(id);
            collections.setCurrentCollection(fetchedCurrentCollection);
            await getAndSetItems(id);
            setLoading(false);
        };

        fetchData();
    }, [id, collections, getAndSetItems]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const toggleSelection = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems((prev) => prev.filter((id) => id !== itemId));
        } else {
            setSelectedItems((prev) => [...prev, itemId]);
        }
    };

    const handleDeleteSelected = async () => {
        await Promise.all(selectedItems.map((item) => deleteItem(item)));
        getAndSetItems(id);
    };

    if (loading) return <Spinner />;

    return (
        <div className="container mx-auto p-8">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">
                    {collections.currentCollection?.name} by{" "}
                    {collections.currentCollection.user?.name}
                </h1>
                <div className="flex space-x-4">
                    <button
                        onClick={handleOpenModal}
                        className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
                    >
                        Add Item
                    </button>
                    <button
                        onClick={handleDeleteSelected}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                    >
                        Delete Selected
                    </button>
                </div>
            </div>
            <div>
                <Markdown>{collections.currentCollection.description}</Markdown>
            </div>
            <div className="overflow-x-auto">
                <ItemTable
                    items={items}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    toggleSelection={toggleSelection}
                    collections={collections}
                />
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Add Item Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 opacity-50"></div>
                <ModalItemPage id={id} handleCloseModal={handleCloseModal} />
            </Modal>
        </div>
    );
});
