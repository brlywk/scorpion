import Link from "next/link";

export default async function RedirectPage() {
    return (
        <div>
            Looks like you're not logged in. Please{" "}
            <Link href="/api/auth/signin">GO HERE</Link> to to sign in our
            create an account or whatever...
        </div>
    );
}
