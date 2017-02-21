var $update = "";

// Validade Fields materialize.css
$.validator.setDefaults({
    errorClass: 'invalid',
    validClass: "valid",
    errorPlacement: function (error, element) {
        $(element).closest("form").find("label[for='" + element.attr("id") + "']").attr('data-error', error.text()).attr('class', 'active');
    },
    submitHandler: function (form) {
        console.log('form ok');
    }
});
//Rules and Messages to Validate
$("#formMarca").validate({
    //    ignore: [],
    debug: true,
    rules: {
        nomeMarca: {
            required: true
        }
    },
    messages: {
        nomeMarca: {
            required: "Digite a marca a ser adicionada"
        }
    }
});

//Get Brands to fill select
function getMarcas(input, marcaId) {

    $.ajax({
        url: urlApi + "marca/",
        type: 'GET',
        dataType: 'json',
        success: function (json) {

            $('#marca')
                .find('option')
                .remove()
                .end();

            $.each(json, function (key, value) {
                $('#' + input).append($("<option></option>").attr('value', value.id).text(value.nome));
            });

            $('#marca').find('option[value="' + marcaId + '"]').prop('selected', true);

            //Load material dropbox
            $('select').material_select();

        },
        error: function (textStatus, errorThrown) {
            console.log("errou");
        }
    });
}

//function getOnlyMarca(id, type) {
//
//    $.ajax({
//        url: urlApi + "marca/" + id,
//
//        type: 'GET',
//        dataType: 'json',
//        success: function (json) {
//
//            if (type !== "input") {
//                $('#marcaId').append(
//                    $("<option></option>")
//                    .attr('value', json.id)
//                    .text(json.nome)
//                );
//
//            } else {
//                $('#marcaModeloId'
//                 ).val(json.nome);
//            }
//            $('#marcaId').material_select();
//
//        },
//        error: function (textStatus, errorThrown) {
//            console.log("errou");
//        }
//    });
//}



function createMarca(data) {

    //make AJAX request
    $("#formMarca").validate();
    if ($("#formMarca").valid()) {
        $.ajax({
            type: "POST",
            url: urlApi + "marca",
            data: data,
            dataType: "json",

            //if received a response from the server
            success: function (response) {
                swal("Pronto!",
                    "Marca de veículo gravada com sucesso.",
                    "success");
            }

        });
    }
    //Reload Material Form
    Materialize.updateTextFields();

}

//Create Function for Type, Brand and Model
function saveAll(type) {
    var data = new Object();
    var url, successMsg = "";
    switch (type) {
        case "0":
            data.nome = $("#marca").val();
            url = urlApi + "marca";
            successMsg = "Marca adicionada com sucesso";
            break;
        case "1":
            data.marcaId = $("#marcaSelect").val();
            data.nome = $("#modelo").val();
            url = urlApi + "modelo";
            successMsg = "Modelo adicionado com sucesso";
            break;
        case "2":
            data.nome = $("#tipo").val();
            url = urlApi + "tipo";
            successMsg = "Tipo de veículo adicionado com sucesso";
            break;
    }

    //make AJAX request
    $("#formMarca").validate();
    if ($("formMarca").valid()) {
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: "json", //if received a response from the server
            success: function (response) {
                swal("Pronto!", successMsg, "success");
            }
        });
    }
    //Empty all fields
    $(':input', '#formMarca').not(':button, :submit, :reset').val('').removeAttr('checked').removeAttr('selected');
    //Reload Material Form
    Materialize.updateTextFields();
}

//Fill table marca
function getMarcaTable() {

    //Populates Table with Json
    tableMarca = $('table#table-marca').DataTable({
        ajax: {
            url: urlApi + "marca",
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
            "width": "20%",
            "targets": 0
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

function getMarca(id, inputType) {

    $.ajax({
        type: "GET",
        url: urlApi + "marca/" + id,
        dataType: "json",

        //if received a response from the server
        success: function (data) {

            if (inputType == "select") {
                $("#marca").empty().html(' ');
                $('#marca').append($("<option></option>")
                    .attr('value', data.id)
                    .text(data.nome)
                );
                $('#marca').material_select();
                
            } else {

                $("#marcaId").val(data.id);
                $("#marcaNome").val(data.nome);
            }

            
            //Reload Material Form
            Materialize.updateTextFields();

        }

    });

}

function updateMarca(id) {

    var data = new Object();
    data.id = id;
    data.nome = $("#marcaNome").val();

    //do AJAX request
    $("#formMarca").validate();
    if ($("#formMarca").valid()) {

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
                url: urlApi + "marca/" + id,
                data: data,
                dataType: "json",

                //if received a response from the server
                success: function (response) {
                    swal("Pronto!",
                        "As alterações foram salvas com sucesso.",
                        "success");

                    console.log("passou");
                    //Reload dataTable
                    $('#table-marca').DataTable().ajax.reload();
                    $('#modal-marca').modal('close');

                }

            });

        });

    }
    //Reload Material Form
    Materialize.updateTextFields();

}

//Delete function
function deleteMarca(id) {
    swal({
            title: "Tem certeza?",
            text: "Esta ação excluirá a marca de Veículo!",
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
                    url: urlApi + "marca/" + id,
                    dataType: "json",

                    //if received a response from the server
                    success: function (response) {
                        //Reload dataTable
                        $('#table-marca').DataTable().ajax.reload();
                        $('#modal-marca').modal('close');
                    },

                });

                swal("Excluído!", "A marca foi excluída!", "success");

            } else {
                swal("Cancelado", "Nada foi modificado", "error");
                $('#modal-marca').modal('close');
            }
        });

}
