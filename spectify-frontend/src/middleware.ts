import authConfig from "@/auth/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);
const DEFAULT_LOGIN_URL = "/login";
const DEFAULT_HOME_URL = "/";
const privateRoutes = ["/profile", "/following", "/profile/edit"];
const authRoutes = ["/login", "/register", "/reset-password"];

export default auth((req) => {
	const { nextUrl } = req;
	const url = req.nextUrl.pathname;
	const isUserLoggedIn = req.auth;

	// console.log("user", req.auth);

	if (isUserLoggedIn && authRoutes.includes(url)) return Response.redirect(new URL(DEFAULT_HOME_URL, nextUrl));
	if (!isUserLoggedIn && privateRoutes.includes(url)) return Response.redirect(new URL(DEFAULT_LOGIN_URL, nextUrl));
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
