//Declaración de variables iniciales
let apiConfig = {
    dataType: "json",
    headers: {
        Authorization: "Bearer 00D8a000002AKqT!ARIAQADJ.iKH4NDo03MbNWA1X5zXSV78Wk_3E.1fggY5AL6wVJwa1RDL8Yyud_Fxd4A9E_fQNkHMoCvX4MaVAjKR1vWbhs_P"
    }
}
let selectorLead = $("#selectorLeads");
let selectorCars = $("#selectorCars");
let formSelectorLead = $("#form-selectorLeads");


//Obtenemos, mediante la API, todos los leads, y los agregamos al selector de Leads
$(selectorLead).attr('disabled', 'true');
$.ajax({
    method: "GET",
    url: "https://web38-dev-ed.my.salesforce.com/services/apexrest/api/leads",
    ...apiConfig
}).done((data) => {
    $(selectorLead).removeAttr('disabled');
    $(selectorLead).append(_.map(data, e => new Option(e.Name, e.Id)));
    $(formSelectorLead).append(_.map(data, e => new Option(e.Name, e.Id)));
});

//Cada vez que se seleccione un lead, se buscará los Cars que posee
$(selectorLead).on('change', (e) => {
    $(selectorCars).attr('disabled', 'true');
    $(selectorCars).empty();
    let option = new Option("Select car", "0");
    $(option).attr('hidden', true);
    $(selectorCars).append(option);

    //Mediante la API, buscamos todos los coches que posee el Lead seleccionado, y agregamos todos 
    //los coches encontrados, al selector de Cars
    $.ajax({
        method: "GET",
        url: "https://web38-dev-ed.my.salesforce.com/services/apexrest/api/cars?lead=" + e.target.value,
        ...apiConfig
    }).done((data) => {
        $(selectorCars).append(_.map(data, e => new Option(e.full_name__c, e.Id)));
        $(selectorCars).removeAttr('disabled');
    });
});

$("#createCar").on('click', () => {

    $.ajax({
        method: "POST",
        url: "https://web38-dev-ed.my.salesforce.com/services/apexrest/api/cars",
        data : {
            down_payment: "666",
            leasing : "666",
            model_year : "666",
            price : "666",
            registration_plate : "666",
            tax : '222',
            idLead : "00Q8a00001qsKhWEAU"
        },
        ...apiConfig
    }).done((data) => {
        console.log(data);
    });
});