import { fabric } from "fabric";

const handleRadioChange = (event, setSelectedBackground, backgrounds) => {
    const { value } = event.target;
    setSelectedBackground(value);

    const canvas = new fabric.Canvas("canvas");

    const selectedBackground = backgrounds.find(
        (background) => background.value === value
    );
    const imageUrl1x = selectedBackground ? selectedBackground.imageUrl : "";
    const imageUrl2x = selectedBackground ? selectedBackground.imageUrl2x : "";

    const devicePixelRatio = window.devicePixelRatio;

    const retinaImageUrl = devicePixelRatio <= 1 ? imageUrl1x : imageUrl2x;

    if (retinaImageUrl) {
        fabric.Image.fromURL(retinaImageUrl, (img) => {
            img.set({
                scaleX: 1 / devicePixelRatio,
                scaleY: 1 / devicePixelRatio,
            });
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
            canvas.renderAll();
        });
    } else {
        canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
        canvas.renderAll();
    }
};

export default handleRadioChange;