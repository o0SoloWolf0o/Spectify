import Link from "next/link";
import LoginForm from "./loginForm";
import TransitionsModal from "./transitionsModal";

export default function NavComponent() {
    return (
        <>
            <div className="h-screen w-60 fixed flex flex-col items-start shadow">
                <Link href="/">Logo</Link>
                <Link href="/">Home</Link>
                <Link href="/search">Search</Link>
                <Link href="/following">Following</Link>
                <Link href="/profile">Profile</Link>
                <Link href="/build">Build</Link>
                <Link href="/product">Product</Link>
                <Link href="/compare">Compare</Link>
                <TransitionsModal buttonText="Login">
                    <LoginForm />
                </TransitionsModal>
            </div>
        </>
    );
}
