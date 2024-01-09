export default function LoginForm() {
    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl">Login</h1>
                <form className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                    <button type="submit">Login</button>
                </form>
                <p>or</p>
                <button>Sign in with Google</button>
                <div className="flex">
                    <p>Don't have an account?</p>
                </div>
            </div>
        </>
    );
}
