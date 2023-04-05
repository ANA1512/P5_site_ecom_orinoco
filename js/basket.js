
/******************BASKET PAGE*********************/
//Variables for the BASKET
//All products selected and store
let localBasket=  JSON.parse(localStorage.getItem('data'));

//Initialization of a new basket including quantity
let editedBasket = [];   
let index = {};

// Total for all products
let totalAllProd = document.getElementById("total");
let total=[];
total =0;

// Suppress item - trash icone (page structure)
let buttonSup = document.getElementById("supprimer");
let itemsCart =document.getElementById("itemsCart");

/********************ADD QUANTITY************************/
//ADD quantity each click on "ajouter au panier"
localBasket.forEach(element => {
 addQuantity(element);
});
// ADD quantity (in editedBasket)
function addQuantity(obj) {
    
    if (obj._id in index ) {
       index[obj._id].quantity += 1;
   } else {
       index[obj._id] = obj;
       obj.quantity = 1;
       editedBasket.push(obj);
   }
};
/****************DELETE ONE PRODUCT (icone) ******************************/
function suppression(id){
       let list= localBasket.filter(item => {
      return item._id != id;
    });
     localBasket=list;
     localStorage.setItem('data', JSON.stringify(list));
     location.reload();
 };

/***********************PAGE STRUCTURE***********************************/
function display(){ 
   let itemsDisplay= document.getElementById("items");

        //Table structure 
        itemsDisplay.innerHTML =''
        
        //Loop forEach for Item in new Basket
        editedBasket.forEach((items,index)=>{ 
        
        //Display all products in HTML page
         itemsDisplay.innerHTML += `  
         
         <div class= "prod">
         <div class= "pict">
         <img src=${editedBasket[index].imageUrl} class="cartpict">${editedBasket[index].lenses[index]}</td>
         </div>

         <div class="infoPict">
         <p>${editedBasket[index].name}</p>
         <input  type="number" value='${editedBasket[index].quantity}' id="quantite" >

         <p>${editedBasket[index].price}€</p>
         <div id="supprimer" onclick="suppression('${editedBasket[index]._id}')"><i class="far fa-trash-alt"></i></div>
         </div>
         </div>
         
         `
        //Total (sum of all products)
        totalAllProd.innerHTML ="Total:" +" "+(total+=editedBasket[index].price*editedBasket[index].quantity)+ "€"+" "+"("+localBasket.length+")";     
       });
    };

    display();

//****EMPTY BASKET ( editedbasket et localStorage)*******/
const spanpv = document.querySelector("#pv");   
 if(localBasket.length>= 1){
  spanpv.remove();
  };

/*************************FORMS********************************************************/
//variables 
let inputs = document.getElementsByTagName("input");
let mail = document.getElementById("mail");
let myName = document.getElementById("nom");
let myFirstName = document.getElementById("prenom");
let myTown = document.getElementById("ville");
let myStreet = document.getElementById("rue")
let confirmation= document.getElementById("mail-confirm");
let buttonForm = document.getElementById("button");
let inscription = document.getElementById("inscription");
let msgMail= document.getElementById("msgMail");
let msgConfir= document.getElementById("msgConfir");
let errorFormat = document.getElementById("erreur");
let msgName = document.getElementById("msgName");
let msgPrenom = document.getElementById("msgPrenom");
let msgRue = document.getElementById("msgRue");
let msgVille = document.getElementById("msgVille");


/********* REGEXP *******/
// validation mail
const emailRegExp ='^[ a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$';
// nom prenom ville 
const civilId ='^[a-zA-Z]{1,30}$';
// rue 
const streetBuyer = '^[a-zA-Z0-9]';

/****STRUCTURE FORM********/
let infoPerso= document.createElement("h3");
let contact= document.getElementById("formulaire");
infoPerso.innerHTML="Formulaire";
contact.appendChild(infoPerso);

