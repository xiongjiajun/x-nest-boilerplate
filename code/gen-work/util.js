const { statSync, readdirSync } = require('fs');
const { join } = require('path');

module.exports = {
    
    cross2hump: (name) => {
        const splitNames = name.split('-');
        for (let i = 0; i < splitNames.length; i++) {
            const sn = splitNames[i].split('');
            if(sn[0] > 'Z') {
                sn[0] = sn[0].toUpperCase();
            }
            splitNames[i] = sn.join('');
        }
        return splitNames.join('');
    },
    
    fileDFS: (path, onFile, onFolder) => {
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
    
}