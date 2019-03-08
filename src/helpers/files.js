import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export function decodeBase64Image(base64Data) {
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    return matches.length !== 3
        ?  new Error('Invalid input string')
        :  {
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
        if (!base64Data) resolve(false);
        try {
            const imageBuffer = decodeBase64Image(base64Data),
                uploadedPath = `${location}/${generateFilename(imageBuffer.type)}`;

            fs.writeFile(uploadedPath, imageBuffer.data, ()=>{
                resolve(uploadedPath)
            });
        } catch(error) {
            console.eror('Error in saving image', error);
            resolve(false);
        }
    });

}

