function uploadImage(file, bucket = 'images') {
   return new Promise(function (resolve, reject) {
      if (file == undefined || file.name == undefined) {
         reject('Mangler fil');
      }
      // filnavn bliver unikt med et Date().getTime() 
      let filename = new Date().getTime() + '_' + file.name;
      var uploadTask = storage.child(bucket + '/' + filename).put(file);

      uploadTask.on('state_changed', function (snapshot) {
         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         let message = document.querySelector('#message');
         message.textContent = 'Uploading: ' + progress.toFixed(2) + '%';
         // console.log('Upload is ' + progress + '% done');
         switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
               // console.log('Upload is paused');
               break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
               // console.log('Upload is running');
               break;
         }
      }, function (error) {
         // Handle unsuccessful uploads
         console.log(error);
      }, async function () {
         // Handle successful uploads on complete
         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
         try {

            let downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            document.querySelector('#working').classList.add('hidden');
            resolve({
               name: filename,
               path: downloadURL
            });
         } catch (error) {
            reject(error);
         }
      });
   });
}