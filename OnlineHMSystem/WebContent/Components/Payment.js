$(document).ready(function()
{
if ($("#alertSuccess").text().trim() == "")
 {
 $("#alertSuccess").hide();
 }
 $("#alertError").hide();
});
// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
// Clear alerts---------------------
 $("#alertSuccess").text("");
 $("#alertSuccess").hide();
 $("#alertError").text("");
 $("#alertError").hide();
// Form validation-------------------
var status = validatePaymentForm();
if (status != true)
 {
 $("#alertError").text(status);
 $("#alertError").show();
 return;
 }
// If valid------------------------
 $("#formBillinfo").submit();
});
// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
 $("#hidPaymentIDSave").val($(this).closest("tr").find('#hidPaymentIDUpdate').val());
 $("#PayDate").val($(this).closest("tr").find('td:eq(0)').text());
 $("#CustomerName").val($(this).closest("tr").find('td:eq(1)').text());
 $("#Amount").val($(this).closest("tr").find('td:eq(2)').text());
 $("#Description").val($(this).closest("tr").find('td:eq(3)').text());
});
// CLIENTMODEL=========================================================================
function validatePaymentForm()
{
// CODE
if ($("#PaymentID").val().trim() == "")
 {
 return "Insert Paymen Code.";
 }
// DATE
if ($("#PayDate").val().trim() == "")
 {
 return "Insert Date.";
 } 
// NAME
if ($("#CustomerName").val().trim() == "")
{
return "Insert Customer Name.";
}
//PRICE-------------------------------
if ($("#Amount").val().trim() == "")
 {
 return "Insert Item Price.";
 }
// is numerical value
var tmpPrice = $("#Amount").val().trim();
if (!$.isNumeric(tmpPrice))
 {
 return "Insert a numerical value for Amount.";
 }
// convert to decimal price
 $("#Amount").val(parseFloat(tmpPrice).toFixed(2));
// DESCRIPTION------------------------
if ($("#Description").val().trim() == "")
 {
 return "Insert Description.";
 }
return true;
}



