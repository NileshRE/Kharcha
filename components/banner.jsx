import { Image, Text } from "react-native"

const Banner = ({ image, heading, description }) => {
    return (
        <>
            <Image source={image} className="w-full h-72 my-8" />
            <Text className="text-green-500 font-bold text-2xl">{heading}</Text>
            <Text className="text-gray-400 w-5/6 mt-2 text-center text-base">{description}</Text>
        </>
    )
}


export default Banner