Template.editarAvatar.onCreated(() => {
  let template = Template.instance()

  template.autorun( () => {
    H.subscribe('usuarios', () => {});
  })
})

Template.editarAvatar.onRendered( () => {

  let canva = document.getElementById('avatar');

  let contexto = document.getElementById('avatar').getContext("2d");

  let template = Template.instance();

  let genero = Meteor.users.findOne({_id: H.userId()}).profile.genero;

  let totalPartes = 7;
  let numeroRecursoCargados = 0;
  let fps = 30;

  template.fondo = new Image();
  template.fondo.onload = function() {
      resourceLoaded();
  }
  template.fondo.src = '/avatares/a/blank.png'

  template.expresion = new Image();
  template.expresion.onload = function() {
      resourceLoaded();
  }
  template.expresion.src = '/avatares/a/blank.png';

  template.rostro = new Image()
  template.rostro.onload = function() {
      resourceLoaded();
  }
  template.rostro.src = '/avatares/a/rostros/' + genero + '/blanco/1.png'
  template.cabello = new Image()
  template.cabello.onload = function() {
      resourceLoaded();
  }
  template.cabello.src = '/avatares/a/cabello/' + genero + '/negro/1.png'
  template.ojo = new Image()
  template.ojo.onload = function() {
      resourceLoaded();
  }
  template.ojo.src = '/avatares/a/ojos/' + genero + '/marronoscuro/1.png'
  template.ceja = new Image()
  template.ceja.onload = function() {
      resourceLoaded();
  }
  template.ceja.src = '/avatares/a/cejas/' + genero + '/castanoclaro/1.png'
  template.nariz = new Image()
  template.nariz.onload = function() {
      resourceLoaded();
  }
  template.nariz.src = '/avatares/a/narices/' + genero + '/6.png'
  template.boca = new Image()
  template.boca.onload = function() {
      resourceLoaded();
  }



  if (genero === 'Hombre') {
    template.boca.src = '/avatares/a/bocas/' + genero + '/2.png'
    template.barba = new Image()
    template.barba.onload = function() {
        resourceLoaded();
    }
    template.barba.src = undefined; //'/avatares/a/barba/' + genero + '1.png'

    template.bigote = new Image()
    template.bigote.onload = function() {
        resourceLoaded();
    }
    template.bigote.src = undefined; //'/avatares/a/bigotes/' + genero + '/marronoscuro/1.png'

  } else {
    template.boca.src = '/avatares/a/bocas/' + genero + '/naranja/2.png'
  }

  template.ropa = new Image()
  template.ropa.onload = function() {
      resourceLoaded();
  }
  template.ropa.src = '/avatares/a/ropa/' + genero + '/amarillo/1.png'
  template.accesorio = new Image()
  template.accesorio.onload = function() {
      resourceLoaded();
  }
  template.accesorio.src = '/avatares/a/blank.png'; //'/avatares/a/accesorios/' + genero + '/azul/1.png'

  function resourceLoaded() {

    numeroRecursoCargados += 1;
    if(numeroRecursoCargados === totalPartes) {
      setInterval(redraw, 1000 / fps);
    }
  }

  let charX = 400;
  let charY = 400;

  function redraw() {

    let x = charX;
    let y = charY;

    contexto.canvas.width = 360; //contexto.canvas.width; // clears the canvas
    contexto.canvas.height = 500;
    contexto.drawImage(template.fondo, 40, 0);

    contexto.drawImage(template.rostro, 0, 0);
    contexto.drawImage(template.expresion, 0, 0);
    contexto.drawImage(template.ceja, 0, 0);
    contexto.drawImage(template.cabello, 0, 0);

    contexto.drawImage(template.boca, 0, 0);

    contexto.drawImage(template.ojo, 0, 0);
    contexto.drawImage(template.accesorio, 0, 0);
    contexto.drawImage(template.nariz, 0, 0);

    contexto.drawImage(template.ropa, 0, 0);


    if (genero === 'Hombre') {
      contexto.drawImage(template.barba, 0, 0);
      contexto.drawImage(template.bigote, 0, 0);
    }
  }

  function dlCanvas() {
    let doc = canva.toDataURL('img/png');

    let data = {
      email: Meteor.users.findOne({_id: H.userId()}).emails[0].address
    }

    alert(data.email)

    canva.toBlob(function(file) {



      const uploader = new Slingshot.Upload( "uploadToAmazonS3", data);


      uploader.send( file, ( error, url ) => {
        if ( error ) {
          alert(error)
        } else {
          H.call( "storeUrlInDatabase", url, ( error ) => {
            if ( error ) {
              //Bert.alert( error.reason, "warning" );
              //_setPlaceholderText();
              console.log(error)
            } else {
              alert('Guardado')
              FlowRouter.go('/chat')
            }
          });
        }
      });

    });

  }

  document.getElementById("save-avatar").addEventListener('click', dlCanvas, false);

})

Template.editarAvatar.events({
  'change [name="tab-group"]'(e, t) {
    let content = $( e.target ).data("content")
    console.log(content);
    for (var i = 0; i <= 11; i++) {
        $('#content-' + i).css('opacity', '0');
        $('#content-' + i).css('display', 'none');

    }
    $('#' + content).css('opacity', '1');
    $('#' + content).css('display', 'block');
    $('#' + content).css('width', '100%');

  },

  'change [name="tab-subgroup"]'(e, t) {
    let content = $( e.target ).data("subcontent")
    console.log(content);
    for (var i = 0; i <= 11; i++) {
        $('#subcontent-' + i).css('opacity', '0');


    }
    $('#' + content).css('opacity', '1');
    $('#' + content).css('width', '100%');

  },
  'click .fondos'(e, t) {

    t.fondo.src = e.target.src;
  },
  'click .rostros'(e, t) {

    t.rostro.src = e.target.src;
  },
  'click .cabellos'(e, t) {
    t.cabello.src = e.target.src;
    //console.log(e.target.src);
  },
  'click .ojos'(e, t) {
    t.ojo.src = e.target.src;
  },
  'click .expresiones'(e, t) {
    t.expresion.src = e.target.src;
  },
  'click .cejas'(e, t) {
    t.ceja.src = e.target.src;
  },
  'click .narices'(e, t) {
    t.nariz.src = e.target.src;
  },
  'click .bocas'(e, t) {
    t.boca.src = e.target.src;
  },
  'click .ropa'(e, t) {
    //console.log(e.target.src);
    t.ropa.src = e.target.src;
  },
  'click .accesorios'(e, t) {
    t.accesorio.src = e.target.src;
  },
  'click .barba'(e, t) {
    t.barba.src = e.target.src;
  },
  'click .bigotes'(e, t) {
    t.bigote.src = e.target.src;
  }
})

Template.editarAvatar.helpers({
  tipo() {
    return Meteor.users.findOne({_id: H.userId()}).profile.genero
  },
  esMujer() {
    if ( Meteor.users.findOne({_id: H.userId()}).profile.genero === 'Mujer') {
      return true
    } else {
      return false
    }
  },
  esHombre() {
    if ( Meteor.users.findOne({_id: H.userId()}).profile.genero === 'Hombre') {
      return true
    } else {
      return false
    }
  }
});
