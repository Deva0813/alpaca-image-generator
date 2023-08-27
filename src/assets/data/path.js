import fs from "fs";

// print the folders and files in the current directory

var folders = [
	"accessories",
	"backgrounds",
	"ears",
	"eyes",
	"hair",
	"leg",
	"mouth",
	"neck",
];


// fs.readdir('./public/images/alpaca/', (err, files) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(files);
//     }
//     }
// );


folders.forEach((folder) => {
    fs.readdir(`./public/images/alpaca/${folder}`, (err, files) => {
        if (err) {
            console.log(err);
        } else {
            console.log({
                folderName: folder,
                files: files,
            });
        }
    });
});


