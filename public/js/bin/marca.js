var $update = "";

// Validade Fields materialize.css
$.validator.setDefaults({
    errorClass: 'invalid',
    validClass: "valid",
    errorPlacement: function (error, element) {
        $(element).closest("form").find("label[for='" + element.attr("id") + "']").attr('data-error', error.text()).attr('class', 'active');
    },
    submitHandler: function (form) {
        console.log('form ok');
    }
});
//Rules and Messages to Validate
$("form").validate({
    //    ignore: [],
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

//Get Brands to fill select
function getMarcas(input) {
    $.ajax({
        url: 'http://192.168.10.10:3004/marca/',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            $.each(json, function (key, value) {
                $('#' + input).append($("<option></option>").attr('value', value.id).text(value.nome));
                $('#' + input).material_select();
            });
        }
    });
};
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
            dataType: "json", //if received a response from the server
            success: function (response) {
                swal("Pronto!", successMsg, "success");
            },
        });
        $('#modeloModal').modal('close');
    }
    //Reload Material Form
    Materialize.updateTextFields();
};
//Create Function for Type, Brand and Model
function saveAll(type) {
    var data = new Object();
    var url, successMsg = "";
    switch (type) {
        case "0":
            data.nome = $("#marca").val();
            url = "http://192.168.10.10:3004/marca";
            successMsg = "Marca adicionada com sucesso";
            break;
        case "1":
            data.marcaId = $("#marcaSelect").val();
            data.nome = $("#modelo").val();
            url = "http://192.168.10.10:3004/modelo";
            successMsg = "Modelo adicionado com sucesso";
            break;
        case "2":
            data.nome = $("#tipo").val();
            url = "http://192.168.10.10:3004/tipo";
            successMsg = "Tipo de veículo adicionado com sucesso";
            break;
    };
    //make AJAX request
    $("#form").validate();
    if ($("form").valid()) {
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: "json", //if received a response from the server
            success: function (response) {
                swal("Pronto!", successMsg, "success");
            },
        });
    }
    //Empty all fields
    $(':input', '#form').not(':button, :submit, :reset').val('').removeAttr('checked').removeAttr('selected');
    //Reload Material Form
    Materialize.updateTextFields();
};
//Fill table marca
function fillMarcaTable() {
    //Populates Table with Json
    tableMarca = $('table#table-marca').DataTable({
        ajax: {
            url: "http://192.168.10.10:3004/marca",
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

function fillMarca(id) {
    console.log(id);

    $.ajax({
        type: "GET",
        url: "http://192.168.10.10:3004/marca/" + id,
        dataType: "json",

        //if received a response from the server
        success: function (data) {

            $("#idMarca").val(data.id);
            $("#nomeMarca").val(data.nome);

            //Reload Material Form
            Materialize.updateTextFields();

        },

    });

};

function updateMarca(id, dados) {

    var data = new Object();
    data.id = id;
    data.nome = $("#nomeMarca").val();
        
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
                url: "http://192.168.10.10:3004/marca/" + id,
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

            });

        });

    }
    //Reload Material Form
    Materialize.updateTextFields();

};