import { useContext } from "react";
import { Context } from "../..";
import {
    deleteCollection,
    fetchUserCollections,
} from "../../http/collectionAPI";
import { Link } from "react-router-dom";
import { Routes } from "../../utils/consts";

export const CollectionCards = ({ cards, isAuthor, id }) => {
    const { collections } = useContext(Context);
    
    console.log(cards);
    const handleDeleteCollection = (collectionId) => async () => {
        await deleteCollection(collectionId);
        const data = await fetchUserCollections(id);
        collections.setCollections(data);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards?.map((card) => (
                <div
                    key={card.id}
                    className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 relative"
                >
                    <Link
                        to={`${Routes.COLLECTION}/${card.id}`}
                        className="text-blue-500 hover:underline text-lg font-semibold mb-2 block"
                    >
                        {card.name}
                    </Link>
                    <p className="text-gray-600 mb-4">{card.theme.name}</p>
                    {isAuthor && (
                        <button
                            onClick={handleDeleteCollection(card.id)}
                            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                        >
                            Delete
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};
