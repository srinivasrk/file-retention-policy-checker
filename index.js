const fs = require('fs-extra');
const tar = require('tar')
const path = require( 'path' );
const _ = require('underscore')
let sourcePath = process.env.FRP_PATH // a path to search for manifest
let rp = process.env.FRP_RP // a integer for retention policy. EG: 30 -> remove all files older than 30 days

// go to the path and find manifest.json and check if the date is execeeding the retention policy. If so, add it to tar and then delete those files.

fs.readdir(sourcePath, (err, folder) => {
  _.each(folder, (folderName) => {
    let manifest = path.resolve(sourcePath, folderName, 'manifest.json')
    fs.readJson(manifest).then((fileDetails) => {
      let date = fileDetails.date
      // check if date has exceeded retention policy. If so schedule it for tar.

    }).catch((err) => {
      console.log(err);
    })
  })

})


// tar.c(
//   {
//     gzip : true,
//     file: 'test.tgz'
//   },
//   ['./node_modules']
// ).then(_ => {
//   console.log("Tar created");
// })
