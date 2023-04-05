/***********PRODUCT PAGE **********************/
// Get Id product
idCameras= location.search;
const urlSearchParams = new URLSearchParams(idCameras); 
const id = urlSearchParams.get("id");

/**************API FECTH*********************************/
const apiUrl = fetch('http://localhost:3000/api/cameras/' + id)

apiUrl.then(async(responseData)=>{
    const response = await responseData.json();
   
    if(id==response._id){
        let cartOneCameras= document.getElementById("card"); 
        cartOneCameras.innerHTML=`  
            <div id="product_select">
            <div id="cadre">
                <img src=${response.imageUrl}>
                <h3>${response.name}</h3>
                <p>${response.price}€</p>
            </div>
            
            <div id="pictInfo">
                <p>${response.description}</p>
           
            <div id="option_lenses">
                <select id = "mySelect" onchange="validate()">
                    <option value= "Sélectionner un objectif" class="msgSelect">Sélectionner un objectif</option>
                    <option value= ${response.lenses[0]} id="option1"> ${response.lenses[0]}</option>
                    <option value= ${response.lenses[1]} id="option2"> ${response.lenses[1]}</option>                         
                </select>
            </div>          
                <button id="btn" class="btn-product btn btn-success" >Ajouter au panier</button>                 
           
            </div> 
            </div>`;
                     
/*Redirect button to basket page*/ 
/*Add  and save product basket into localStorage*/
     
btn.disabled=true;
let button=btn.addEventListener("click", save);
let optionChoice = document.getElementById("mySelect").value ;
function save(){
    if(optionChoice==="Sélectionner un objectif"){
        btn.disabled=false;                                
       }
        //save article in Data array
        if(localStorage.getItem("data")==null){
        localStorage.setItem("data",'[]');    
         }
        //Add new item in Array with old items
        let old =JSON.parse(localStorage.getItem("data"));
        old.push(response);
        localStorage.setItem('data',JSON.stringify(old));
        //redirect
        location.href="basket_page.html?id="+ response._id ;
        }           
    } 
        
 }); 


//----Choose option-------

    function validate(){
        let optionChoice = document.getElementById("mySelect").value ;
        if(optionChoice=="Sélectionner un objectif"){
                alert("Vous devez sélectionner une option");
                btn.disabled =true;              
        }
        else{
            btn.disabled=false;
            console.log(optionChoice);
           
            
        }          
    }
  
  









  
  

  








  






  
  

  






