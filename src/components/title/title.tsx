import "./title.css"

export const Title = ({
    title,
    size,
}: {
    title: string;
    size: string;
}) => {
    const cssClass = size === "bigTitle" ? "bigTitle" : "smallTitle";

    return (
        <div
            className={`title ${cssClass}`}
        >
            {title}
        </div>
    );
};
