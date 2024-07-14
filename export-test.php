<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML to PDF</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js"></script>
</head>
<style>
    body { padding: 10px; }

* { background-color: #fff; }

h1 { margin-top: 0; }

h2 { margin-top: 40px; }

.form {
  padding: 20px;
  
  .title { margin-bottom: 60px; }
  
  .row:nth-child(even) {
    padding-bottom: 20px;
    margin-bottom: 30px;
    
    border-bottom: #ccc thin solid;
  }
}
</style>
<body>
    <div class="container" id="form">
        <div class="row title hidden-print">
            <div class="col-sm-6">
                <h1>HTML to PDF</h1>
            </div>
            <div class="col-sm-6 text-right">
                <a class="btn btn-success" id="exportForm">Export page</a>
            </div>
        </div>

        <div id="first-page">
            <div class="row title">
                <div class="col-sm-12">
                    <h2>First Page</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-3 form-group">
                    <label>First Name</label>
                    <input class="form-control" type="text">
                </div>
                <div class="col-sm-3 form-group">
                    <label>Last Name</label>
                    <input class="form-control" type="text">
                </div>
                <div class="col-sm-3 form-group">
                    <label>Birthday</label>
                    <input class="form-control" type="text">
                </div>
                <div class="col-sm-3 form-group">
                    <label>Email Address</label>
                    <input class="form-control" type="email">
                </div>
            </div>
            <div class="row hidden-print">
                <div class="col-sm-12 form-group">
                    <label>Bio</label>
                    <textarea class="form-control"></textarea>
                </div>
            </div>
        </div>

        <div id="second-page">
            <div class="row title">
                <div class="col-sm-12">
                    <h2>Second Page</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-3 form-group">
                    <label>First Name</label>
                    <input class="form-control" type="text">
                </div>
                <div class="col-sm-3 form-group">
                    <label>Last Name</label>
                    <input class="form-control" type="text">
                </div>
                <div class="col-sm-3 form-group">
                    <label>Birthday</label>
                    <input class="form-control" type="text">
                </div>
                <div class="col-sm-3 form-group">
                    <label>Email Address</label>
                    <input class="form-control" type="email">
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 form-group">
                    <label>Bio</label>
                    <textarea class="form-control"></textarea>
                </div>
            </div>
        </div>
    </div>
</body>
<script>
    $('#exportForm').click(function(){
  var pdf = new jsPDF('a', 'mm', 'a4');
  var firstPage;
  var secondPage;
  
  html2canvas($('#first-page'), {
    onrendered: function(canvas) {
      firstPage = canvas.toDataURL('image/jpeg', 1.0);
    }
  });
  
  html2canvas($('#second-page'), {
    onrendered: function(canvas) {
      secondPage = canvas.toDataURL('image/jpeg', 1.0);
    }
  });
  
  
  setTimeout(function(){
    pdf.addImage(firstPage, 'JPEG', 5, 5, 200, 0);
    pdf.addPage();
    pdf.addImage(secondPage, 'JPEG', 5, 5, 200, 0);
    pdf.save("export.pdf");
  }, 150);
});
</script>
</html>
