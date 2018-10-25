# file-retention-policy-checker
A NodeJS script to check file retention policy

# Environment variables
* FRP_PATH : set the path inside which it tries to look for manifest.json
* FRP_RP : set the retention policy. Should be a integer 30, 60, 90 (days). All files older than FRP_RP will be TARed and deleted
* FRP_FTP_HOST : ftp host to upload the file
* FRP_FTP_USER : ftp username
* FRP_FTP_PASSWORD : ftp password

Uses default port 21
