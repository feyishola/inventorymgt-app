import Image from "next/image";

export default function GlassCard({image, productName,amount}){
    return(
        <div className="card w-64 ">
            <figure className="h-72 w-full relative ">
                <Image src={image} alt="car!" layout="fill" objectFit="cover" className="rounded-md"/>
            </figure>
            <div className="card-body">
                <div className="mt-4 text-center">
                    <h3 className="font-bold text-lg">{productName}</h3>
                    <p className="text-purple-600 text-xl mt-2">{amount}</p>
                    <div className="flex justify-center mt-2">
                        <button className="bg-gray-100 p-2 rounded-full">
                            <Image src={image} alt="Add to cart" width={24} height={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}