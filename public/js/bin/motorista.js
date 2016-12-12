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
var v = $("#form").validate({
    //ignore: [],
    debug: true,
    rules: {
        cnh: {
            required: true,
            rangelength: [11, 11]
        },
        cnhVencimento: {

        },
        setor: {
            //required: true
        }
    },
    messages: {
        nome: {
            required: "O campo nome deve ser preenchido"
        },
        cnh: {
            required: "O número da CNH do motorista deve ser prenchido",
            rangelength: "O número da CNH deve conter onze digitos",
            number: "Por favor preencha com um número válido"

        },
        cnhVencimento: {
            required: "A data de vencimento da CNH deve ser preenchida"
        }

    }
});

//Fill motorista Modal to Edit
function FillMotorista(motoristaId) {

    $("#form").validate();
    if ($("#form").valid()) {
        $.ajax({
            type: "GET",
            url: "http://192.168.10.10:3004/driver/" + motoristaId,

            dataType: "json",

            //if received a response from the server
            success: function (data) {

                $("#id").val(data.id);
                $("#nome").val(data.nome);
                $("#cnh").val(data.cnh);
                $("#cnhVencimento").val(data.cnhVencimento);
                $("#telefone").val(data.telefone);
                $("#setor").val(data.setor);

                //Reload Material Form
                Materialize.updateTextFields();

                //Load material dropbox
                $('#setor').material_select();

            },

        });
    }
};

//Delete function
function deleteMotorista(motoristaId) {
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
                    url: "http://192.168.10.10:3004/driver/" + motoristaId,
                    dataType: "json",

                    //if received a response from the server
                    success: function (response) {
                        //Reload dataTable
                        $('#table-motorista').DataTable().ajax.reload();
                        $('#modal-edit').modal('close');
                    },

                });

                swal("Excluído!", "O motorista foi excluído!", "success");
            } else {
                swal("Cancelado", "Nada foi modificado", "error");
            }
        });

};


//Create function
function saveMotorista(data) {

    //make AJAX request
    $("#form").validate();
    if ($("#form").valid()) {
        $.ajax({
            type: "POST",
            url: "http://192.168.10.10:3004/driver",
            data: data,
            dataType: "json",

            //if received a response from the server
            success: function (response) {
                swal("Pronto!",
                    "Motorista gravado com sucesso.",
                    "success");
                
            },

        });
    }
    //Reload Material Form
    Materialize.updateTextFields();

};

//Update function
function updateMotorista(motoristaId, data) {

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
                url: "http://192.168.10.10:3004/driver/" + motoristaId,
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

            });

        });

    }
    //Reload Material Form
    Materialize.updateTextFields();

};

var table = "";

function fillMotoristaTable() {

    table = $('table#table-motorista').DataTable({
        ajax: {
            url: "http://192.168.10.10:3004/driver",
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
            "width": "5%",
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
