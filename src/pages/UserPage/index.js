import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { useParams } from "react-router-dom";
import { fetchUserCollections } from "../../http/collectionAPI";
import Modal from "react-modal";
import { fetchThemes } from "../../http/themeAPI";
import { observer } from "mobx-react-lite";
import { fetchUserById } from "../../http/userAPI";
import { useIsAuthor } from "../../hooks/useIsAuthor";
import { Spinner } from "../../components/Spinner";
import { ModalUserPage } from "../../components/ModalUserPage";
import { CollectionCards } from "../../components/CollectionCards";

export const UserPage = observer(() => {
    const { collections, themes } = useContext(Context);
    const [currentUserPage, setCurrentUserPage] = useState({});
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();
    const isAuthor = useIsAuthor(id);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const fetchedCollections = await fetchUserCollections(id);
            const fetchedThemes = await fetchThemes();
            const fetchedUser = await fetchUserById(id);
            
            themes.setThemes(fetchedThemes);
            collections.setCollections(fetchedCollections);
            setCurrentUserPage(fetchedUser);
            setLoading(false);
        };

        fetchData();
    }, [id, collections, themes]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    if (loading) return <Spinner />;
    if (currentUserPage.isError) return <p>{currentUserPage.message}</p>

    return (
        <div className="container mx-auto p-14 relative">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">
                    {currentUserPage.user?.name}{" "}
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

            <CollectionCards isAuthor={isAuthor} cards={collections.collections} id={id} />

            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Add Collection Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
            
                <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 opacity-50"></div>
                <ModalUserPage id={id} handleCloseModal={handleCloseModal} />
            </Modal>
        </div>
    );
});