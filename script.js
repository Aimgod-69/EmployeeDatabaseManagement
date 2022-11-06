(async function(){
    let employeesArray 

    let data = await fetch("./empdata.json");
    employeesArray = await data.json();

    let employeeslist = document.querySelector(".employeeslist");
    let selectedElement = employeesArray[0];
    let selectedElementId = 1001;
    let employeedetailscontainer =  document.querySelector(".employeedetailscontainer");
    let addEmployeeButton = document.querySelector(".navbar__addbtn");
    let employeeForm = document.querySelector(".form");
    let formcontainer = document.querySelector(".formcontainer");
    let form = document.querySelector(".formcontainer__form");

    
    
    




    function renderEmployeeList(){

        employeeslist.innerHTML = "";
        let title = document.createElement("div");
        title.classList.add("employeeslist__title");
        title.innerHTML = "Employees List";
        employeeslist.appendChild(title);
        
            employeesArray.forEach((emp)=>{
                let employee = document.createElement("span");
                employee.classList.add("employeeslist__employee");
                employee.setAttribute("id",emp.id);
                employee.innerHTML = `${emp.firstName} ${emp.lastName}<i class="fa-solid fa-xmark"></i>`;
                if(selectedElementId === parseInt(employee.id))
                {
                    employee.classList.add("selected");
                }
    
                employeeslist.appendChild(employee);
            
            })
        

    }

    function renderEmployeeDetails(){
        employeedetailscontainer.innerHTML = "";

        if(selectedElementId != -1 && selectedElement!=null)
        {
        
        let employeedetails = document.createElement("div");



        employeedetails.innerHTML = `<div class="employeedetailscontainer__title">Employee Details</div><img class="employeedetails__img" src=${selectedElement.imageUrl}>
        <div class="employeedetails__name">${selectedElement.firstName} ${selectedElement.lastName} (${selectedElement.age})</div>
        <div class="employeedetails__address">${selectedElement.address}</div>
        <div class="employeedetails__email">${selectedElement.email}</div>
        <div class="employeedetails__contact">Mobile - ${selectedElement.contactNumber}</div>
        <div class="employeedetails__dob">DOB - ${selectedElement.dob}</div>`

        employeedetails.classList.add("employeedetails");

        employeedetailscontainer.appendChild(employeedetails);
        }


    }

    


    addEmployeeButton.addEventListener("click",(e)=>{
        formcontainer.style.display = "flex";
    })

    formcontainer.addEventListener("click",(e)=>{
        if(e.target.className == "formcontainer"){
            formcontainer.style.display = "none";
        }
    })

    form.addEventListener("submit",(e)=>
    {
        e.preventDefault();
        const formdata = new FormData(form);
        const values = [...formdata.entries()];

        let empData = {};

        values.forEach((val)=>{
            empData[val[0]] = val[1];
        })

        empData.id = employeesArray[employeesArray.length - 1].id + 1;
        empData.age = new Date().getFullYear() - parseInt(empData.dob.slice(0,4),10);
        empData.imageUrl = empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";

        employeesArray.push(empData);
        renderEmployeeList();
        form.reset();
        formcontainer.style.display = "none";

    })





    employeeslist.addEventListener("click",(e)=>{
        let id;
        if(e.target.tagName === "SPAN" && e.target.id!==selectedElementId)
        {
            selectedElementId = parseInt(e.target.id);
            employeesArray.forEach((emp)=>{
                if(emp.id === parseInt(e.target.id)){
                    selectedElement = emp;
                }
            })

            renderEmployeeList();
            renderEmployeeDetails();
        }

        if(e.target.tagName === "I")
        {
            id = parseInt(e.target.parentElement.id);
            employeesArray = employeesArray.filter((emp)=>{
                if(emp.id !== id){
                    return true;
                }
            })

            console.log("91");

        }

        if(selectedElementId == id)
        {
            renderEmployeeList();

            selectedElementId = -1;
            selectedElement = null;
            renderEmployeeDetails();
        }
        else{
            renderEmployeeList();
        }
    })


    renderEmployeeList();
    renderEmployeeDetails();







})()








{/* <span class="employeeslist__employee">
    Om Yerawar<span class="employeelist__employee__cross">@</span>   
</span> */}


