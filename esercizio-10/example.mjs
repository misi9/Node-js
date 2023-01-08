import * as fs from "node:fs"

fs.writeFile("file-1.txt", "Nice to meet you!", "utf8", (error) =>{
    if (error) {
        console.error(error);
        return;
    }
    console.log("Message sent!");
});