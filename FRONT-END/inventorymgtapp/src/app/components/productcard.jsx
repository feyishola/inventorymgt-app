import Image from "next/image"


export default function ProductsCard({products, cartIcon}){
    return(
        <div className="flex justify-center gap-4 ">
                {products.map((product, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg p-4 flex-none w-60"
                    >
                        <Image
                            src={product.image}
                            alt={product.title}
                            className="w-full h-40 object-cover rounded-md"
                            width={240}
                            height={160}
                        />
                        <div className="mt-4 text-center">
                            <h3 className="font-bold text-lg">{product.title}</h3>
                            <p className="text-purple-600 text-xl mt-2">{product.price}</p>
                            <div className="flex justify-center mt-2">
                                <button className="bg-gray-100 p-2 rounded-full">
                                    <Image src={cartIcon} alt="Add to cart" width={24} height={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    )
}