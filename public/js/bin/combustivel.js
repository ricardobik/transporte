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
$("form").validate({
    ignore: [],
    debug: true,
    rules: {
        nomeCombustivel: {
            required: true
        }
    },
    messages: {
        nomeCombustivel: {
            required: "O campo nome não deve estar vazio"
        }
    }
});

//Fill combustivel imput to update/delete
function fillCombustivel(id) {

    $.ajax({
        type: "GET",
        url: urlApi + "combustivel/" + id,
        dataType: "json",

        //if received a response from the server
        success: function (data) {

            $("#idCombustivel").val(data.id);
            $("#nomeCombustivel").val(data.tipo);

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
                    url: urlApi + "combustivel/" + id,
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
function createCombustivel(data) {

    //make AJAX request
    $("#form").validate();
    if ($("#form").valid()) {
        $.ajax({
            type: "POST",
            url: urlApi + "combustivel",
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

};

//Update function
function updateCombustivel(id, dados) {

    var data = new Object();
    data.tipo = $("#tipoCombustivel").val();
    data.id = id;
    
    //do AJAX request
    $("form").validate();
    if ($("form").valid()) {

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
                url: urlApi + "combustivel/" + id,
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

//fill table combustivel to search
function fillCombustivelTable() {
    //Populates Table with Json
    tableCombustivel = $('table#table-combustivel').DataTable({
        ajax: {
            url: urlApi + "combustivel",
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            dataSrc: ''
        },
        columns: [{
            data: "id"
                }, {
            data: "tipo"
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

//insert into select to create veiculo
function getCombustivel() {
    
    //Load Json marca
    $.ajax({
        url: urlApi + "combustivel",

        type: 'GET',
        dataType: 'json',
        success: function (json) {

            $.each(json, function (key, value) {

                $('#combustivelid').append(
                    $("<option></option>")
                    .attr('value', value.id)
                    .text(value.tipo)
                );
                $('#combustivelid').material_select();

            });

        }
    });
};

function getCombustivelSelect(id) {
    
    //Load Json marcas from FIPE API
    $.ajax({
        url: urlApi + "combustivel",

        type: 'GET',
        dataType: 'json',
        success: function (json) {

            $.each(json, function (key, value) {

                $('#combustivelid').append(
                    $("<option></option>")
                    .attr('value', value.id)
                    .text(value.tipo)
                );
                
                $('#combustivelid').val(id);
                $('#combustivelid').material_select();

            });

        }
    });
};




