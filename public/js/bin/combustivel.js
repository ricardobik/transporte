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

    }

});

function fillCombustivel(id) {

    $.ajax({
        type: "GET",
        url: "http://192.168.10.10:3004/combustivel/" + id,
        dataType: "json",

        //if received a response from the server
        success: function (data) {

            $("#id").val(data.id);
            $("#nome").val(data.nome);

            //Reload Material Form
            Materialize.updateTextFields();

        },

    });

};

//Delete function
function deleteCombustivel(id) {
    swal({
            title: "Tem certeza?",
            text: "Esta ação excluirá o combustivel!",
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
                    url: "http://192.168.10.10:3004/combustivel/" + id,
                    dataType: "json",

                    //if received a response from the server
                    success: function (response) {
                        //Reload dataTable
                        $('#table-combustivel').DataTable().ajax.reload();
                        $('#modal-combustivel').modal('close');
                    },

                });

                swal("Excluído!", "O combustível foi excluído!", "success");

            } else {
                swal("Cancelado", "Nada foi modificado", "error");
                $('#modal-combustivel').modal('close');
            }
        });

};


//Create function
function saveCombustivel(data) {

    //make AJAX request
    $("#form").validate();
    if ($("#form").valid()) {
        $.ajax({
            type: "POST",
            url: "http://192.168.10.10:3004/combustivel",
            data: data,
            dataType: "json",

            //if received a response from the server
            success: function (response) {
                swal("Pronto!",
                    "Combustivel gravado com sucesso.",
                    "success");

            },

        });
    }
    //Reload Material Form
    Materialize.updateTextFields();


    // });
};

//Update function
function updateCombustivel(id, data) {

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
                url: "http://192.168.10.10:3004/combustivel/" + id,
                data: data,
                dataType: "json",

                //if received a response from the server
                success: function (response) {
                    swal("Pronto!",
                        "As alterações foram salvas com sucesso.",
                        "success");

                    //Reload dataTable
                    $('#table-combustivel').DataTable().ajax.reload();
                    $('#modal-combustivel').modal('close');

                },

            });

        });

    }
    //Reload Material Form
    Materialize.updateTextFields();

};

function fillCombustivelTable() {
    //Populates Table with Json
    tableCombustivel = $('table#table-combustivel').DataTable({
        ajax: {
            url: "http://192.168.10.10:3004/combustivel",
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



