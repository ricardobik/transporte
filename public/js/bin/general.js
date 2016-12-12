//Path to home
var getUrl = window.location;
var path = getUrl.pathname.split('/');
var homeUrl = getUrl.protocol + "//" + getUrl.host + "/index.html";
var searchUrl = getUrl.protocol + "//" + getUrl.host + "/" + path[1] + "/" + path[2] + "/search.html";
var createUrl = getUrl.protocol + "//" + getUrl.host + "/" + path[1] + "/" + path[2] + "/create.html";

function goHome() {
    location.href = homeUrl;
}

function goSearch() {
    location.href = searchUrl;
}

function goCreate() {
    location.href = createUrl;
}

function goMotoristaCreate() {
    //location.href = createUrl;
    location.href = getUrl.protocol + "//" + getUrl.host + "/" + path[1] + "modules/motorista/create.html";
}

function goSetorCreate() {
    //location.href = createUrl;
    location.href = getUrl.protocol + "//" + getUrl.host + "/" + path[1] + "modules/setor/create.html";
}

function getSetor() {
    //Load Json setor
    $.ajax({
        url: 'http://192.168.10.10:3004/setor',
        type: 'GET',
        dataType: 'json',
        success: function (json) {

            $.each(json, function (key, value) {

                $('#setor').append(
                    $("<option></option>")
                    .attr('value', value.id)
                    .text(value.nome)
                );

                $('select').material_select();

            });
        }
    });

}

function getMarcas() {
    //Load Json marcas from FIPE API
    $.ajax({
        url: 'http://fipeapi.appspot.com/api/1/carros/marcas.json',
        type: 'GET',
        dataType: 'json',
        success: function (json) {

            $.each(json, function (key, value) {

                $('#marcas').append(
                    $("<option></option>")
                    .attr('value', value.id)
                    .text(value.name)
                );

                $('select').material_select();

            });
        }
    });

}



$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 200, // Creates a dropdown of 200 years to control year
    format: 'dd/mm/yyyy',

    // Languages
    // Strings and translations
    monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    showMonthsShort: false,
    showWeekdaysFull: false,

    // Buttons
    today: 'Hoje',
    clear: 'Limpar',
    close: 'Fechar',

    // Accessibility labels
    labelMonthNext: 'Próximo mês',
    labelMonthPrev: 'Mês anterior',
    labelMonthSelect: 'Selecione o mês',
    labelYearSelect: 'Selecione o ano'
});

swal.setDefaults({ 
    confirmButtonText: "OK",
    cancelButtonText: "Cancelar" 
});