/****************Test de Vérification du champs mail uniquement*******/
function checkMail(){
        // Test email valid
         if(mail.value.match(emailRegExp)){
          msgMail.textContent="Votre email est valide"; // mail valid
          msgMail.style.color="lightgreen";
          buttonForm.style.visibility="visible";

        // Test email field empty        
        }else if(mail.value ==''){
         msgMail.textContent="Veuillez remplir le champs";
         msgMail.style.color="blue"; // couleur du message 
         buttonForm.style.visibility="hidden";    
       }
        //Test mail  incorrect regexp
        else if(!mail.value.match(emailRegExp)){ 
          msgMail.textContent= "Votre email est incorrecte";
          msgMail.style.color="red";
          buttonForm.style.visibility="hidden"; 
        }
};
/************** INPUT CITY **************************** */
function checkCivil() {
    if(myTown.value.match(civilId)){
      buttonForm.style.visibility="visible";
      msgVille.textContent="le format ville est correct";
      msgVille.style.color="lightgreen"; 
    }else{
      buttonForm.style.visibility="hidden";
      msgVille.textContent="Le format nom est incorrect";
      msgVille.style.color="red";
  }
};
//-----------INPUT NAME --------------------------
function checkName(){
   if(myName.value.match(civilId)){
     //console.log("****** format nom valide ******");
     buttonForm.style.visibility="visible";
     msgName.textContent="le format nom est correct";
     msgName.style.color="lightgreen";
   }else{
    buttonForm.style.visibility="hidden";
     msgName.textContent="Le format nom est incorrect";
     msgName.style.color="red";
    return
   }
};
//-------------INPUT PRENOM------------------------
function checkFirstName(){
  if(myFirstName.value.match(civilId)){
    buttonForm.style.visibility="visible";
    msgPrenom.textContent="Votre prénom est valide";
    msgPrenom.style.color="lightgreen";
  }else{
   buttonForm.style.visibility="hidden";
   msgPrenom.textContent="Votre prénom est invalide";
   msgPrenom.style.color="red";
   return
  }
};
//-----------INPUT STREET --------------------
function checkStreet(){
  if(myStreet.value.match(streetBuyer)) { 
    buttonForm.style.visibility="visible";
    msgRue.textContent="Le format est valide";
    msgRue.style.color="lightgreen";
  }else{
    buttonForm.style.visibility="hidden";
    msgRue.textContent="Le format est invalide";
    msgRue.style.color="red";
    return
  }
};
//------------Validation de tous les inputs----------
//Validation for all fields
let formVal = document.getElementById("inscription");
   formVal.addEventListener("submit", function(e){
    e.preventDefault();
 // Get inputs and save it in Constructor
 let inputName= document.getElementById("nom").value;
 let inputFirstName = document.getElementById("prenom").value;
 let inputRue = document.getElementById("rue").value;
 let inputVille= document.getElementById("ville").value; 
 let inputMail = document.getElementById("mail").value; 


// verif champ correct regex pas d'envoi 
if (inputName.match(civilId)
  && inputFirstName.match(civilId)
  &&inputRue.match(streetBuyer)
  && inputVille.match(civilId)
  && inputMail.match(emailRegExp)){
        console.log( " les champs sont valides");
    }else{
        console.log ( "problème de champs ")
      return
   }

// verif que les input sont remplis
  if ( inputName.length<1 
    || inputFirstName.length<1 
    || inputRue.length<1 
    || inputVille.length<1 
    || inputMail.length<1){

    alert("Veuillez remplir les champs du formulaire");
    return
    
    }else{
    console.log(" Tous  les champs sont remplis ");
    }

      
 /*Save data in localStorage*/
//get product id from the basket
      let products=[];
      const productSelected=[];

      for(i=0; i<editedBasket.length; i++){   
      productSelected.push(editedBasket[i]._id);
      }
// Constructor pour récupérer les infos contact et produits du formulaire
      order={
          contact: {
              firstName:inputFirstName,
              lastName: inputName,
              address:inputRue ,
              city: inputVille,
              email: inputMail
          },
            products: productSelected
        }
      localStorage.setItem("infoProduit", JSON.stringify(order));
/****************ENVOI DU FORMULAIRE A L API*************************/
       fetch('http://localhost:3000/api/cameras/order',{
            method: "POST",
            body:JSON.stringify(order),
            headers: {"Content-Type":"application/json"}
       })
       .then(response=> response.json())
        //save info and orderId create in localStorage
          .then((data) =>{
          localStorage.setItem("orderId", JSON.stringify(data.orderId)) ; 
          document.location.href ="confirmation_page.html";
         })
        
        // if error request invalid
         if(erreur){
          console.log("requête invalide");
        //if no error request valid
          }else{
         console.log( "requête valide") 
       } 
    });
  



    











   