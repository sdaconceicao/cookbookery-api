import crypto from 'crypto';
import fs from 'fs';

export function decodeBase64Image(base64Data) {
    if (!base64Data) return false;
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    return !matches || matches.length !== 3
        ? false
        : {
            type: matches[1],
            data: new Buffer(matches[2], 'base64')
        };
}

export function generateFilename(filetype){
    const uniqueFileName = `file-${generateSHA1()}`,
        fileExtension = generateFileExtension(filetype);
    return `${uniqueFileName}.${fileExtension}`;
}

export function generateFileExtension(type){
    const extensionRegularExpression = /\/(.*?)$/;
    return type.match(extensionRegularExpression)[1];
}

export function generateSHA1(){
    const seed = crypto.randomBytes(20);
    return crypto.createHash('sha1')
        .update(seed)
        .digest('hex');
}

export function saveImage(base64Data, location){
    return new Promise(resolve=>{
        const imageBuffer = decodeBase64Image(base64Data);
        if (!base64Data || !imageBuffer) {
            resolve(false);
            return;
        }
        try {
            const uploadedPath = `${location}/${generateFilename(imageBuffer.type)}`;
            fs.writeFile(`public/${uploadedPath}`, imageBuffer.data, ()=>{
                resolve(uploadedPath)
            });
        } catch(error) {
            console.error("Error in saving image to filesystem", error);
            resolve(false);
        }
    });

}

