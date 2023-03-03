
/********************CONFIRMATION PAGE********************************/
//variables
let sum = document.getElementById("result");
let resume = document.getElementById("resume");

let productsInLocal =JSON.parse(localStorage.getItem("data"));
console.log('Products localStorage', productsInLocal);
let respInfoServer =JSON.parse(localStorage.getItem("infoProduit"));
console.log('info back from server',respInfoServer);

let somme=0 ; 

/*************STRUCTURE PAGE **********************/

//Thank you message 

	let{contact,products,orderId}= JSON.parse(localStorage.getItem("infoProduit"));


	resume.innerHTML =`
     
    <div class="thankMsg">
 	<p>MERCI POUR VOTRE COMMANDE</p>
 	<p>Votre numéro de commande est ${orderId}</p>
    </div>

     `

// Total basket
productsInLocal.forEach((items,index)=>{

	somme +=items.price;
	sum.innerHTML=`

      <p>Le total de vos achats est de ${somme +" "+"€"}</p>
	

	`


});

/***********************************************/
console.log('orderId',respInfoServer.orderId);
console.log('Products',respInfoServer.products);
console.log('infoContact',respInfoServer.contact);






