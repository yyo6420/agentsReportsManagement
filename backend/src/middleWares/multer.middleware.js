import multer from "multer";

const createMulter = (extentions, storage) => {
    return multer({
        storage,
        fileFilter: (request, file, cb) => {
            const validExt = extentions.some(ext => file.mimetype.endsWith(ext));
            cb(null, validExt)
        }, limits: 1024 ** 2 * 5
    })
}

export const uploadCsv = createMulter("csv", multer.memoryStorage());

export const uploadImage = createMulter(["png", "jpg", "jpeg", "webp"], multer.diskStorage({
    destination: "images",
    filename: (request, file, cb) => cb(null, Date.now() + `.${file.mimetype.split("/").slice(-1)}`)
}))

