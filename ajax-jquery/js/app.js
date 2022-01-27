$(document).ready(function () {
  let id = "";
  let pelanggan = "";
  let alamat = "";
  let telp = "";

  $("#submit").click(function (e) {
    e.preventDefault();
    id = $("#id").val();
    pelanggan = $("#pelanggan").val(); // mengisis variabel dengan getVal
    alamat = $("#alamat").val();
    telp = $("#telp").val();

    if (id == "") {
      insertData();
    } else {
      updateData();
    }

    $("#id").val("");
    $("#pelanggan").val("");
    $("#alamat").val("");
    $("#telp").val("");
  });

  $("#btn-tambah").click(function (e) {
    e.preventDefault();

    $("#tittle").html("<p>Tambah Data</p>");

    $("#id").val("");
    $("#pelanggan").val("");
    $("#alamat").val("");
    $("#telp").val("");
  });

  $("tbody").on("click", "#btn-del", function () {
    let id = $(this).attr("data-id");
    if (confirm("Yakin akan hapus data ini ?")) {
      //confirm mrupakan function dr JS
      deleteData(id);
    }
  });

  $("tbody").on("click", "#btn-update", function () {
    let id = $(this).attr("data-id");
    $("#tittle").html("<p>Update Data</p>");
    selectUpdate(id);
  });

  function selectUpdate(id) {
    let idpelanggan = {
      idpelanggan: id,
    };

    $.ajax({
      type: "post",
      url: "php/selectupdate.php",
      cache: false,
      data: JSON.stringify(idpelanggan),
      success: function (response) {
        let data = JSON.parse(response);

        $("#id").val(data.idpelanggan);
        $("#pelanggan").val(data.pelanggan);
        $("#alamat").val(data.alamat);
        $("#telp").val(data.telp);
      },
    });
  }

  function selectData() {
    $.ajax({
      type: "get",
      url: "php/select.php",
      cache: false,
      dataType: "json",
      success: function (response) {
        let out = "";
        let No = 1;
        $.each(response, function (_key, val) {
          out += `<tr>
                            <td>${No++}</td>
                            <td>${val.pelanggan}</td>
                            <td>${val.alamat}</td>
                            <td>${val.telp}</td>
                            <td><button type="button" class="btn btn-danger" id="btn-del" data-id=${
                              val.idpelanggan
                            } >Delete</button></td> //val.idpel itu utk ambil id
                            <td><button type="button" class="btn btn-success" id="btn-update" data-id=${
                              val.idpelanggan
                            } data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button></td> //val.idpel itu utk ambil id
                        </tr>`;
        });
        $("#isidata").html(out);
      },
    });
  }

  function insertData() {
    let dataPelanggan = {
      pelanggan: pelanggan,
      alamat: alamat,
      telp: telp,
    };

    $.ajax({
      type: "post",
      url: "php/insert.php",
      cache: false,
      data: JSON.stringify(dataPelanggan),

      success: function (response) {
        // response berguna untuk membaca file kiriman dr PHP
        let out = `<p>${response}</p>`;
        alert(response);
      },
    });

    selectData();
  }

  function deleteData(id) {
    let idpelanggan = {
      idpelanggan: id,
    };

    $.ajax({
      type: "post",
      url: "php/delete.php",
      cache: false,
      data: JSON.stringify(idpelanggan),

      success: function (response) {
        alert(response);
      },
    });

    selectData();
  }

  function updateData() {
    let dataPelanggan = {
      idpelanggan: id,
      pelanggan: pelanggan,
      alamat: alamat,
      telp: telp,
    };

    $.ajax({
      type: "post",
      url: "php/update.php",
      cache: false,
      data: JSON.stringify(dataPelanggan),

      success: function (response) {
        let out = `<p>${response}</p>`;
        alert(response);
      },
    });

    selectData();
  }

  selectData();
});
