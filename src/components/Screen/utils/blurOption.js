export const getTextBlur = (color) => {
    switch (color) {
        case "#FEFEFE":
            return "#FEFEFE";
        case "#FFFEFE":
            return "#fff6e4";
        case "#FAF6F6":
            return "#FDE870";
        case "#ECEA48":
            return "#FFF303";
        case "#F8C51E":
            return "#fea300";
        case "#EA7C9C":
            return "#F800B5";
        case "#C75EBA":
            return "#9700fd";
        case "#DB2F3A":
            return "#ff3c00";
        case "#5ADC86":
            return "#09FF3D";
        case "#55C5CC":
            return "#00E5FC";
        case "#3E74BC":
            return "#1e03fe";
        default:
            return null;
    }
};