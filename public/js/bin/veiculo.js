function fillVeiculoSelect(marcas, tipo) {

    //Load Json veiculos from FIPE API
    $.ajax({

        url: 'https://fipe-parallelum.rhcloud.com/api/v1/' + tipo + '/marcas/' + marcas + '/modelos',

        type: 'GET',
        dataType: 'json',
        success: function (json) {

            $.each(json, function (key, value) {

                $.each(value, function (index, data) {

                    $('#veiculos').append(
                        $("<option></option>")
                        .attr('value', data.codigo)
                        .text(data.nome)
                    );
                })

                $('select').material_select();

            });
        },
        error: function (textStatus, errorThrown) {
            alert(textStatus);
        }

    });
};



function getModelos(marca) {

    $("#modeloid").empty().html(' ');
    $("#modeloid").append("<option value='' disabled selected>Escolha o modelo</option>");
    $("#loader").css('display', '');

    $.ajax({
        url: 'http://192.168.10.10:3004/marca/' + marca + '/modelo',

        type: 'GET',
        dataType: 'json',
        success: function (json) {

            if (json == '') {
                $("#modeloid").empty();
                $("#modeloid").html('');
                $("#modeloid").append("<option value='' disabled selected>Não há modelo disponível</option>");
                $('#modeloid').material_select();
            };

            $.each(json, function (key, value) {

                $('#modeloid').append(
                    $("<option></option>")
                    .attr('value', value.id)
                    .text(value.nome)
                );
                $('#modeloid').material_select();

            });
            $("#loader").css('display', 'none');
        },
        error: function (textStatus, errorThrown) {
            console.log("errou");
        }
    });
};

function getCombustivel() {
    //Load Json marcas from FIPE API

    $.ajax({
        url: 'http://192.168.10.10:3004/combustivel',

        type: 'GET',
        dataType: 'json',
        success: function (json) {

            $.each(json, function (key, value) {

                $('#combustivelid').append(
                    $("<option></option>")
                    .attr('value', value.id)
                    .text(value.nome)
                );
                $('#combustivelid').material_select();

            });

        }
    });
};

// Validade Fields materialize.css
$.validator.setDefaults({
    errorClass: 'invalid',
    validClass: "valid",
    errorPlacement: function (error, element) {
        $(element)
            .closest("form")
            .find("label[for='" + element.attr("id") + "']")
            .attr('data-error', error.text())
            .attr('class', 'active');

    },
    submitHandler: function (form) {
        console.log('form ok');
    }
});

//Rules and Messages to Validate
$("#formVeiculo1").validate({
    ignore: [],
    debug: true,
    rules: {
        placa: {
            required: true
        },
        marcaid: {
            required: true
        },
        modeloid: {
            required: true
        }
    },
    messages: {
        placa: {
            required: "O campo placa deve ser preenchido"
        },
        placa: {
            required: "O campo placa deve ser preenchido"
        },
        placa: {
            required: "O campo placa deve ser preenchido"
        }
    }
});

//Rules and Messages to Validate
$("form").validate({
    ignore: [],
    debug: true,
    rules: {
        placa: {
            required: true
        },
        marcaid: {
            required: true
        },
        modeloid: {
            required: true
        }
    },
    messages: {
        placa: {
            required: "O campo placa deve ser preenchido"
        },
        placa: {
            required: "O campo placa deve ser preenchido"
        },
        placa: {
            required: "O campo placa deve ser preenchido"
        }
    }
});

//Create function
function saveVeiculo(data) {

    //make AJAX request
    $("form").validate();
    if ($("form").valid()) {
        $.ajax({
            type: "POST",
            url: "http://192.168.10.10:3004/veiculo",
            data: data,
            dataType: "json",

            //if received a response from the server
            success: function (response) {
                swal("Pronto!",
                    "Veículo cadastrado com sucesso",
                    "success");
            },

        });
    }
    //Reload Material Form
    Materialize.updateTextFields();

};
