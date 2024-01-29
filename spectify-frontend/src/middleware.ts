import authConfig from "@/auth/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);
const DEFAULT_LOGIN_URL = "/login";
const DEFAULT_HOME_URL = "/";
const TOKEN_ROUTE = ["/new-password"];
const PRIVATE_ROUTE = ["/profile", "/following"];
const AUTH_ROUTE = ["/login", "/register", "/reset-password"];

export default auth((req) => {
	const { nextUrl } = req;
	const url = req.nextUrl.pathname;
	const isUserLoggedIn = req.auth;

	// const tokenRoute = TOKEN_ROUTE.find((route) => url.startsWith(route));
	// if (tokenRoute) {
	// 	const token = url.replace(tokenRoute, "").replace("/", "");
	// 	console.log("Token:", token);
	// }
	if (isUserLoggedIn && AUTH_ROUTE.some((route) => url.startsWith(route))) {
		return Response.redirect(new URL(DEFAULT_HOME_URL, nextUrl));
	}
	if (!isUserLoggedIn && PRIVATE_ROUTE.some((route) => url.startsWith(route))) {
		return Response.redirect(new URL(DEFAULT_LOGIN_URL, nextUrl));
	}
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
