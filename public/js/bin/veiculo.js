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
        marcaid: {
            required: "O campo placa deve ser preenchido"
        },
        modeloid: {
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
        marcaid: {
            required: "O campo placa deve ser preenchido"
        },
        modeloid: {
            required: "O campo placa deve ser preenchido"
        }
    }
});

//Create function
function createVeiculo(data) {

    //make AJAX request
    var validator = $("form").validate();
    if ($("form").valid()) {
        $.ajax({
            type: "POST",
            url: urlApi + "veiculo",
            data: data,
            dataType: "json",

            //if received a response from the server
            success: function (response) {
                swal("Pronto!",
                    "Veículo cadastrado com sucesso",
                    "success");
                slideOut("#cardFirst", 1350, -800, more);

                validator.resetForm();
                Materialize.updateTextFields();
            }

        });
    }
    //Reload Material Form
    Materialize.updateTextFields();

};

function fillVeiculoTable() {

    table = $('table#table-veiculo').DataTable({
        ajax: {
            url: urlApi + "veiculo",
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            dataSrc: ''
        },
        columns: [{
            data: "id"
                }, {
            data: "marcaid"
                }, {
            data: "modeloid"
                }, {
            data: "placa"
                }],
        "columnDefs": [{
            "width": "10%",
            "targets": 0
                }, {
            "width": "30%",
            "targets": 1
                }, {
            "width": "40%",
            "targets": 2
                }, {
            "width": "50%",
            "targets": 3
                }],
        select: true,
        fixedColumns: true,
        lengthChange: false,
        pageLength: 5,
        dom: 'lrti<"right"p>',
        language: {
            url: "../../doc/Portuguese-Brasil.json"
        }
    });

}

//Fill motorista Modal to Edit
function FillVeiculo(Id) {

    $.ajax({
        type: "GET",
        url: urlApi + "veiculo/" + Id,

        dataType: "json",

        //if received a response from the server
        success: function (data) {

            $("#id").val(data.id);
            $("#tipoid").val(data.tipoid);
            $("#placa").val(data.placa);

            getOnlyMarca(data.marcaid);

            getOnlyModelo(data.modeloid);

            getCombustivelSelect(data.combustivelid);
            
            getOnlySetor(data.setorid);

            //            getMarcas(marcaid.name, data.marcaid);
            //
            //            getModelos(modeloid.name, data.marcaid, data.modeloid);
            //

            //            
            //            getSetorSelect(data.setorid);
            //                

            $("#anofabricacao").val(data.anofabricacao);
            $("#combustivelid").val(data.combustivelid);
            $("#renavam").val(data.renavam);
            $("#estadoveiculo").val(data.estadoveiculo);
            $("#setorid").val(data.setorid);
            $("#info").val(data.info);

            //Reload Material Form
            Materialize.updateTextFields();

            //Load material dropbox
            $('select').material_select();

        }

    });

}
