function getModelosSelect(marca) {

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

function getModelos(marca) {
    console.log(marca);


    //Populates Table with Json
    tableModelo = $('table#table-modelo').DataTable({
        destroy: true,
        ajax: {
            url: 'http://192.168.10.10:3004/marca/' + marca + '/modelo',
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

    getMarcas("marcaModal");

    $.ajax({
        type: "GET",
        url: 'http://192.168.10.10:3004/modelo/' + data.id,
        dataType: "json",

        //if received a response from the server
        success: function (data) {

            $("#idModelo").val(data.id);
            $("#nomeModelo").val(data.nome);

            $('#marcaModal').find('option[value="' + data.marcaId + '"]').prop('selected', true);

            $('#marcaModal').material_select();
            //Reload Material Form
            Materialize.updateTextFields();

        },

    });

};

function updateModelo(id, dados) {

    var data = new Object();
    data.id = id;
    data.nome = $("#nomeModelo").val();
    data.marcaId = $('#marcaModal').val();

    console.log(data);

    //do AJAX request
    $("#formMo").validate();
    if ($("#formMo").valid()) {

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
                url: "http://192.168.10.10:3004/modelo/" + id,
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
    $("#form").validate();
    if ($("#form").valid()) {
        $.ajax({
            type: "POST",
            url: "http://192.168.10.10:3004/modelo",
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
                    url: "http://192.168.10.10:3004/modelo/" + id,
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
