function fillVeiculoSelect(marcas, tipo) {

    //Load Json veiculos from FIPE API
    $.ajax({

        url: 'https://fipe-parallelum.rhcloud.com/api/v1/' + tipo + '/marcas/' + marcas + '/modelos',

        type: 'GET',
        dataType: 'json',
        success: function (json) {

            //            if (!json.length) {
            //                return;
            //            }
            $.each(json, function (key, value) {

                $.each(value, function (index, data) {

                    $('#veiculos').append(
                        $("<option></option>")
                        .attr('value', data.codigo)
                        .text(data.nome)
                    );
                })

                $('select').material_select();

            });
        },
        error: function (textStatus, errorThrown) {
            alert(textStatus);
        }

    });
};

function getMarcas() {
    //Load Json marcas from FIPE API
    $.ajax({
        url: 'http://192.168.10.10:3004/marca/',

        type: 'GET',
        dataType: 'json',
        success: function (json) {

            $.each(json, function (key, value) {

                $('#marca').append(
                    $("<option></option>")
                    .attr('value', value.id)
                    .text(value.nome)
                );
                $('#marca').material_select();

            });
        }
    });
};

function getModelos(marca) {
    console.log('http://192.168.10.10:3004/marca/' + marca + '/modelo');
    //Load Json marcas from FIPE API
    $.ajax({
        url: 'http://192.168.10.10:3004/marca/' + marca + '/modelo',

        type: 'GET',
        dataType: 'json',
        success: function (json) {

            $.each(json, function (key, value) {

                $('#modelo').append(
                    $("<option></option>")
                    .attr('value', value.id)
                    .text(value.nome)
                );
                $('#modelo').material_select();

            });
        }
    });
};
