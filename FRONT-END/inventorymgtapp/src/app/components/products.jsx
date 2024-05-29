import Image from 'next/image';
import GlassCard from './glasscard';
import WideButton from './widebutton';
// import cartIcon from '../../../assets/cart-icon.png'; // Example icon, replace with actual path
import one from '../../../assets/images/product-1.webp';
import two from '../../../assets/images/product-2.webp';
import three from '../../../assets/images/product-3.webp';
import four from '../../../assets/images/product-4.webp';
import five from '../../../assets/images/product-5.webp';
import six from '../../../assets/images/product-6.webp';
import seven from '../../../assets/images/product-7.webp';
import eight from '../../../assets/images/product-8.webp';
import nine from '../../../assets/images/product-8.webp';
import ten from '../../../assets/images/product-10.webp';
import eleven from '../../../assets/images/product-11.webp';
import twelve from '../../../assets/images/product-12.webp';
import thirteen from '../../../assets/images/product-13.webp';
import fourteen from '../../../assets/images/product-14.webp';
import fivteen from '../../../assets/images/product-15.webp';
import sixteen from '../../../assets/images/product-16.webp';
import seventeen from '../../../assets/images/product-17.webp';
import eighteen from '../../../assets/images/product-18.webp';
import nineteen from '../../../assets/images/product-19.webp';
import twenty from '../../../assets/images/product-20.webp';


const products = [
    {
        image: one, // Replace with actual path
        title: 'Gaming Laptop',
        price: '$540',
    },
    {
        image: two, // Replace with actual path
        title: 'VR Box',
        price: '$234',
    },
    {
        image: three, // Replace with actual path
        title: 'Gaming VR',
        price: '$123',
    },
    {
        image: four, // Replace with actual path
        title: 'Gaming Headphone',
        price: '$240',
    },
    {
        image: five, // Replace with actual path
        title: 'Joy Stick',
        price: '$125',
    },
    {
        image: six, // Replace with actual path
        title: 'Smart Phone',
        price: '$540',
    },
    {
        image: seven, // Replace with actual path
        title: 'Gaming Joy Stick',
        price: '$234',
    },
    {
        image: eight, // Replace with actual path
        title: 'Gaming VR',
        price: '$123',
    },
    {
        image: nine, // Replace with actual path
        title: 'Smart Watch',
        price: '$240',
    },
    {
        image: ten, // Replace with actual path
        title: 'Drone',
        price: '$125',
    },
    {
        image: eleven, // Replace with actual path
        title: 'Smart Phone',
        price: '$540',
    },
    {
        image: twelve, // Replace with actual path
        title: 'Tablet PC',
        price: '$234',
    },
    {
        image: thirteen, // Replace with actual path
        title: 'Gaming Joy Stick',
        price: '$123',
    },
    {
        image: fourteen, // Replace with actual path
        title: 'Playstation',
        price: '$240',
    },
    {
        image: fivteen, // Replace with actual path
        title: 'Camera',
        price: '$125',
    },
    ,
    {
        image: sixteen, // Replace with actual path
        title: 'Pendrive',
        price: '$540',
    },
    {
        image: seventeen, // Replace with actual path
        title: 'Gaming Laptop',
        price: '$234',
    },
    {
        image: eighteen, // Replace with actual path
        title: 'Smart Watch',
        price: '$123',
    },
    {
        image: nineteen, // Replace with actual path
        title: 'Macbook',
        price: '$240',
    },
    {
        image: twenty, // Replace with actual path
        title: 'Smart Watch',
        price: '$125',
    },
];

export default function ProductCard() {
    return (
        <div className="w-full p-8 mt-10">
            <h2 className="text-3xl font-bold text-center mb-8 mt-12">Browse All Products</h2>
            {/* <ProductsCard key={products.title} products={products} one={one}/> */}
            <div className='grid grid-cols-5 gap-4'>
                {
                    products.map((product,index)=>(
                        <GlassCard key={index} image={product.image} amount={product.price} productName={product.title}/>
                    ))
                }
                
            </div>
            <div className='flex justify-center mt-10'>
                    <WideButton/>
                </div>
        </div>
    );
}
