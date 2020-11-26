import { readdirSync, statSync } from "fs";
import { join } from "path";

export const fileDFS = (path: string, onFile?: (path: string, file?: string) => void, onFolder?: (path: string, folder?: string) => void) => {
    const stat = statSync(path);
    if(stat.isFile()) {
        throw new Error(path + "is not a folder");
    }
    const files = readdirSync(path);
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = join(path, file);
        const stat = statSync(filePath);
        if(stat.isDirectory()) {
            if(typeof onFolder === 'function') {
                onFolder(filePath, file);
            }
            fileDFS(filePath, onFile, onFolder);
        }else {
            if(typeof onFile === 'function') {
                onFile(filePath, file);
            }
        }
    }
}

export const isFileNameSuffix = (fileName: string, suffix: string) => {
    if(fileName.indexOf(suffix) === fileName.length - suffix.length) {
        return true;
    }
    return false;
}