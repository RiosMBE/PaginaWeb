const app = initializeApp(firebaseConfig);
const db = getDatabase(); 

var btnAgregar=document.getElementById('btnAgregar');
var btnBorrar=document.getElementById('btnBorrar');
var btnActualizar= document.getElementById('btnActualizar');
var btnBuscar= document.getElementById('btnBuscar');
var Dis= document.getElementById('DC');
var archivo= document.getElementById('archivo');
var verImagen= document.getElementById('verImagen');

  var pro=document.getElementById('productos');
  var id="";
  var Nombre= "";
  var des="";
  var precio="";
  var status="";
  var nombreimg="";
  var url="";
  var color="";
  var talla="";

function leer() {
    id=document.getElementById('ID').value;
    Nombre=document.getElementById('nombre').value;
    des=document.getElementById('mat').value;
    talla= document.getElementById('talla').value;
    document.getElementById('precio').value=precio;
    document.getElementById('estado').value=estado;
    document.getElementById('imgNombre').value=nombreimg;
    document.getElementById('url').value=url;
}

function escribirinputs(){
    document.getElementById('ID').value=id;
    document.getElementById('nombre').value=Nombre;
    document.getElementById('mat').value= des;
    document.getElementById('talla').value=talla;
    document.getElementById('precio').value=precio;
    document.getElementById('estado').value=estado;
    document.getElementById('imgNombre').value=nombreimg;
    document.getElementById('url').value=url;
  }

  function agregar(){
    leer();
    set(ref(db,"productos/" + id),{
      nombre:Nombre,
       material:des,
       talla:talla,
       precio:precio,
       Status:estado,
       nombreimg:nombreimg,
       url: url
   
       }).then((docRef)=>{
           alert("Se agrego el registro con exito");
         mostrarDatos();
         limpiar();
       
       }).catch((error)=>{
           alert("Surgio un error", error);
       })
  }

  function mostrarDatos(){
    leer();
    const dbref= ref(db);
    pro.innerHTML="";
    get(child(dbref,'productos/' + id)).then((snapshot)=>{
        if(snapshot.exists()){
            Nombre= snapshot.val().nombre;
            des = snapshot.val().material;
            talla = snapshot.val().talla;
            estado= snapshot.val().estado;
            precio=snapshot.val().precio;
            nombreimg= snapshot.val().nombreimg;
            url= snapshot.val().url;
            escribirinputs();
            if(status=="0"){
              pro.innerHTML= pro.innerHTML +"<div class='productos'>" +   
              "<a>ID: " + id + "</a><hr>" +  
              "<img src='"+url+"' alt=''>" +
              "<hr>" +
              "<h9>" + Nombre + "</h9>" + 
              "<p> Material: " + des + "<br><hr> Talla/Tamaño: "+
              talla + "<hr>" +
              "<center><a href=''>$" + precio +"MXN</a>"+ "<br>"+
              "<button id='btn2' >Disponible</button></center>"+
              "<br>" +
              "</center></div>";
              }
        }else{
            alert("No existe la id");
        }
    }).catch((error)=>{
        alert("Surgio un error" + error);
    })
  }

  function actualizar(){
    leer();
    update(ref(db, 'productos/' + id),{
      nombre:Nombre,
       material:des,
       talla: talla,
       precio:precio,
       estado:estado,
       nombreimg: nombreimg,
       url: url
    }).then(()=>{
        alert("Se realizó actualizacion");
        mostrarDatos();
        limpiar();
    }).catch(() => {
        alert("Surgio un error" + error);
        limpiar();
    });
  }

  function deshabilitar(){
    leer();
    update(ref(db, 'productos/' + id),{
      Status:"1"
    }).then(()=>{
        alert("Se deshabilitó");
        mostrarDatos();
        limpiar();
    }).catch(() => {
        alert("Surgio un error" + error);
    });
  }

  function limpiar(){
    id="";
    Nombre="";
    estado="";
    precio="";
    des="";
    talla="";
    nombreimg="";
    url="";
    escribirinputs();
  }

  function cargarImagen(){
    const file= event.target.files[0];
    const name= event.target.files[0].name;
  
    const storage= getStorage();
    const storageRef= refS(storage, 'imagenes/' + name);
  
    uploadBytes(storageRef, file).then((snapshot) => {
      document.getElementById('imgNombre').value=name;
  
      alert('se cargo la imagen');
    });
  }
  
  function descargarImagen(){
    archivo= document.getElementById('imgNombre').value;
    // Create a reference to the file we want to download
  const storage = getStorage();
  const starsRef = refS(storage, 'imagenes/' + archivo);
  
  // Get the download URL
  getDownloadURL(starsRef)
    .then((url) => {
     document.getElementById('url').value=url;
     document.getElementById('imagen').src=url;
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          console.log("No existe el archivo");
          break;
        case 'storage/unauthorized':
          console.log("No tiene permisos");
          break;
        case 'storage/canceled':
          console.log("No existe conexion con la base de datos")
          break;
  
        // ...
  
        case 'storage/unknown':
          console.log("Ocurrio algo inesperado")
          break;
      }
    });
  }
  //Funciones botones
  
  btnAgregar.addEventListener('click', agregar);
  btnBuscar.addEventListener('click', mostrarDatos);
  
  btnActualizar.addEventListener('click', actualizar);
  btnBorrar.addEventListener('click', deshabilitar);
  archivo.addEventListener('change', cargarImagen);
  verImagen.addEventListener('click', descargarImagen);
  //Window.onload(mostrarProductos());