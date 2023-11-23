import React, { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../../index.js";
import { observer } from "mobx-react-lite";
import { fetchCollection } from "../../http/collectionAPI.js";
import { Link, useParams } from "react-router-dom";
import { fetchItems } from "../../http/itemAPI.js";
import Markdown from "react-markdown";
import { Routes } from "../../utils/consts.js";
import Modal from "react-modal";
import { ModalItemPage } from "../../components/ModalItemPage/index.js";
import { Spinner } from "../../components/Spinner/index.js";

export const CollectionPage = observer(() => {
    const { collections, items } = useContext(Context);
    const { id } = useParams();
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const fetchedCurrentCollection = await fetchCollection(id);
            const fetchedItems = await fetchItems(id);
            collections.setCurrentCollection(fetchedCurrentCollection);
            items.setItems(fetchedItems);
            setLoading(false);
        };

        fetchData();
    }, [id, collections, items]);

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

    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
        setSelectedItems(selectAll ? [] : items.items.map((item) => item.id));
    };

    const handleDeleteSelected = () => {
        // Добавьте ваш код для обработки удаления выделенных элементов
        console.log("Deleting selected items:", selectedItems);
        // Здесь вы можете вызвать ваш метод удаления элементов, используя selectedItems
        // Пример: deleteItems(selectedItems);
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
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-r text-center">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th className="py-2 px-4 border-b border-r text-left">
                                ID
                            </th>
                            <th className="py-2 px-4 border-b border-r text-left">
                                Name
                            </th>
                            <th className="py-2 px-4 border-b border-r text-left">
                                Tags
                            </th>
                            {collections.currentCollection.fields?.map(
                                (field) => (
                                    <th
                                        key={field.id}
                                        className="py-2 px-4 border-b border-r text-left"
                                    >
                                        {field.name}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {items.items.map((item) => (
                            <tr key={item.id}>
                                <td className="py-2 px-4 border-b border-r text-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(
                                            item.id
                                        )}
                                        onChange={() =>
                                            toggleSelection(item.id)
                                        }
                                    />
                                </td>
                                <td className="py-2 px-4 border-b border-r text-right">
                                    {item.id}
                                </td>
                                <td className="py-2 px-4 border-b border-r text-left">
                                    <Link
                                        to={`${Routes.ITEM}/${item.id}`}
                                        className="text-blue-500 hover:underline text-lg font-semibold mb-2 block"
                                    >
                                        {item.name}
                                    </Link>
                                </td>
                                <td className="py-2 px-4 border-b border-r text-left">
                                    {item.tags
                                        ?.map((tag) => tag.name)
                                        .join(", ")}
                                </td>
                                {collections.currentCollection.fields?.map(
                                    (field) => (
                                        <td
                                            key={field.id}
                                            className="py-2 px-4 border-b border-r text-left"
                                        >
                                            {item.valuefields?.find(
                                                (vf) => vf.fieldId === field.id
                                            )?.value || ""}
                                        </td>
                                    )
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
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
