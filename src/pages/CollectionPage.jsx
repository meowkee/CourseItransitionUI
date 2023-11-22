import React, { useContext, useEffect } from "react";
import { Context } from "../index.js";
import { observer } from "mobx-react-lite";
import { fetchCollection } from "../http/collectionAPI.js";
import { useParams } from "react-router-dom";
import { fetchItems } from "../http/itemAPI.js";
import Markdown from "react-markdown";

const CollectionPage = observer(() => {
    const { collections, items } = useContext(Context);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCurrentCollection = await fetchCollection(id);
            collections.setCurrentCollection(fetchedCurrentCollection);
            const fetchedItems = await fetchItems(id);
            items.setItems(fetchedItems);
        };

        fetchData();
    }, [id, collections, items]);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">
                {collections.currentCollection?.name} by{" "}
                {collections.currentCollection.user?.name}
            </h1>
            <div className="py-4">
                <Markdown>{collections.currentCollection.description}</Markdown>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Tags</th>
                            {collections.currentCollection.fields?.map(
                                (field) => (
                                    <th
                                        key={field.id}
                                        className="py-2 px-4 border-b"
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
                                <td className="py-2 px-4 border-b text-left">
                                    {item.id}
                                </td>
                                <td className="py-2 px-4 border-b text-left">
                                    {item.name}
                                </td>
                                <td className="py-2 px-4 border-b text-left">
                                    {item.tags
                                        ?.map((tag) => tag.name)
                                        .join(", ")}
                                </td>
                                {item.valuefields?.map((field) => (
                                    <td
                                        key={field.id}
                                        className="py-2 px-4 border-b"
                                    >
                                        {field.value}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default CollectionPage;
