$(document).ready(function()
{
 $("#alertSuccess").hide();
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
var type = ($("#hidPaymentIDSave").val() == "") ? "POST" : "PUT";
$.ajax(
		{
		 url : "PaymentAPI",
		 type : type,
		 data : $("#formBillinfo").serialize(),
		 dataType : "text",
		 complete : function(response, status)
		 {
		 onPaymentSaveComplete(response.responseText, status);
		 }
		});
});

function onPaymentSaveComplete(response, status)
{
if (status == "success")
 {
 var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success")
 {
 $("#alertSuccess").text("Successfully saved.");
 $("#alertSuccess").show();
 $("#divPaymentGrid").html(resultSet.data);
 } else if (resultSet.status.trim() == "error")
 {
 $("#alertError").text(resultSet.data);
 $("#alertError").show();
 }
 } else if (status == "error")
 {
 $("#alertError").text("Error while saving.");
 $("#alertError").show();
 } else
 {
 $("#alertError").text("Unknown error while saving..");
 $("#alertError").show();
 }
 $("#hidPaymentIDSave").val("");
 $("#formBillinfo")[0].reset();
}



// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
 $("#hidPaymentIDSave").val($(this).closest("tr").find('#hidPaymentIDUpdate').val());
 $("#PayDate").val($(this).closest("tr").find('td:eq(0)').text());
 $("#CustomerName").val($(this).closest("tr").find('td:eq(1)').text());
 $("#Amount").val($(this).closest("tr").find('td:eq(2)').text());
 $("#Description").val($(this).closest("tr").find('td:eq(3)').text());
});

// REMOVE 
$(document).on("click", "#btnRemove", function(event)
		{$.ajax(
				{
					 url : "PaymentAPI",
					 type : "DELETE",
					 data : "PaymentID=" + $(this).data("PaymentID"),
					 dataType : "text",
					 complete : function(response, status)
					 {
					 onPaymentDeleteComplete(response.responseText, status);
					 }
					});
			});

function onPaymentDeleteComplete(response, status)
{
if (status == "success")
 {
 var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success")
 {
 $("#alertSuccess").text("Successfully Removed.");
 $("#alertSuccess").show();
 $("#divPaymentGrid").html(resultSet.data);
 } else if (resultSet.status.trim() == "error")
 {
 $("#alertError").text(resultSet.data);
 $("#alertError").show();
 }
 } else if (status == "error")
 {
 $("#alertError").text("Error while Removing.");
 $("#alertError").show();
 } else
 {
 $("#alertError").text("Unknown error while saving..");
 $("#alertError").show();
 }
}

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



