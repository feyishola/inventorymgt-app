"use client"

import { useState } from 'react';
import bi from '../../../assets/bi.jpg';
import binacular from '../../../assets/binacular.jpg';
import cash from '../../../assets/cash.jpg';
import Image from 'next/image';
import one from '../../../assets/images/category-1.webp';
import two from '../../../assets/images/category-2.webp';
import three from '../../../assets/images/category-3.webp';
import four from '../../../assets/images/category-4.webp';
import five from '../../../assets/images/category-5.webp';
import six from '../../../assets/images/category-6.webp';
import seven from '../../../assets/images/category-7.webp';

const items = [
    {
        image: one,
        title: 'Laptop',
        description: '21 Items',
    },
    {
        image: two,
        title: 'iMac',
        description: '54 Items',
    },
    {
        image: three,
        title: 'Drone',
        description: '46 Items',
    },
    {
        image: four,
        title: 'Earbuds',
        description: '114 Items',
    },
    {
        image: five,
        title: 'Camera',
        description: '126 Items',
    },
    {
        image: six,
        title: 'Accessories',
        description: '43 Items',
    },
    {
        image: seven,
        title: 'Drone',
        description: '46 Items',
    },
    {
        image: one,
        title: 'iMac',
        description: '54 Items',
    },
    {
        image: two,
        title: 'Drone',
        description: '46 Items',
    },
    {
        image: three,
        title: 'Earbuds',
        description: '114 Items',
    },
    {
        image: four,
        title: 'Camera',
        description: '126 Items',
    },
    {
        image: five,
        title: 'Accessories',
        description: '43 Items',
    },
    {
        image: six,
        title: 'Drone',
        description: '46 Items',
    },
    {
        image: seven,
        title: 'Camera',
        description: '46 Items',
    },
];

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleItemsCount = 7;

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const getVisibleItems = () => {
        const endIndex = (currentIndex + visibleItemsCount) % items.length;
        if (endIndex < currentIndex) {
            return [
                ...items.slice(currentIndex, items.length),
                ...items.slice(0, endIndex),
            ];
        } else {
            return items.slice(currentIndex, endIndex);
        }
    };

    const visibleItems = getVisibleItems();

    return (
        <div className="relative w-full">
            <div className="flex ">
                {visibleItems.map((item, index) => (
                    <div
                        key={index}
                        className="transition-transform duration-300 m-2"
                        style={{ width: 'calc(100% / 6)' }}
                    >
                        <Image src={item.image} alt={item.title} className="w-full h-full object-cover rounded-md" />
                        <div className="text-center mt-2 flex justify-between">
                            <span className="font-bold">{item.title}</span>
                            <span className="block text-gray-500">{item.description}</span>
                        </div>
                        
                    </div>
                ))}
            </div>
            <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
            >
                &lt;
            </button>
            <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
            >
                &gt;
            </button>
        </div>
    );
}

// export default function Carousel() {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const visibleItemsCount = 7;

//     const handlePrev = () => {
//         setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
//     };

//     const handleNext = () => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
//     };

//     const visibleItems = items.slice(currentIndex, currentIndex + visibleItemsCount).concat(
//         currentIndex + visibleItemsCount > items.length ? items.slice(0, (currentIndex + visibleItemsCount) % items.length) : []
//     );

//     return (
//         <div className="relative w-full">
//             <div className="flex overflow-hidden">
//                 {visibleItems.map((item, index) => (
//                     <div
//                         key={index}
//                         className="flex-none transition-transform duration-300"
//                         style={{ width: 'calc(100% / 7)' }}
//                     >
//                         <Image src={item.image} alt={item.title} className="w-full h-full object-cover" />
//                         <div className="text-center mt-2">
//                             <span className="font-bold">{item.title}</span>
//                             <span className="block text-gray-500">({item.description})</span>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <button
//                 onClick={handlePrev}
//                 className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
//             >
//                 &lt;
//             </button>
//             <button
//                 onClick={handleNext}
//                 className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
//             >
//                 &gt;
//             </button>
//         </div>
//     );
// }

