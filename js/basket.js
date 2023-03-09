
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

/*********************************************************/

// Test basket content and store in the localStorage
console.log('localBasket', localBasket);

// New basket content
console.log('editedBasket', editedBasket);

/********************ADD QUANTITY************************/


//ADD quantity each click on "ajouter au panier"
localBasket.forEach(element => {
 addQuantity(element);

});

// ADD quantity (in editedBasket)
function addQuantity(obj) {
    
    if (obj._id in index) {
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
     console.log(localBasket);
     console.log(editedBasket);
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

/**********************************************************/

/*  ADD quantity for one product*/

// let test= document.getElementById("quantite").value; 

// console.log (test);


 /****EMPTY BASKET ( editedbasket et localStorage)*******/


    
// if(localBasket.length== 1){
    
    
  // let itemsDisplay= document.getElementById("panier");
  // let panierVide = document.createElement("p");
  //  panierVide.innerHTML = "VOTRE PANIER EST VIDE"; 
  //  itemsDisplay.appendChild(panierVide);
  //  panierVide.style.color="#ff33cc";
  //  console.log( "Votre panier est vide");

  // let removeForm= document.getElementById("container");
  // let titleForm= document.getElementById("formulaire");
  // titleForm.style.display="none";
  // removeForm.style.display="none";
  //  localStorage.clear();


  //};

  

/*************************FORMS********************************************************/

//variables 
let inputs = document.getElementsByTagName("input");
let mail = document.getElementById("mail");
let confirmation= document.getElementById("mail-confirm");
let buttonForm = document.getElementById("button");
let inscription = document.getElementById("inscription");

/********variable notification *******/
let msgMail= document.getElementById("msgMail");
let msgConfir= document.getElementById("msgConfir");

/********* OBJET  REGEXP *******/

// validation mail
const emailRegExp ='^[ a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$';

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

/******************fields validation **********************/

     //Validation for all fields
     let formVal = document.getElementById("inscription");

     formVal.addEventListener("submit", function(e){
      
      let erreur; 
      e.preventDefault();
      let inputs= this;

    /* All field check*/
  
      for (let i=0; i<inputs.length; i++){
         
         if(!inputs[i].value){

           erreur= "Veuillez vérifier tous les champs";
           buttonForm.style.display="none";
         }


         if(erreur){
          e.preventDefault();
          document.getElementById("erreur").innerHTML = "your form sucks buddy get it together !";
          console.log(' form INCORRECT','form not ok')
         }else{

          console.log('form CORRECT', "good job");
          document.getElementById("erreur").innerHTML = "your form it's better !"
          buttonForm.style.display="block";
         }
     };
 
         
 /*Save data in localStorage*/
        
      // Get inputs and save it in Constructor

      let inputName= document.getElementById("nom").value;
      let inputFirstName = document.getElementById("prenom").value;
      let inputRue = document.getElementById("rue").value;
      let inputVille= document.getElementById("ville").value; 
      let inputMail = document.getElementById("mail").value; 

      //get product id from the basket
      let products=[];
      const productSelected=[];

      for(i=0; i<editedBasket.length; i++){
        
      productSelected.push(editedBasket[i]._id);
      }

      console.log('productSel',productSelected);

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
        console.log('infoContact nom et id', order);
       
  
/****************ENVOI DU FORMULAIRE A L API*************************/
  

       fetch('http://localhost:3000/api/cameras/order',{

            method: "POST",

            body:JSON.stringify(order),

            headers: {"Content-Type":"application/json"}

       })

       .then(response=> response.json())
        //save info and orderId create in localStorage
        
          .then((data) =>{
         
          console.log(data)
          localStorage.setItem("orderId", JSON.stringify(data.orderId)) ; 
          alert( "Veuillez confirmer votre commande en cliquant sur ok" ,
          document.location.href ="confirmation_page.html" );
         
         })
        
       // if error request invalid
       if(erreur){

          console.log('Requête non autorisé:',"Votre panier est INVALIDE");

      //if no error request valid
       }else{
         console.log( 'Requête autorisé:',"Votre panier est VALIDE")
       
          
       }

      
     }); 

     





    











   