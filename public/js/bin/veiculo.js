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
//                this.formVeiculo2.reset();
                Materialize.updateTextFields(); //updating labels from inputs
            },

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

//    $.ajax({
//        type: "GET",
//        url: urlApi + "veiculo/" + Id,
//
//        dataType: "json",
//
//        //if received a response from the server
//        success: function (data) {
//
//            $("#id").val(data.id);
//            $("#nome").val(data.nome);
//            $("#cnh").val(data.cnh);
//            $("#cnhVencimento").val(data.cnhVencimento);
//            $("#telefone").val(data.telefone);
//            $("#setor").val(data.setor);
//
//            //Reload Material Form
//            Materialize.updateTextFields();
//
//            //Load material dropbox
//            $('#setor').material_select();
//
//        },
//
//    });

};
