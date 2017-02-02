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
            console.log(data.marcaId);

            $('#marcaModal').material_select();

        },

    });

};
