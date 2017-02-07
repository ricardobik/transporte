//Fill table tipo
function fillTipoTable() {
    //Populates Table with Json
    tableTipo = $('table#table-tipo').DataTable({
        ajax: {
            url: urlApi + "tipo",
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
}

function fillTipo(id) {

    $.ajax({
        type: "GET",
        url: urlApi + "tipo/" + id,
        dataType: "json",

        //if received a response from the server
        success: function (data) {

            $("#idTipo").val(data.id);
            $("#nomeTipo").val(data.nome);

            //Reload Material Form
            Materialize.updateTextFields();

        },

    });

};

function updateTipo(id, dados) {

    var data = new Object();
    data.id = id;
    data.nome = $("#nomeTipo").val();
    
    console.log(data);
        
    //do AJAX request
    $("#formMa").validate();
    if ($("#formMa").valid()) {

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
                url: urlApi + "tipo/" + id,
                data: data,
                dataType: "json",

                //if received a response from the server
                success: function (response) {
                    swal("Pronto!",
                        "As alterações foram salvas com sucesso.",
                        "success");

                    //Reload dataTable
                    $('#table-tipo').DataTable().ajax.reload();
                    $('#modal-tipo').modal('close');

                },

            });

        });

    }
    //Reload Material Form
    Materialize.updateTextFields();

};

//Delete function
function deleteTipo(id) {
    swal({
            title: "Tem certeza?",
            text: "Esta ação excluirá o tipo de Veículo!",
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
                    url: urlApi + "tipo/" + id,
                    dataType: "json",

                    //if received a response from the server
                    success: function (response) {
                        //Reload dataTable
                        $('#table-tipo').DataTable().ajax.reload();
                        $('#modal-tipo').modal('close');
                    },

                });

                swal("Excluído!", "O tipo foi excluído!", "success");

            } else {
                swal("Cancelado", "Nada foi modificado", "error");
                $('#modal-tipo').modal('close');
            }
        });

};

function createTipo(data) {

    //make AJAX request
    $("#form").validate();
    if ($("#form").valid()) {
        $.ajax({
            type: "POST",
            url: urlApi + "tipo",
            data: data,
            dataType: "json",

            //if received a response from the server
            success: function (response) {
                swal("Pronto!",
                    "Tipo de veículo gravado com sucesso.",
                    "success");

            },

        });
    }
    //Reload Material Form
    Materialize.updateTextFields();

};

//insert into select to create veiculo
function getTipo() {
    
    //Load Json marcas from FIPE API
    $.ajax({
        url: urlApi + "tipo",

        type: 'GET',
        dataType: 'json',
        success: function (json) {

            $.each(json, function (key, value) {

                $('#tipoid').append(
                    $("<option></option>")
                    .attr('value', value.id)
                    .text(value.nome)
                );
                $('#tipoid').material_select();

            });

        }
    });
};
