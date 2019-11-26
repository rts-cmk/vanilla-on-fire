// Galleri routes
router.add('#!/gallery', async function (req) {

   main.innerHTML = `
      <h3>Galleri Administration</h3>
      <form id="gallery_form" data-type="add" data-id="">
         <div>
            <label>Titel</label>
            <input type="text" name="title">
         </div>
         <button>Gem</button><button id="gallery_cancel">Annuller</button>
      </form>`;

   const gallery_form = document.querySelector('#gallery_form');

   document.querySelector('#gallery_cancel').addEventListener('click', function () {
      gallery_form.reset();
      gallery_form.dataset['id'] = '';
      gallery_form.dataset['type'] = 'add';
   });

   gallery_form.addEventListener('submit', async function (event) {
      event.preventDefault();
      if (gallery_form.title.value != '') {

         if (gallery_form.dataset["type"] != undefined && gallery_form.dataset["type"] == 'add') {
            await db.collection('galleries').add({
               title: gallery_form.title.value,
               images: []
            });
            gallery_form.reset();
            renderGalleryList();
         }

         if (gallery_form.dataset["type"] != undefined && gallery_form.dataset["type"] == 'edit') {
            if (gallery_form.dataset['id'] != '') {
               let id = gallery_form.dataset['id'];
               await db.collection('galleries').doc(id).update({
                  title: gallery_form.title.value
               });

               gallery_form.dataset["type"] = 'add';
               gallery_form.dataset["id"] = '';
               document.querySelectorAll(`tr[data-id="${id}"] td`)[1].textContent = gallery_form.title.value;
               gallery_form.reset();

            }
         }
      }

   });
   renderGalleryList();

});

router.add('#!/gallery/images', async function (req) {
   if (req.path.length > 1) {
      let id = req.path[1].split('=')[1];
      if (id != undefined) {

         let gallery = await db.collection('galleries').doc(id).get();

         main.innerHTML = `
            <h3>Galleri Administration</h3>
            <h4>Billeder i galleriet</h4>
         
            <form id="add_images_to_gallery">
               <div>
                  <label>tilføj billede</label>
                  <input type="file" name="image">
               </div>
               <button>Gem</button><button id="gallery_cancel">Annuller</button>
            </form>
            <span id="message"></span>
            <div id="gallery_images"></div>
         `;
         const form = document.querySelector('#add_images_to_gallery');

         document.querySelector('#gallery_cancel').addEventListener('click', (event) => {
            event.preventDefault();
            window.location.hash = '#!/gallery';
         });

         document.querySelector('#add_images_to_gallery').addEventListener('submit', async (event) => {
            event.preventDefault();

            if (form.image.value != '') {
               let image = await uploadImage(form.image.files[0], 'galleries');
               let images = gallery.data().images;
               images.push(image);
               /// tilføjet opret article her, da det betyder filen er flyttet til storage
               await db.collection('galleries').doc(id).update({
                  images: images
               });
               window.location.hash = '#!/gallery';
            }
         });

         let gallery_images = document.querySelector('#gallery_images');

         if (gallery.data().images != undefined) {
            gallery.data().images.forEach(function (image) {

               let div = document.createElement('div');
               let button = document.createElement('button');
               button.textContent = 'X';
               button.addEventListener('click', async function (event) {
                  event.preventDefault();
                  // console.log(image.name);
                  if (confirm('Er du sikker?')) {

                     try {
                        await storage.child('galleries/' + image.name).delete();

                     } catch (error) {
                        console.log(error);
                     }
                     let images = gallery.data().images;
                     for (let i = images.length - 1; i >= 0; i--) {
                        // console.log(images[i]);
                        if (images[i].name == image.name) {
                           images.splice(i, 1);
                        }
                     }

                     await db.collection('galleries').doc(id).update({
                        images: images
                     });
                     div.parentElement.removeChild(div);
                     window.location.hash = '#!/gallery';
                  }
               });
               div.appendChild(button);

               let img = document.createElement('img');
               img.src = image.path;

               div.appendChild(img);

               gallery_images.appendChild(div);


            });
            console.log(gallery.data());
         }
      } else {
         window.location.hash = '#!/gallery';
      }
   } else {
      window.location.hash = '#!/gallery';
   }
});

async function renderGalleryList() {

   const gallery_form = document.querySelector('#gallery_form');
   let table = document.querySelector('#gallery_list');
   if (table != undefined) {
      table.innerHTML = '';
   } else {
      table = document.createElement('table');
      table.setAttribute('id', 'gallery_list');
   }

   let row = document.createElement('tr');
   let handlinger = document.createElement('th');
   handlinger.textContent = 'Handling';
   row.appendChild(handlinger);
   let titel = document.createElement('th');
   titel.textContent = 'Titel';
   row.appendChild(titel);
   let billeder = document.createElement('th');
   billeder.textContent = 'Antal billeder';
   row.appendChild(billeder);
   table.appendChild(row);
   main.appendChild(table);

   let galleries = await db.collection('galleries').orderBy('title').get();
   galleries.docs.forEach(function (gallery) {

      let row = document.createElement('tr');
      row.setAttribute('data-id', gallery.id);
      let handlinger = document.createElement('td');

      let edit = document.createElement('button');
      edit.textContent = 'Ret';
      edit.addEventListener('click', async function (event) {
         event.preventDefault();
         let edit_gallery = await db.collection('galleries').doc(gallery.id).get();

         gallery_form.title.value = edit_gallery.data().title;
         gallery_form.dataset['type'] = 'edit';
         gallery_form.dataset['id'] = gallery.id;

      });
      handlinger.appendChild(edit);

      let remove = document.createElement('button');
      remove.textContent = 'Slet';
      remove.addEventListener('click', async function (event) {
         event.preventDefault();
         if (confirm('Er du sikker på du vil slette?')) {
            if (gallery.data().images.length > 0) {
               gallery.data().images.forEach(async function (image) {
                  await storage.child('gallery/' + image).delete();
               });
            }
            await db.collection('galleries').doc(gallery.id).delete().then(function () {

               row.parentElement.removeChild(row);
            });
         }
      });
      handlinger.appendChild(remove);

      let images = document.createElement('a');
      images.href = "#!/gallery/images?id=" + gallery.id;
      images.textContent = 'Billeder';
      handlinger.appendChild(images);

      row.appendChild(handlinger);
      let titel = document.createElement('td');
      titel.textContent = gallery.data().title;
      row.appendChild(titel);
      let billeder = document.createElement('td');
      billeder.textContent = gallery.data().images.length;
      row.appendChild(billeder);
      table.appendChild(row);
   });

}