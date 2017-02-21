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
$("#form").validate({
    rules: {
        nome: {
            required: true,
            minlength: 3
        }
    },
    messages: {
        nome: {
            required: "Preencha com o nome do novo setor",
            minlength: jQuery.validator.format("O nome do setor deve conter ao menos {0} caracteres")

        }
    }
});

//Fill table setor
function fillSetorTable() {

    //Populates Table with Json
    table = $('table#table-setor').DataTable({
        ajax: {
            url: urlApi + "setor",
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            dataSrc: ''
        },
        columns: [{
            data: "id"
                }, {
            data: "nome"
                }],
        "columnDefs": [{
            "width": "50%",
            "targets": 0
                }, {
            "width": "40%",
            "targets": 1
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

//Fill input to update
function getSetor(id, inputType) {
    $('#setor').empty();

    $.ajax({
        type: "GET",
        url: urlApi + "setor/" + id,
        dataType: "json",

        //if received a response from the server
        success: function (data) {

            if (inputType == "select") {
                $("#setor").append(
                    $("<option></option>")
                    .attr('value', data.id)
                    .text(data.nome)
                    .prop('selected', true)

                );
                $("#setor").material_select();
                //                $('#setor').find('option[value="' + id + '"]').prop('selected', true);

            } else {

                $("#setorId").val(data.id);
                $("#setorNome").val(data.nome);
            }
            //Reload Material Form
            Materialize.updateTextFields();

        },

    });

};

//Delete function
function deleteSetor(id) {
    swal({
            title: "Tem certeza?",
            text: "Esta ação excluirá o setor!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: 'btn-danger',
            confirmButtonText: 'Excluir',
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function (isConfirm) {
            if (isConfirm) {

                $.ajax({
                    type: "DELETE",
                    url: urlApi + "setor/" + id,
                    dataType: "json",

                    //if received a response from the server
                    success: function (response) {
                        //Reload dataTable
                        $('#table-setor').DataTable().ajax.reload();
                        $('#modal-edit').modal('close');
                    },

                });

                swal("Excluído!", "O setor foi excluído!", "success");
            } else {
                swal("Cancelado", "Nada foi modificado", "error");
                $('#modal-edit').modal('close');
            }
        });

};

//Create function
function createSetor(data) {

    //make AJAX request
    $("#form").validate();
    if ($("#form").valid()) {
        $.ajax({
            type: "POST",
            url: urlApi + "setor",
            data: data,
            dataType: "json",

            //if received a response from the server
            success: function (response) {
                swal("Pronto!",
                    "Setor gravado com sucesso.",
                    "success");

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Erro!");
            }

        });

    }
    //Reload Material Form
    Materialize.updateTextFields();


    // });
};

//Update function
function updateSetor(data) {

    //do AJAX request
    $("#form").validate();
    if ($("#form").valid()) {

        swal({
            title: "Confirmação",
            text: "Deseja salvar as informações?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Salvar",
            closeOnConfirm: false,
            html: false
        }, function () {

            $.ajax({
                type: "PUT",
                url: urlApi + "setor/" + data.id,
                data: data,
                dataType: "json",

                //if received a response from the server
                success: function (response) {
                    swal("Pronto!",
                        "As alterações foram salvas com sucesso.",
                        "success");

                    //Reload dataTable
                    $('#table-setor').DataTable().ajax.reload();
                    $('#modal-edit').modal('close');

                },

            });

        });

    }
    //Reload Material Form
    Materialize.updateTextFields();

};

//Get Setores to fill a select
function getSetores(id) {

    //Load Json setor
    $.ajax({
        url: urlApi + "setor",
        type: 'GET',
        dataType: 'json',
        success: function (json) {

            $.each(json, function (key, value) {

                $('#setor').append(
                    $("<option></option>")
                    .attr('value', value.id)
                    .text(value.nome)
                );

                if (id !== "null") {
                    $('#setor').find('option[value="' + id + '"]').prop('selected', true);
                }
                $('#setor').material_select();

                //Reload Material Form
                Materialize.updateTextFields();

            });
        }
    });

}

//Get setores and add to select
function getSetorSelect(id) {

    $.ajax({
        url: urlApi + "setor",
        type: 'GET',
        dataType: 'json',
        success: function (json) {

            $('#setorid')
                .find('option')
                .remove()
                .end();

            $.each(json, function (key, value) {

                $('#setorid').append(
                    $("<option></option>")
                    .attr('value', value.id)
                    .text(value.nome)
                );

                $('#setorid').find('option[value="' + id + '"]').prop('selected', true);
                $('#setorid').material_select();

            });

        }
    });
};

//function getOnlySetor(id) {
//
//    //Clear the options before set new id
//    $('#setorId').empty();
//
//    $.ajax({
//        url: urlApi + "setor/" + id,
//        type: 'GET',
//        dataType: 'json',
//        success: function (json) {
//
//            $('#setorId').append(
//                $("<option></option>")
//                .attr('value', json.id)
//                .text(json.nome)
//            );
//
//            $('#setorId').material_select();
//
//        },
//        error: function (textStatus, errorThrown) {
//            console.log("errou");
//        }
//    });
//};
