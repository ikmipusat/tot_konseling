function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1");
  if (!sheet) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: "Sheet 'Form Responses 1' tidak ditemukan!" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  // Ambil judul dari I3
  const judul = sheet.getRange("I3").getValue();

  // Ambil data dari B3:D hingga baris terakhir
  const lastRow = sheet.getLastRow();
  const range = sheet.getRange(3, 2, lastRow - 2, 3); // (startRow, startColumn, numRows, numColumns)
  const data = range.getValues();

  const headers = ["No", "Nama dan Gelar", "Sebagai"]; // Sesuaikan dengan header Anda

  const result = {
    judul: judul,  // Nilai dari I3
    data: data.map(row => {
      let obj = {};
      row.forEach((cell, i) => {
        obj[headers[i]] = cell;
      });
      return obj;
    })
  };

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}