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

};



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


$('select').on('contentChanged', function () {
    // re-initialize (update)
    $(this).material_select();
});



//My transition function is here
slideIn = function (selector, durationARG, startPosition, first) {

    $(first).css("opacity", 0).addClass("hide");
    
    $(first).velocity({
        translateX: "-500px"
    }, {
        duration: 0
    });

    //Make sure opacity is set to 0
    $(selector).css("opacity", 0).removeClass("hide");

    //If duration isn't specified
    if (durationARG == undefined) {
        durationARG = "800px";
    }
    //If start position isn't specified, revert to default
//    if (startPosition == undefined) {
//        startPosition = "-500px";
//    }

    var time = 0;
    
    
    $(selector).velocity({
        translateX: "500px"
    }, {
        duration: 0
    });

    $(selector).velocity({
        opacity: "1",
        translateX: "0"
    }, {
        duration: durationARG,
        delay: time,
        easing: [60, 10]
    });
    time += 120;
};
