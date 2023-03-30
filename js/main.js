/*********CONNECTION API*************/
function allCam(){ 
const apiUrl = fetch('http://localhost:3000/api/cameras/')     
apiUrl.then(async(responseData)=>{
    const response = await responseData.json();
try{
    const cameraImg= response[0].imageUrl;
}catch(err){
    console.log('Response from API fail',error);
}
 /********Home Page build******************/
//create HTML tag
response.forEach(function(responses){ 
	let liste = document.getElementById("liste");
	let imgProd = document.createElement("img");
	let nameProd = document.createElement("h2");
	let infoProd = document.createElement("a");
	let priceProd = document.createElement("p");
	let cadre= document.createElement("div");
//create attribute
	imgProd.setAttribute("src",responses.imageUrl);
//redirection to Page Product
	infoProd.setAttribute("href", "product_page.html?id=" + responses._id);
    cadre.setAttribute("id","cadre");
//tag content
	nameProd.innerHTML= responses.name;
	infoProd.innerHTML="En Savoir Plus";
	priceProd.innerHTML= responses.price +" "+"€";
    cadre.innerHTML= "";
// DOM modif
    liste.appendChild(cadre);
	liste.appendChild(imgProd);
	liste.appendChild(nameProd);
	liste.appendChild(priceProd);
	liste.appendChild(infoProd);
	cadre.appendChild(imgProd);
	cadre.appendChild(nameProd);
	cadre.appendChild(priceProd);
	cadre.appendChild(infoProd);

    })
	
 });

};

allCam();


 


 
  
   
 

   
 




   
  

  

 




	


