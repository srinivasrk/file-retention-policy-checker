const fs = require('fs-extra')
const tar = require('tar')
const path = require( 'path' );
const _ = require('underscore')
const moment = require('moment')

let sourcePath = process.env.FRP_PATH // a path to search for manifest
let rp = process.env.FRP_RP // a integer for retention policy. EG: 30 -> remove all files older than 30 days
let now = moment().utc()

function readDirectoryAsync(sourcePath) {
  let toZip = []
  let counter = 0
  return new Promise((resolve, reject) => {
    // go to the path and find manifest.json and check if the date is execeeding the retention policy. If so, add it to tar and then delete those files.
    fs.readdir(sourcePath, (err, folder) => {
      _.each(folder, (folderName) => {
        counter += 1
        let manifest = path.resolve(sourcePath, folderName, 'manifest.json')
        let manifestObj = fs.readJsonSync(manifest, { throws: false })
        if(manifestObj) {
          let date = moment(manifestObj.date)
          // check if date has exceeded retention policy. If so schedule it for tar.
          let diff_date = (Math.abs(date.diff(now, 'days'))) // is the number of days its older by
          if(diff_date >= rp) {
            toZip.push(path.resolve(sourcePath, folderName))
          }
          if(counter == folder.length) {
            resolve(toZip)
          }
        }
      })
    })
  })
}

readDirectoryAsync(sourcePath).then((toZip) => {
  console.log(new Date() + ` found ${toZip.length} files non-conformant with retention policy`);
  if(toZip.length > 0) {
    tar.c(
      {
        gzip : true,
        file: 'test.tgz'
      },
      toZip
    ).then(() => {
      console.log("Tar created");
      // delete the folders
      _.each(toZip, (folderName) => {
        fs.remove(folderName);
        console.log(new Date() + ` Deleteing ${folderName}`);
      })
    })
  }
})
