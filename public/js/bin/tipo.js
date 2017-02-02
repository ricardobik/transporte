//Fill table tipo
function fillTipoTable() {
    //Populates Table with Json
    tableTipo = $('table#table-tipo').DataTable({
        ajax: {
            url: "http://192.168.10.10:3004/tipo",
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
        url: "http://192.168.10.10:3004/tipo/" + id,
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
                url: "http://192.168.10.10:3004/tipo/" + id,
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
