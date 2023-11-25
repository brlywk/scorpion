import Image from "next/image";
import Link from "next/link";

type LogoProps = {
    label: string;
    linkTo: string;
    alt?: string;
};

export default function Logo({ label, linkTo, alt }: LogoProps) {
    const imageUrl = "/temp_logo.svg";

    return (
        <Link href={linkTo} className="flex flex-row items-center gap-2 py-4">
            <Image
                src={imageUrl}
                alt={alt ?? "Website Logo"}
                width={64}
                height={64}
                className="h-8 w-8"
            />
            <span className="text-lg font-bold">{label}</span>
        </Link>
    );
}
