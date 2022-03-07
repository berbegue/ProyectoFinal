/* El siguiente simulador solicita al usuario la carga del salario mensual y el plazo en el que se 
quiere solicitar el credito.
En base a esos datos, tasas nominales anuales estandares y utilizando el sistema de amortizacion frances, 
calcula periodo a periodo el valor de la cuota (en sistema frances es fijo), y la composicion (interes y capital).
Como asi tambien el saldo de capital periodo a periodo.
*/
console.log('Primer Pre-entrega esta en funcionamiento');
alert('Bienvenido a Calculadora de Credito')
let ingreso=0
let plazo=0
let TNA=0
let monto=0;
const Credito=[];
let p=0;
let info=0;
function definirTNA(ingreso,plazo){
    if (ingreso<100000){
        if (plazo==1){
            TNA=1.8;
        } else if (plazo==2){
            TNA=2;
        } else {
            TNA=2.2;
        }
    } else if (ingreso<250000){
        if (plazo==1){
            TNA=1.1;
        } else if (plazo==2){
            TNA=1.5;
        } else {
            TNA=1.8;
        }
    } else {
        if (plazo==1){
            TNA=0.6;
        } else if (plazo==2){
            TNA=0.75;
        } else {
            TNA=0.95;
        }
    }
}
function ingresoDatos(){
        while (ingreso<=0 || isNaN(ingreso)){
        ingreso=parseInt(prompt('Cuál es su ingreso mensual en pesos'))
        if(ingreso<0 || isNaN(ingreso)){
            alert('Valor invalido')
        }
    }
    while (plazo>3 || plazo<1 || isNaN(plazo)){
        plazo=(prompt('Ingrese plazo de devolución del credito \n 1-12 meses \n 2-24 meses \n 3-36 meses'))
        if(plazo>3 || plazo<1 || isNaN(plazo)){
            alert('Plazo invalido')
        }
    }
    p=plazo*12;
    monto=(ingreso*.2*p);
}
function calculoCredito(TNA,ingreso,plazo){
    let j=TNA/12;
    let C=(monto*j*(1+j)**plazo)/((1+j)**plazo-1);
    let Tp=0;
    let tpi=0;
    let Si=0;
    let ip=0;
    let Si0=monto;
    for(i=1;i<=plazo;i++){
        tpi=C-Si0*j-Si*j;    
        Tp=Tp+tpi;    
        Si=monto-Tp;
        ip=C-tpi;
        Si0=0
        Credito.push({Periodo:  i.toFixed(2), Capital:  tpi.toFixed(2) , Interes:  ip.toFixed(2), Cuota: C.toFixed(2), Saldo: Si.toFixed(2)});
   }
}

function visualizar (){
    if (info==1){
        Credito.forEach(e => {
            console.log(`Periodo: ${e.Periodo} Capital: ${e.Capital}` );
        })
} else if(info==2){
    Credito.forEach(e => {
        console.log(`Periodo: ${e.Periodo} Capital: ${e.Interes}` );
    })
}else if(info==3){
    Credito.forEach(e => {
        console.log(`Periodo: ${e.Periodo} Capital: ${e.Saldo}` );
    })
}else {
    Credito.forEach(e => {
        console.log(`Periodo: ${e.Periodo} Capital: ${e.Cuota}` );
})
}
}


function preguntaPeriodo(){
 while (info>4 || info<1 || isNaN(info)){
    info=(prompt('Que información desea consultar? \n 1- Capital \n 2- Interes \n 3- Saldo \n 4- Cuota'))
    if(info>4 || info<1 || isNaN(info)){
        alert('Ingreso Invalido!')
    }
}
}

ingresoDatos();
definirTNA(ingreso,plazo);
calculoCredito(TNA,monto,p)
preguntaPeriodo();
visualizar();

