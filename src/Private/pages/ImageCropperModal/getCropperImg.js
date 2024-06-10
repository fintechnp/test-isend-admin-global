export default function getCroppedImg(imageSrc, pixelCrop, targetWidth, targetHeight) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;

        image.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;

            if (ctx) {
                ctx.drawImage(
                    image,
                    pixelCrop.x,
                    pixelCrop.y,
                    pixelCrop.width,
                    pixelCrop.height,
                    0,
                    0,
                    pixelCrop.width,
                    pixelCrop.height,
                );

                const resizeCanvas = document.createElement("canvas");
                resizeCanvas.width = targetWidth;
                resizeCanvas.height = targetHeight;
                const resizeCtx = resizeCanvas.getContext("2d");

                if (resizeCtx) {
                    resizeCtx.drawImage(
                        canvas,
                        0,
                        0,
                        pixelCrop.width,
                        pixelCrop.height,
                        0,
                        0,
                        targetWidth,
                        targetHeight,
                    );

                    resizeCanvas.toBlob((blob) => {
                        if (blob) {
                            const croppedImageUrl = URL.createObjectURL(blob);
                            resolve(croppedImageUrl);
                        } else {
                            reject(new Error("Canvas is empty"));
                        }
                    }, "image/jpeg");
                } else {
                    reject(new Error("Canvas 2D context is not supported"));
                }
            } else {
                reject(new Error("Canvas 2D context is not supported"));
            }
        };

        image.onerror = () => {
            reject(new Error("Failed to load the image"));
        };
    });
}
