export function getBlob(res, file, blobType, fileExtension) {
    const filename = `${file}_${new Date().getTime()}.${fileExtension}`;
    const blob = new Blob([res.data], { type: blobType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}
