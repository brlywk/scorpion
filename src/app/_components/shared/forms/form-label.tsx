import clsx from "clsx";

type LabelProps = {
    htmlFor: string;
    classMod?: string;
    children: React.ReactNode;
};

export default function Label({ htmlFor, classMod, children }: LabelProps) {
    return (
        <label htmlFor={htmlFor} className={clsx("text-gray-500", classMod)}>
            {children}
        </label>
    );
}
