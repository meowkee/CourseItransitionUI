import React, { useContext, useEffect } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { fetchOneItem } from "../../http/itemAPI";
import { useParams } from "react-router-dom";

export const ItemPage = observer(() => {
    const { items } = useContext(Context);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedItem = await fetchOneItem(id);
            items.setCurrentItem(fetchedItem);
        };

        fetchData();
    }, [items]);
    
    return (
        <div className="container mx-auto mt-8">
            <div className="max-w-lg mx-auto bg-white p-8 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">{items.currentItem.name}</h1>
                <div className="mb-4">
                    {items.currentItem.tags && items.currentItem.tags.length > 0 && (
                        <div className="flex space-x-2">
                            {items.currentItem.tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="bg-gray-200 text-gray-700 py-1 px-2 rounded"
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                {/* Comments Block */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">---------------------------------</h2>
                    {/* Add your comments rendering logic here */}
                </div>
                {/* Like Button */}
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Like
                </button>
            </div>
        </div>
    );
});
