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
$("#formMarcaModelo").validate({
    ignore: [],
    debug: true,
    rules: {
        marcaCreate: {
            required: true
        }
    },
    messages: {
        marcaCreate: {
            required: "Digite a marca a ser adicionada"
        }
    }
});

//Fill motorista Modal to Edit
//function FillMotorista(motoristaId) {
//
//    $.ajax({
//        type: "GET",
//        url: "http://192.168.10.10:3004/driver/" + motoristaId,
//
//        dataType: "json",
//
//        //if received a response from the server
//        success: function (data) {
//
//            $("#id").val(data.id);
//            $("#nome").val(data.nome);
//            $("#cnh").val(data.cnh);
//            $("#cnhVencimento").val(data.cnhVencimento);
//            $("#telefone").val(data.telefone);
//            $("#setor").val(data.setor);
//
//            //Reload Material Form
//            Materialize.updateTextFields();
//
//            //Load material dropbox
//            $('#setor').material_select();
//
//        },
//
//    });
//
//};

//Delete function
//function deleteMotorista(id) {
//    swal({
//            title: "Tem certeza?",
//            text: "Esta ação excluirá o motorista!",
//            type: "warning",
//            showCancelButton: true,
//            confirmButtonClass: 'btn-danger',
//            confirmButtonText: 'Excluir',
//            cancelButtonText: "Cancelar",
//            closeOnConfirm: false,
//            closeOnCancel: false
//        },
//        function (isConfirm) {
//            if (isConfirm) {
//
//                $.ajax({
//                    type: "DELETE",
//                    url: "http://192.168.10.10:3004/driver/" + id,
//                    dataType: "json",
//
//                    //if received a response from the server
//                    success: function (response) {
//                        //Reload dataTable
//                        $('#table-motorista').DataTable().ajax.reload();
//                        $('#modal-edit').modal('close');
//                    },
//
//                });
//
//                swal("Excluído!", "O motorista foi excluído!", "success");
//            } else {
//                swal("Cancelado", "Nada foi modificado", "error");
//            }
//        });
//
//};

//Switch marcaModelo verify
function verifySwitch() {
    if ($("#switchMarcaModelo").prop('checked')) {
        $("#divMarcaModelo").hide();
        $("#divMarca").show();

    } else {
        $("#divMarcaModelo").show();
        $("#divMarca").hide();
    };
};

//Create function
function saveMarcaModelo() {

    var data = new Object();
    var url, successMsg = "";

    if ($("#switchMarcaModelo").prop('checked')) {

        data.nome = $("#marcaCreate").val();
        url = "http://192.168.10.10:3004/marca";
        successMsg = "Marca adicionada com sucesso";

    } else {
        data.marcaId = $("#marcaModal").val();
        data.nome = $("#modeloModal").val();
        url = "http://192.168.10.10:3004/modelo";
        successMsg = "Modelo adicionado com sucesso";
    };

    //make AJAX request
    $("#formMarcaModelo").validate();
    if ($("#formMarcaModelo").valid()) {
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: "json",

            //if received a response from the server
            success: function (response) {
                swal("Pronto!",
                    successMsg,
                    "success");
            },

        });
    }
    $('#modeloModal').modal('close');
    //Reload Material Form
    Materialize.updateTextFields();

};

//Update function
//function updateMotorista(id, data) {
//
//    //do AJAX request
//    $("#form").validate();
//    if ($("#form").valid()) {
//
//        swal({
//            title: "Confirmação",
//            text: "Deseja salvar as informações?",
//            type: "warning",
//            showCancelButton: true,
//            confirmButtonColor: "#DD6B55",
//            confirmButtonText: "Salvar",
//            closeOnConfirm: false,
//            html: false
//        }, function () {
//
//            $.ajax({
//                type: "PUT",
//                url: "http://192.168.10.10:3004/driver/" + id,
//                data: data,
//                dataType: "json",
//
//                //if received a response from the server
//                success: function (response) {
//                    swal("Pronto!",
//                        "As alterações foram salvas com sucesso.",
//                        "success");
//
//                    //Reload dataTable
//                    $('#table-motorista').DataTable().ajax.reload();
//                    $('#modal-edit').modal('close');
//
//                },
//
//            });
//
//        });
//
//    }
//    //Reload Material Form
//    Materialize.updateTextFields();
//
//};

//function fillMotoristaTable() {
//
//    table = $('table#table-motorista').DataTable({
//        ajax: {
//            url: "http://192.168.10.10:3004/driver",
//            contentType: 'application/json; charset=UTF-8',
//            dataType: 'json',
//            dataSrc: ''
//        },
//        columns: [{
//            data: "id"
//                }, {
//            data: "nome"
//                }, {
//            data: "cnh"
//                }, {
//            data: "telefone"
//                }],
//        "columnDefs": [{
//            "width": "5%",
//            "targets": 0
//                }, {
//            "width": "40%",
//            "targets": 1
//                }, {
//            "width": "60%",
//            "targets": 2
//                }, {
//            "width": "50%",
//            "targets": 3
//                }],
//        select: true,
//        fixedColumns: true,
//        lengthChange: false,
//        pageLength: 5,
//        dom: 'lrti<"right"p>',
//        language: {
//            url: "../../doc/Portuguese-Brasil.json"
//        }
//    });
//
//}
