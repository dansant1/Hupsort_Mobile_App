
Slingshot.fileRestrictions( "uploadToAmazonS3", {
  allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
  maxSize: 1 * 1024 * 1024
});

Slingshot.createDirective( "uploadToAmazonS3", Slingshot.S3Storage, {
  bucket: "avatares-hupsort",
  acl: "public-read",
  authorize: function () {
    return true
  },
  key: function ( file, data) {


    let files = data.email + "/" + file.name;

    return files
  }
});
