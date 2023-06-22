const getAlignmentStyle = (alignment) => {
    if (alignment === "start") {
        return { textAlign: "start" };
    } else if (alignment === "center") {
        return { textAlign: "center" };
    } else if (alignment === "end") {
        return { textAlign: "end" };
    }
};

export default getAlignmentStyle;