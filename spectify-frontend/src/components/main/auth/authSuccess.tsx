import { IoMdCheckmarkCircle } from "react-icons/io";

interface authSuccessProps {
    message?: string;
}

export default function AuthSuccessComponent({ message }: authSuccessProps) {
    if (!message) return null;

    return (
        <>
            <div className="flex p-4 gap-2 items-center bg-green-100 rounded-xl">
                <IoMdCheckmarkCircle className="w-8 h-8 text-green-500" />
                <p className="text-lg font-semibold text-green-500">{message}</p>
            </div>
        </>
    );
}
