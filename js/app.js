var Calculadora={
index:0,//cantidadf elementos
cantidadDigitos:0,
punto_activo:false,
classDisplay:null,
valorOperando:0,
contadorDigitosDespuesComa:1,
resultadoFinal:0,
operandos:new Array(),
operacionActual:"",
operacionAnterior:"",
estado:{
  RESET:"0",
  EN_OPERACION:""
},
 operaciones:{
  SUMA:"+",
  RESTA:"-",
  MULTIPLICACION:"*",
  DIVISION:"/",
  IGUAL:"=",
  NHO:"NO HAY OPERACION"
},
  init:function(){
//revisar resultado igual a 0

//testeo
  //  console.log("initittt "+document.getElementById("display").innerHTML);
    console.log("operacion "+this.operaciones.SUMA);
    console.log("empezando calculo");
    //var p=0.1+0.2
    this.classDisplay=document.createElement("style");
    this.classDisplay.type="text/css";
    this.classDisplay.innerHTML=".cssStyle { font-family: digital;font-size: 5em;}";
    document.getElementById("display").className="cssStyle";
   document.getElementById("display").appendChild(this.classDisplay);
   document.getElementById("display").removeAttribute("id");
  // console.log("valor aitrubto inicial "+document.getElementsByClassName("cssStyle")[0].innerHTML);

   this.cantidadDigitos++;
    this.index++;
    this.operacionAnterior=this.operaciones.NHO;
    console.log("OPERACION ANTERIOR "+this.operacionAnterior);
    Calculadora.eventos();
  },
  eventos:function(){
  var teclas=document.getElementsByClassName("tecla");
//  console.log("teclas "+teclas.length);
  for(i=0;i<teclas.length;i++){
  //  console.log("tecla tam"+teclas[i].offsetHeight);
    teclas[i].onmousedown= Calculadora.disminucionTamanoTecla
    teclas[i].onmouseup=Calculadora.teclaVuelveAsuTamano
  }

  },
  disminucionTamanoTecla:function(ev){
    ev.target.setAttribute("style", "transform:scale(0.95,0.95)")
  //  console.log("presionando");
    Calculadora.obteniendoInputUsuario(ev);

  },
  teclaVuelveAsuTamano:function(ev){
//    console.log("volviendo a tamaño original");
    ev.target.setAttribute("style", "transform:scale(1,1)")
},
  obteniendoInputUsuario:function(ev){
    switch (ev.target.id) {
      case "sign":
  //    console.log("presion signo");
      Calculadora.signo();
      break;
      case "punto":
      if(this.operacionAnterior==this.operaciones.IGUAL||this.valorOperando=="NaN"){
        console.log("entrando reseteo punto");
          Calculadora.agregandoNumeros("0");
      }
      if(this.punto_activo==false){
      Calculadora.ponerEncima(".");
      this.punto_activo=true;
    }else{
      console.log("coma repetida");
    }
      break;
      case "mas":
      console.log("apretando mas" +this.operaciones.SUMA);
      this.operacionActual=this.operaciones.SUMA;
      console.log("operacion "+this.operacionActual);
      Calculadora.generacionResultado(this.operacionActual);
      break;
      case "menos":
      console.log("apretando menos");
      this.operacionActual=this.operaciones.RESTA;
      console.log("operacion "+this.operacionActual);
      Calculadora.generacionResultado(this.operacionActual);
      break;
      case "por":
      console.log("apretando por");
      this.operacionActual=this.operaciones.MULTIPLICACION;
      console.log("operacion "+this.operacionActual);
      Calculadora.generacionResultado(this.operacionActual);
      break;
      case "dividido":
      console.log("apretando dividido");
      this.operacionActual=this.operaciones.DIVISION;
      console.log("operacion "+this.operacionActual);
      Calculadora.generacionResultado(this.operacionActual);
      break;
      case "igual":
      console.log("apretando igual");
      Calculadora.generacionResultado(this.operaciones.IGUAL);
      break;
      case "on":
    //  console.log("reset");
      Calculadora.reset(this.estado.RESET);
      break;
      case "0":

    //  console.log("presinando tecla 0");
    console.log("desde case 0 "+this.valorOperando);
      if(this.valorOperando!=0){
        console.log("poniendo 0");
      Calculadora.agregandoNumeros("0");
    }else{
      console.log("no se puede restriccion 0");
    }
      break;
      case "1":
    //  console.log("presinando tecla 1");
      Calculadora.agregandoNumeros("1");

      break;
      case "2":
  //    console.log("presinando tecla 2");
      Calculadora.agregandoNumeros("2");
      break;
      case "3":
    //  console.log("presinando tecla 3");
      Calculadora.agregandoNumeros("3");
      break;
      case "4":
      //console.log("presinando tecla 4");
      Calculadora.agregandoNumeros("4");
      break;
      case "5":
    //  console.log("presinando tecla 5");
      Calculadora.agregandoNumeros("5");
      break;
      case "6":
    //  console.log("presinando tecla 6");
      Calculadora.agregandoNumeros("6");
      break;
      case "7":
    //  console.log("presinando tecla 7");
      Calculadora.agregandoNumeros("7");
      break;
      case "8":
    //  console.log("presinando tecla 8");
      Calculadora.agregandoNumeros("8");
      break;
      case "9":
      //console.log("presinando tecla 9");
      Calculadora.agregandoNumeros("9");
      break;
      default:
      console.log("default");

    }
  },
  mostrarNumeroPantalla:function(num){

    var display=document.getElementsByClassName("cssStyle")[0];
    display.innerHTML=num;
    display.appendChild(this.classDisplay);//aplico css style
    console.log("valor index"+this.index);
    if(this.valorOperando!=0){
    Calculadora.index++;
    console.log("sumando index desde numero pantalla");
  }else {
    if(this.index!=1){
      Calculadora.index++;
    }else {
      console.log("0 como primer numero index n se suma");
    }

  }

  },
  ponerEncima:function(num){
  var nuevoElemento=document.createElement("span");

  nuevoElemento.className="cssStyle";
  //nuevoElemento.id="display";
  nuevoElemento.innerHTML=num;
  nuevoElemento.appendChild(this.classDisplay);
  document.getElementsByClassName("pantalla")[0].appendChild(nuevoElemento);
  this.index+=1;
},
agregandoNumeros:function(num){
  if(this.operacionAnterior==this.operaciones.IGUAL){
    console.log("calculo de nuevo a partir de numero pulsado por el usuario");
    this.reset(this.estado.EN_OPERACION);
      this.resultadoFinal=0;
      this.operacionActual=this.operaciones.NHO;
      this.operacionAnterior=this.operaciones.NHO;

  }
if(this.cantidadDigitos<=8){
  this.cantidadDigitos++;
  var digito=Number(num);
  Calculadora.generacionOperando(digito);
  if(Calculadora.index>1){
    console.log("ponienfo encima");
    Calculadora.ponerEncima(num);

  }else{
    Calculadora.mostrarNumeroPantalla(num);
  }
  if(this.punto_activo){
    this.contadorDigitosDespuesComa++;
  }
}
},
reset:function(estado){
  var pantalla=document.getElementsByClassName("pantalla")[0];
  var displays=document.getElementsByClassName("cssStyle");
  var tam=displays.length;
//  var primerElemento=document.getElementById("display");
  console.log("RESET");
for(i=1;i<tam;i++){
//console.log("elmento display hijo "+displays[i]);

  pantalla.removeChild(displays[tam-i]);
//  displays.pop();
}

console.log(displays.length);
if(estado==this.estado.RESET){
displays[0].innerHTML=this.estado.RESET;
this.resultadoFinal=0;
this.operacionActual="";
this.operacionAnterior=this.operaciones.NHO;
this.valorOperando=0;
}else{
  //estado en EN_OPERACION
displays[0].innerHTML=this.estado.EN_OPERACION;
this.valorOperando="NaN";
}
displays[0].appendChild(this.classDisplay);
//console.log("nombre de id "+display.id);

this.index=1;
this.cantidadDigitos=1;

if(this.punto_activo){
  this.punto_activo=false;
  this.contadorDigitosDespuesComa=1;
}
console.log(displays[0].innerHTML);
},
signo:function(){
var displays=document.getElementsByClassName("cssStyle");
var pantalla=document.getElementsByClassName("pantalla")[0];
//var primerElemento=document.getElementById("display");
var numeros=[];
//var num=Number(displays[0].innerHTML);
//console.log("valor operando signo "+this.valorOperando);
//console.log("valor resultado final "+this.resultadoFinal);
if(this.valorOperando!=0){
//  console.log("entrando cambio d signo "+displays[0].innerHTML);
console.log("valor operando desde sign "+this.valorOperando);
  if(this.valorOperando>0){
    console.log("pongo numero signo");
    for(i=0;i<displays.length-1;i++){
      numeros[i]=displays[i].innerHTML;
      //console.log("num "+numeros[i]);
    }
    Calculadora.ponerEncima(displays[displays.length-1].innerHTML);
    displays[0].innerHTML="-";
    this.valorOperando*=-1;
    if(this.operacionAnterior==this.operaciones.IGUAL){
      this.resultadoFinal*=-1;
      console.log("cambiom de signo = res final!!"+this.resultadoFinal);
    }
    for(i=0;i<numeros.length;i++){
      displays[1+i].innerHTML=numeros[i];
    }

    }else{
      //fuera signo
  //  console.log("piso singn0");
  //  console.log("valor display en 0 "+displays[0]);
    this.valorOperando*=-1;
  pantalla.removeChild(displays[0]);

  if(this.operacionAnterior==this.operaciones.IGUAL){
    this.resultadoFinal*=-1;
  //  console.log("cambiom de signo =!!"+this.resultadoFinal);
  }
    }
  }
},
generacionOperando:function(digito){

if(this.punto_activo==false){
    if(this.valorOperando!="NaN"){
      this.valorOperando*=10;
      this.valorOperando+=digito;
    //  console.log("generando operando "+this.valorOperando);
    }else{
  //    console.log("no hay numero valor operando es igual digito ingresado");
      this.valorOperando=digito;
    }
}else{
  //hay coma
  var valorComa;
  valorComa=(1/Math.pow(10,this.contadorDigitosDespuesComa)*digito);

  this.valorOperando+=valorComa;
  this.valorOperando=this.valorOperando.toFixed(this.contadorDigitosDespuesComa);
  this.valorOperando=Number(this.valorOperando);
//  console.log("valorComa"+valorComa)
//  console.log("this.valorOperando "+this.valorOperando);

}


},
generacionResultado:function(oper){
//console.log("resultado definicion "+oper);
//console.log("this.operacion "+this.operaciones.SUMA);
//console.log("veamos calc")
if(oper==this.operaciones.IGUAL){
      if(this.operacionActual!=this.operaciones.IGUAL){
        console.log("generando resultado");
        Calculadora.GenerandoOperacion();
        Calculadora.agregarResultadoApantalla(this.resultadoFinal.toString());
        this.operacionAnterior=this.operaciones.IGUAL;
        this.operacionActual=this.operaciones.IGUAL;
      //  console.log("valor operando desde generacion resultado "+this.valorOperando);
      //    console.log("valor resultado desde generacion resultado "+this.resultadoFinal);
      }else{
        console.log("operacion igual repetida");
      }
}else{
    if(this.valorOperando!="NaN"){
  //si hay un operando con numero hace operaciones
  //operaciones basicas
  Calculadora.GenerandoOperacion();
  this.operacionAnterior=oper;
  Calculadora.reset(this.estado.EN_OPERACION);
}else{
    console.log("operacion repetida");
    }
  }

},GenerandoOperacion:function(){
  console.log("this.operacionAnterior "+this.operacionAnterior);
              switch (this.operacionAnterior) {
                case this.operaciones.SUMA:
                console.log("valorOperando"+this.valorOperando);
                this.resultadoFinal+=this.valorOperando;
                console.log("resultadoFinal "+this.resultadoFinal);
                break;
                case this.operaciones.RESTA:
                console.log("resultadoFinal "+this.resultadoFinal);
               console.log("valorOperando "+this.valorOperando);
                this.resultadoFinal-=this.valorOperando;

                break;
                case this.operaciones.DIVISION:
                this.resultadoFinal=this.resultadoFinal/this.valorOperando;
                break;
                case this.operaciones.MULTIPLICACION:
                this.resultadoFinal*=this.valorOperando;
                break;
                case this.operaciones.IGUAL:
                //para q siga operan
                Calculadora.reset(this.estado.EN_OPERACION);
                break;
                case this.operaciones.NHO:
        //        console.log("desde generacion operacion 1ra operacion");
                this.resultadoFinal=this.valorOperando;
          //      console.log("resultadoFinal "+this.resultadoFinal);
                break;
                default:
              }
              console.log("resultado final "+this.resultadoFinal);
},
agregarResultadoApantalla:function(resultado){
  //console.log("resultado "+resultado);
//  console.log("cantidad operandos "+resultado.length);
    Calculadora.reset(this.estado.EN_OPERACION);
  for(i=0;i<resultado.length;i++){
  //  console.log("agregandoNumeros");
  //  console.log("elemento "+resultado[i]);
    if(resultado[i]!="."&&resultado[i]!=this.operaciones.RESTA){
    Calculadora.agregandoNumeros(resultado[i]);
  }else{
    console.log("numero con coma o resta");
    if(resultado[i]==this.operaciones.RESTA){

    Calculadora.mostrarNumeroPantalla(resultado[i]);
  }else{
    //punto

    Calculadora.ponerEncima(resultado[i]);
        }
      }
    }
    if(this.resultadoFinal<0){
      this.valorOperando*=-1;//lo hago aca despues q se genera el operando sinno hay numerop o valor operando
    }
//console.log("valor op "+this.valorOperando);
//console.log("res final "+this.resultadoFinal);
}





}
Calculadora.init();
