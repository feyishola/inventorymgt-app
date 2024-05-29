import Image from "next/image";
import hero from '../../../assets/images/hero-img.webp';

export default function Hero({bgColor}) {
    return (
        <div className="hero rounded-xl" style={{ backgroundColor: bgColor }}>
            <div className="hero-content flex flex-col-reverse md:flex-row-reverse justify-between p-10 mb-5">
                <Image src={hero}  />
                <div className="flex flex-col justify-center align-middle">
                    <div className=" max-w-[1200px] flex flex-col justify-center align-middle">
                        <h1 className="text-6xl font-bold text-white">The Best Electronics Shop For Online Purchase</h1>
                        <p className="py-6 text-base  text-white max-w-[70%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et mi viverra gravida rutrum lorem. Amet sed morbi dignissim tortor nisl. Faucibus donec et, est cras facilisis. Iaculis tristique.</p>
                        
                    </div>
                    <button className="btn btn-primary bg-[#5561E5] p-2.5 text-white rounded-md w-40">Get Started</button>
                </div>
                
                
            </div>
            
        </div>
    );
}