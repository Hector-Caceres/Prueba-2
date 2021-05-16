//LOGIN



// funcion que valida usuario y clave al presionar el boton ingresar
$("#btn_ingresar").click(function() {
    
	
	
    // Limpiar errores
    $("#mensajesLogin").empty();

    // Variables del login
    usuario = $("#txt_usuario").val();
    clave = $("#txt_clave").val();
    validador = 0;


    // Casos del login 
        if(usuario == "") {
                $("#mensajesLogin").append('<li> Debe ingresar un usuario </li>');
                $('#txt_usuario').removeClass('is-valid')
                $('#txt_usuario').addClass('is-invalid');
        }
        else{  
                validador = validador + 1;
                $('#txt_usuario').removeClass('is-invalid')
                $('#txt_usuario').addClass('is-valid');
        };
        
        if(clave == "") {
                $("#mensajesLogin").append('<li> Debe ingresar una contraseña </li>');
                $('#txt_clave').removeClass('is-valid')
                $('#txt_clave').addClass('is-invalid');
        }else{  
                validador = validador + 1
                $('#txt_clave').removeClass('is-invalid')
                $('#txt_clave').addClass('is-valid');
        };
        
        if ( validador == 2 ) {
                window.open("bienvenido.html");
        };

});




//REGISTRO

// Funcion que valida que esten todos los campos completos del registro
$("#btn_registro").click(function() {

    // Limpiar errores
    $("#errores").empty();

    // Variables del registro
    rut = $("#txt_rut").val();
    nombre = $("#txt_nombre").val();
    appaterno = $("#txt_appaterno").val();
    apmaterno = $("#txt_apmaterno").val();
    mail = $("#txt_mail").val();
    cuenta = $("#cmb_tipocuenta option:selected").text();
    banderin = 0;

    if (nombre == "") {
        $("#errores").append('<li> Debe ingresar un nombre </li>');
        $('#txt_nombre').removeClass('is-valid')
        $('#txt_nombre').addClass('is-invalid');

    } else {
        banderin = banderin + 1;
        $('#txt_nombre').removeClass('is-invalid')
        $('#txt_nombre').addClass('is-valid');
    };

    if (appaterno == "") {
        $("#errores").append('<li> Debe ingresar un apellido paterno </li>');
        $('#txt_appaterno').removeClass('is-valid')
        $('#txt_appaterno').addClass('is-invalid');
    } else {
        banderin = banderin + 1;
        $('#txt_appaterno').removeClass('is-invalid')
        $('#txt_appaterno').addClass('is-valid');
    };

    if (apmaterno == "") {
        $("#errores").append('<li> Debe ingresar un apellido materno </li>');
        $('#txt_apmaterno').removeClass('is-valid')
        $('#txt_apmaterno').addClass('is-invalid');
    } else {
        banderin = banderin + 1;
        $('#txt_apmaterno').removeClass('is-invalid')
        $('#txt_apmaterno').addClass('is-valid');
    };

    if (mail == "") {
        $("#errores").append('<li> Debe ingresar un email </li>');
        $('#txt_mail').removeClass('is-valid')
        $('#txt_mail').addClass('is-invalid');
    } else {
        banderin = banderin + 1;
        $('#txt_mail').removeClass('is-invalid')
        $('#txt_mail').addClass('is-valid');
    };

    if(cuenta == "Elegir...") {
        $("#errores").append('<li> Debe seleccionar un tipo de cuenta </li>');
        $('#cmb_tipocuenta').removeClass('is-valid')
        $('#cmb_tipocuenta').addClass('is-invalid');
    }else{  
        banderin= banderin + 1;
        $('#cmb_tipocuenta').removeClass('is-invalid')
        $('#cmb_tipocuenta').addClass('is-valid');
    };


    var largo = rut.length;

    // CASO DE QUE RUT ESTE VACIO
    if (rut == "") {
        $('#errores').append('<li> El rut esta vacio </li>');
        $('#txt_rut').removeClass('is-valid');
        $('#txt_rut').addClass('is-invalid');

    // EL RUT SIN PUNTOS NI GUION TIENE 9 CARACTERES MINIMO, POR ESO ESTA EXCEPCION.
    }else if (largo < 9) {
        $('#errores').append('<li> El rut debe tener minimo 9 caracteres </li>');
        $('#txt_rut').removeClass('is-valid');
        $('#txt_rut').addClass('is-invalid');


    // CASO DE QUE RUT NO ESTE VACIO Y TENGA 9 CARACTERES COMO MINIMO    
    } else { 
        // API
        $.getJSON('https://api.libreapi.cl/rut/validate', {rut: $('#txt_rut').val()}, function(data) {

        var respuesta = data;
        var is_valid = respuesta.data.valid;
            
            //LA API RETORNA EL RUT VALIDO
            if(is_valid == true) { 
                $('#txt_rut').removeClass('is-invalid')
                $('#txt_rut').addClass('is-valid');

                    // SI CUMPLE TODOS LOS BANDERINES Y EL RUT ES VALIDO, PASA A BIENVENIDO
                    if (banderin == 5) {
                        window.open("bienvenido.html");
                    }
               
            }
            else if (is_valid == false) { 
                $('#errores').append('<li> El rut no es valido </li>');
                $('#txt_rut').removeClass('is-valid')
                $('#txt_rut').addClass('is-invalid');
                 
            }
        }).fail(function() {
                $('#errores').append('<li> ERROR DE API </li>');
                $('#txt_rut').removeClass('is-valid')
                $('#txt_rut').addClass('is-invalid');
                 
            });
    }


});

// FUNCTION QUE LIMPIA EL TEXTO DEL REGISTRO
$("#btn_limpiar").click(function() {
    $("#txt_rut").val('');
    $("#txt_nombre").val('');
    $("#txt_appaterno").val('');
    $("#txt_apmaterno").val('');
    $("#txt_mail").val('');
    $("#cmb_tipocuenta").val("0");
});


$('#btn_indicador').click(function() {
    fn_obtenerIndicador();
})

function fn_obtenerIndicador() {
    $.getJSON('https://api.libreapi.cl/economy/indicators', function(Response) {
        
        valorDolar = 'Dólar: ' + (Response.data.dolar);
        valorEuro = 'Euro: ' + Response.data.euro;
        valorUf = 'UF: ' + Response.data.uf;
        
       
        $('#txt_dolar').val(valorDolar);
        $('#txt_euro').val(valorEuro);
        $('#txt_uf').val(valorUf);
        
    }).fail(function() {
        console.log('Error al consumir la API!');
    });
}


$('#btn_clima').click(function() {
    fn_obtenerClimaActual();
})

function fn_obtenerClimaActual(){
    
    $.getJSON('https://api.libreapi.cl/weather/stations?name=Pudahuel%20Santiago', function(Response) {
        
        var respuesta = (Response.data[0].temperature);
        clima = '';
        
        clima = 'º'  + respuesta;
        $('#txt_clima').val(clima);
        
        
        
   });
}