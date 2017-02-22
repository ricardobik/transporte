//Rules and Messages to Validate
$("#motorista_form").validate({
    //ignore: [],
    debug: true,
    rules: {
        cnh: {
            required: true,
            rangelength: [11, 11]
        },
        cnh_vencimento: {

        },
        setor: {
            required: true
        }
    },
    messages: {
        nome: {
            required: "O campo nome deve ser preenchido"
        },
        cnh: {
            required: "O número da CNH do motorista deve ser prenchido",
            rangelength: "O número da CNH deve conter onze digitos",
            number: "O campo CNH só pode conter números"

        },
        cnh_vencimento: {
            required: "A data de vencimento da CNH deve ser preenchida"
        },
        setor: {
            required: "Selecione um setor"
        }

    }
});

//Fill motorista Modal to Edit
function getMotorista(Id) {

    $.ajax({
        type: "GET",
        url: urlApi + "motorista/" + Id,

        dataType: "json",

        //if received a response from the server
        success: function (data) {

            $("#motoristaId").val(data.id);
            $("#nome").val(data.nome);
            $("#cnh").val(data.cnh);
            $("#cnh_vencimento").val(data.cnh_vencimento);
            $("#telefone").val(data.telefone);

            getSetores(data.setor);

            //Reload Material Form
            Materialize.updateTextFields();


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Erro!");
        }

    });

};

//Delete function
function deleteMotorista(id) {
    swal({
            title: "Tem certeza?",
            text: "Esta ação excluirá o motorista!",
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
                    url: urlApi + "motorista/" + id,
                    dataType: "json",

                    //if received a response from the server
                    success: function (response) {
                        //Reload dataTable
                        $('#table-motorista').DataTable().ajax.reload();
                        $('#modal-edit').modal('close');
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert("Erro!");
                    }

                });

                swal("Excluído!", "O motorista foi excluído!", "success");
            } else {
                swal("Cancelado", "Nada foi modificado", "error");
            }
        });

};

//Create function
function createMotorista(data) {

    //make AJAX request
    $("#motorista_form").validate();
    if ($("#motorista_form").valid()) {
        $.ajax({
            type: "POST",
            url: urlApi + "motorista",
            data: data,
            dataType: "json",

            //if received a response from the server
            success: function (response) {
                swal("Pronto!",
                    "Motorista gravado com sucesso.",
                    "success");

                resetForm($("#motorista_form"));
                $('select').prop('selectedIndex', 0);
                $("select").material_select;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Erro!");
            }

        });
    }
    //Reload Material Form
    Materialize.updateTextFields();

};

//Update function
function updateMotorista(id, data) {

    //do AJAX request
    $("#motorista_form").validate();
    if ($("#motorista_form").valid()) {

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
                url: urlApi + "motorista/" + id,
                data: data,
                dataType: "json",

                //if received a response from the server
                success: function (response) {
                    swal("Pronto!",
                        "As alterações foram salvas com sucesso.",
                        "success");

                    //Reload dataTable
                    $('#table-motorista').DataTable().ajax.reload();
                    $('#modal-edit').modal('close');

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("Erro!");
                }
            });

        });

    }
    //Reload Material Form
    Materialize.updateTextFields();

};

//Fill table to search motorista
function getMotoristaTable() {

    table = $('table#table-motorista').DataTable({
        ajax: {
            url: urlApi + "motorista",
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            dataSrc: ''
        },
        columns: [{
            data: "id"
                }, {
            data: "nome"
                }, {
            data: "cnh"
                }, {
            data: "telefone"
                }],
        "columnDefs": [{
            "width": "10%",
            "targets": 0
                }, {
            "width": "40%",
            "targets": 1
                }, {
            "width": "60%",
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
