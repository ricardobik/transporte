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
$("#formModelo").validate({
    //ignore: [],
    debug: true,
    rules: {
        nome: {
            required: true,
            rangelength: [11, 11]
        }
    },
    messages: {
        nome: {
            required: "O campo nome deve ser preenchido"
        }
    }
});

function getModelosSelect(marca) {

    $("#modeloId").empty().html(' ');
    $("#modeloId").append("<option value='' disabled selected>Escolha o modelo</option>");
    $("#loader").css('display', '');

    $.ajax({
        url: urlApi + "marca/" + marca + "/modelo",

        type: 'GET',
        dataType: 'json',
        success: function (json) {

            if (json == '') {
                $("#modeloId")
                    .find("option")
                    .remove()
                    .end()
                    .append("<option value='' disabled selected>Não há modelo disponível</option>")
                    .material_select();

            };

            $.each(json, function (key, value) {

                $('#modeloId').append(
                    $("<option></option>")
                    .attr('value', value.id)
                    .text(value.nome)
                );
                $('#modeloId').material_select();

            });
            $("#loader").css('display', 'none');
        },
        error: function (textStatus, errorThrown) {
            console.log("errou");
        }
    });
};

function getModelosTable(marca) {

    //Populates Table with Json
    tableModelo = $('table#table-modelo').DataTable({
        destroy: true,
        ajax: {
            url: urlApi + "marca/" + marca + "/modelo",
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            dataSrc: ''
        },
        columns: [{
            data: "id"
                }, {
            data: "marcaId"
                }, {
            data: "nome"
                }],
        "columnDefs": [{
            "width": "10%",
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
    tableModelo.draw(false);

};

function fillModelo(data) {

    getOnlyMarca(data.marcaId, "input");

    console.log(data);

    $.ajax({
        type: "GET",
        url: urlApi + "modelo/" + data.id,
        dataType: "json",

        //if received a response from the server
        success: function (data) {

            $("#modeloId").val(data.id);
            $("#modeloNome").val(data.nome);

            //            $('#marcaModal').find('option[value="' + data.marcaId + '"]').prop('selected', true);
            //
            //            $('#marcaModal').material_select();
            //Reload Material Form
            Materialize.updateTextFields();

        },

    });

};

function updateModelo(dados) {


    var data = new Object();
    data.id = dados.id;
    data.nome = $("#modeloNome").val();
    data.marcaId = dados.marcaId;

    
    //do AJAX request
    $("#formModelo").validate();
    if ($("#formModelo").valid()) {

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
                url: urlApi + "modelo/" + dados.id,
                data: data,
                dataType: "json",

                //if received a response from the server
                success: function (response) {
                    swal("Pronto!",
                        "As alterações foram salvas com sucesso.",
                        "success");

                    //Reload dataTable
                    $('#table-modelo').DataTable().ajax.reload();
                    $('#modal-modelo').modal('close');

                },

            });

        });

    }
    //Reload Material Form
    Materialize.updateTextFields();

};

function createModelo(data) {

    //make AJAX request
    $("#formModelo").validate();
    if ($("#formModelo").valid()) {
        $.ajax({
            type: "POST",
            url: urlApi + "modelo",
            data: data,
            dataType: "json",

            //if received a response from the server
            success: function (response) {
                swal("Pronto!",
                    "Modelo gravado com sucesso.",
                    "success");

            },

        });
    }
    //Reload Material Form
    Materialize.updateTextFields();

};

function deleteModelo(id) {
    swal({
            title: "Tem certeza?",
            text: "Esta ação excluirá o modelo de Veículo!",
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
                    url: urlApi + "modelo/" + id,
                    dataType: "json",

                    //if received a response from the server
                    success: function (response) {
                        //Reload dataTable
                        $('#table-modelo').DataTable().ajax.reload();
                        $('#modal-modelo').modal('close');
                    },

                });

                swal("Excluído!", "O modelo foi excluído!", "success");

            } else {
                swal("Cancelado", "Nada foi modificado", "error");
                $('#modal-modelo').modal('close');
            }
        });

};

function getModelos(input, marcaId, modeloId) {


    $("#modeloId").empty().html(' ');
    $("#modeloId").append("<option value='' disabled selected>Escolha o modelo</option>");
    $("#loader").css('display', '');

    $.ajax({
        url: urlApi + "marca/" + marcaid + "/modelo",
        type: 'GET',
        dataType: 'json',
        success: function (json) {

            $("#modeloId").val("");

            $.each(json, function (key, value) {
                $('#' + input).append($("<option></option>").attr('value', value.id).text(value.nome));
                $('#' + input).material_select();
            });

            $("#loader").css('display', 'none');

            //            $("#modeloId").val(modeloId);
            $('#modeloId').find('option[value="' + modeloId + '"]').prop('selected', true);
            $("select").material_select();
        }
    });
};

function getOnlyModelo(id) {

    $("#modeloId").empty().html(' ');

    $.ajax({
        url: urlApi + "modelo/" + id,

        type: 'GET',
        dataType: 'json',
        success: function (json) {

            $('#modeloId').append(
                $("<option></option>")
                .attr('value', json.id)
                .text(json.nome)
            );
            $('#modeloId').material_select();

        },
        error: function (textStatus, errorThrown) {
            console.log("errou");
        }
    });
};
