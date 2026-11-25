const foodPrices={
    burger:550,
    pizza:1200,
    pasta:850,
    sandwich:450,
    fries:300,
    drink:200
};
const foodNames={
    burger:"Classic Burger",
    pizza:"Cheese Pizza",
    pasta:"Creamy Pasta",
    sandwich:"Chicken Sandwich",
    fries:"Crispy Fries",
    drink:"Fresh Drink"
};
const foods=["Burger","Pizza","Pasta","Fries","Sandwich"];
const orderTotal=document.getElementById("orderTotal");
const quantityInputs=document.querySelectorAll(".food-quantity");
const foodSelects=document.querySelectorAll(".food-select");
const orderAlert=document.getElementById("orderAlert");
const orderForm=document.getElementById("orderForm");
const foodSearch=document.getElementById("foodSearch");
function calculateTotal(){
    let total=0;
    foodSelects.forEach((select,index) => {
        const quantityInput=quantityInputs[index];
        const selectedFood=select.value;
        quantityInput.disabled=!selectedFood;
        if(!selectedFood){
            quantityInput.value=1;
            return;
        }
        let quantity=Number(quantityInput.value);
   
    
    if(quantityInput.value==="" || !Number.isFinite(quantity) || quantity<1){
        quantity=1;
    }
    if(quantity>99){
        quantity=99;
    }
    quantityInput.value=quantity;
    total+=foodPrices[selectedFood] * quantity;
     });
    orderTotal.textContent=formatPrice(total);
    return total;
}
function formatPrice(amount){
    return "Rs. " + amount.toLocaleString("en-PK");
}
function hideAlert(element){
    element.textContent="";
    element.className="alert d-none";

}
foodSelects.forEach( (select) =>{
    select.addEventListener("change", ()=>{
        calculateTotal();
        hideAlert(orderAlert);
    })
})
quantityInputs.forEach( (input) =>{
    input.addEventListener("input",()=>{
        calculateTotal();;
        hideAlert(orderAlert);
    })
})
document.querySelectorAll(".order-food").forEach( (button) => {
    button.addEventListener("click",()=>{
        const selectedFood=button.dataset.food;
        let targetSelect=Array.from(foodSelects).find( (select)=> !select.value);
        if(!targetSelect){
            targetSelect=foodSelects[0];
        }
        targetSelect.value=selectedFood;
        calculateTotal();
        hideAlert(orderAlert);
        document.getElementById("order").scrollIntoView({ behavior:"smooth"});
    });
});
function showAlert(element,message,type){
    element.textContent=message;
    element.className="alert alert-"+type;
    element.scrollIntoView({behavior:"smooth",block:"nearest"});
}
orderForm.addEventListener("submit",(event) =>{
    event.preventDefault();
    event.stopPropagation();
    const total=calculateTotal();
    const hasFood=Array.from(foodSelects).some( (select)=>select.value!=="");
    orderForm.classList.add("was-validated");
    if(!orderForm.checkValidity()){
        showAlert(
        orderAlert,
         "Please complete all required fields correctly.",
        "danger"
          
        );
        return;
    }
    if (!hasFood || total <= 0) {
        showAlert(orderAlert, "Please select at least one food item before placing your order.", "warning");
        return;
    }
    const customerName=document.getElementById("customerName").value.trim();
    const selectedItems=[];
    foodSelects.forEach( (select,index)=>{
        if(select.value){
            selectedItems.push(
            foodNames[select.value]+ "x"+quantityInputs[index].value);
            
        }
    });
    showAlert(orderAlert,"Thank You, "+customerName+"!Your demo order for "+selectedItems.join(",")+" has been placed successfully.Total: "+formatPrice(total)+ ".This is a front-end demonstration only.","success");
 
})
orderForm.addEventListener("reset",()=>{
    orderForm.classList.remove("was-validated");
    hideAlert(orderAlert);
    requestAnimationFrame(calculateTotal);
})
contactForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    event.stopPropagation();
    contactForm.classList.add("was-validated");
    if(!contactForm.checkValidity()){
        showAlert(contactAlert,"Please complete all contact fields correctly.","danger");
    return;
    }
    showAlert(
        contactAlert,"Thank you! your message has been validated successfully.","success");
    contactForm.reset();
    contactForm.classList.remove("was-validated");
});
contactForm.querySelectorAll("input,textarea").forEach( (field)=>{
    field.addEventListener("input",()=>{
        hideAlert(contactAlert);
    });
});
foodSearch.addEventListener("input",()=>{
    const searchText=foodSearch.value.trim().toLowerCase();
    const foodItems=document.querySelectorAll("#foodCards .food-item");
    let visibleItems=0;
    foodItems.forEach( (item)=>{
        const foodName=item.dataset.name || "";
        const foodCategory=item.dataset.category || "";
        const matches=foodName.includes(searchText) || foodCategory.includes(searchText);
        item.classList.toggle("d-none",!matches);
        if(matches){
            visibleItems++;
        }
        noResults.classList.toggle("d-none",visibleItems!==0);

    });
});
calculateTotal();