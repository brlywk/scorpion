import clsx from "clsx";
import Image from "next/image";
import type { SelectCategory } from "~/server/db/schema";

type CategoryCardProps = {
    category: SelectCategory;
    classMod?: string;
};

export function CategoryCard({ category, classMod }: CategoryCardProps) {
    return (
        <div className={clsx("flex flex-row items-center gap-4", classMod)}>
            {category.image && (
                <Image
                    src={category.image}
                    width={32}
                    height={32}
                    alt={`Image for category ${category.name}`}
                    className="h-4 w-4"
                />
            )}
            {category.name}
        </div>
    );
}
