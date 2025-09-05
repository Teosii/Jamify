import React from "react";

const guitars = [
    {
        id: 1,
        name: "Limited Edition American Ultra Luxe Vintage '60s Stratocaster®, Surf Green",
        image: "https://www.musicarms.net/wp-content/uploads/2025/08/Fender-Limited-Edition-American-Ultra-Luxe-Vintage-60s-Stratocaster-Surf-Green.jpg", // replace with real image URL
        tag: "New",
    },
    {
        id: 2,
        name: "American Ultra Luxe Vintage '60s Stratocaster® HSS",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDWhz0XBj_UUamoXMOmvSGK4EEdbm15ea7Pg&s",
        colors: "2 Colors",
    },
    {
        id: 3,
        name: "American Ultra Luxe Vintage '60s Stratocaster®",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsPL1byEWJjTW9gZrYC1UUyu2uruoQELno_g&s",
        colors: "2 Colors",
    },
    {
        id: 4,
        name: "American Ultra Luxe Vintage '50s Telecaster®",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBGS3eIV22LeKzO5S5mtk5IgaUAKALoM2-vA&s",
        colors: "2 Colors",
    },
    {
        id: 5,
        name: "Limited Edition Player II Stratocaster®, Shell Pink",
        image: "data:image/jpeg;base64,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",
        colors: "2 Colors",
    },
    {
        id: 6,
        name: "Limited Edition Player II Jazzmaster®, Shell Pink",
        image: "data:image/jpeg;base64,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",
        colors: "2 Colors",
    },
    {
        id: 7,
        name: "American Ultra Luxe Vintage '50s Telecaster®",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBGS3eIV22LeKzO5S5mtk5IgaUAKALoM2-vA&s",
        colors: "2 Colors",
    },
    {
        id: 8,
        name: "American Ultra Luxe Vintage '50s Telecaster®",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBGS3eIV22LeKzO5S5mtk5IgaUAKALoM2-vA&s",
        colors: "2 Colors",
    },
];

const ElectricGuitars = () => {
    return (
        <section className="bg-gray-50 py-10 px-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">Electric Guitars</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {guitars.map((guitar) => (
                        <div
                            key={guitar.id}
                            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition"
                        >
                            <img
                                src={guitar.image}
                                alt={guitar.name}
                                className="h-64 object-contain mb-4"
                            />
                            <h3 className="text-md font-medium text-center text-gray-800">
                                {guitar.name}
                            </h3>
                            {guitar.colors && (
                                <p className="text-sm text-gray-500 mt-1">{guitar.colors}</p>
                            )}
                            {guitar.tag && (
                                <span className="mt-2 inline-block text-xs bg-black text-white px-3 py-1 rounded-full">
                  {guitar.tag}
                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ElectricGuitars;
