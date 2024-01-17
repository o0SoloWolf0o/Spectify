import { MdError } from "react-icons/md";

interface authErrorProps {
    message?: string | null | undefined;
}

export default function AuthErrorComponent({ message }: authErrorProps) {
    if (!message) return null;

    return (
        <>
            <div className="flex p-4 gap-2 items-center bg-red-100 rounded-xl">
                <MdError className="w-8 h-8 text-red-500" />
                <p className="text-lg font-semibold text-red-500">{message}</p>
            </div>
        </>
    );
}
