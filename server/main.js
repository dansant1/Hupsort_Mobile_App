Files = new Mongo.Collection('files', H);
Usuarios = new Mongo.Collection('users', H);

Slingshot.fileRestrictions( "uploadToAmazonS3", {
  allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
  maxSize: 1 * 1024 * 1024
});

Slingshot.createDirective( "uploadToAmazonS3", Slingshot.S3Storage, {
  bucket: "avatares-hupsort",
  acl: "public-read",
  authorize: function () {
    let userFileCount = Files.find( { "userId": this.userId } ).count();
    return userFileCount < 3 ? true : false;
  },
  key: function ( file ) {
    console.log(this.userId);
    var user = Usuarios.findOne( {_id: this.userId } );
    return user.emails[0].address + "/" + file.name;
  }
});
