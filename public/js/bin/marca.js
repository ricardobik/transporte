//Rules and Messages to Validate
$("#marca_form").validate({
    ignore: [],
    debug: true,
    rules: {
        marcaNome: {
            required: true,
            minlength: 3
        }
    },
    messages: {
        marcaNome: {
            required: "Digite a marca a ser adicionada",
            minlength: jQuery.validator.format("O nome do setor deve conter ao menos {0} caracteres")
        }
    }
});

//Get Brands to fill select
function getMarcas(id) {

    if (id == "null") {
        $('#marca').children().remove().end().append('<option value="" disable selected>Selecione a marca</option>');
    }

    $.ajax({
        url: urlApi + "marca/",
        type: 'GET',
        dataType: 'json',
        success: function (resp) {
            
             $.each(resp.data, function (key, value) {

                $('#marca').append(
                    $("<option></option>")
                    .attr('value', value.id)
                    .text(value.nome)
                );
            });

            if (id !== "null") {
                $("#marca").find('option[value="' + id + '"]').prop('selected', true);
            }

            //Load material dropbox
            $('select').material_select();

        },
        error: function (textStatus, errorThrown) {
            console.log("errou");
        }
    });
}

function createMarca(data) {

    //make AJAX request
    $("#marca_form").validate();
    if ($("#marca_form").valid()) {
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

                resetForm($("#marca_form"));
            },
            error: function (textStatus, errorThrown) {
                console.log("errou");
            }

        });
    }
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
            "width": "05%;",
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

function getMarca(id, input) {

    $.ajax({
        type: "GET",
        url: urlApi + "marca/" + id,
        dataType: "json",

        //if received a response from the server
        success: function (data) {

            if (input == "select") {

                $("#marca").empty().html(' ');
                $('#marca').append($("<option></option>")
                    .attr('value', data.id)
                    .text(data.nome)
                );
                $('#marca').material_select();

            } else {

                $("#marcaId").val(data.id);
                $("#marcaNome").val(data.nome);

            };


            //Reload Material Form
            Materialize.updateTextFields();

        },
        error: function (textStatus, errorThrown) {
            console.log("errou");
        }

    });

}

function updateMarca(id) {

    var data = new Object();
    data.id = id;
    data.nome = $("#marcaNome").val();

    //do AJAX request
    $("#marca_form").validate();
    if ($("#marca_form").valid()) {

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

                    //Reload dataTable
                    $('#table-marca').DataTable().ajax.reload();
                    $('#modal-marca').modal('close');

                },
                error: function (textStatus, errorThrown) {
                    console.log("errou");
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
                    error: function (textStatus, errorThrown) {
                        console.log("errou");
                    }

                });

                swal("Excluído!", "A marca foi excluída!", "success");

            } else {
                swal("Cancelado", "Nada foi modificado", "error");
                $('#modal-marca').modal('close');
            }
        });

}
