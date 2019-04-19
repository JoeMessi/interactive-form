

$(document).ready(() => {

// give focus to the name text field
  $('#name').focus();

// hides the text field that should appear when the 'Other' option
// is selected in the 'Job Role' dropdown menu
  $('#other-title').hide();

// I split the options of the select element '#color' into 2 arrays.
// first I assign a class name to each option in index.html, then
// I loop over all options using the .each method on the html collection of options
// and with the help of 2 if statements I push each option into one of the 2 arrays
// depending on what class name they have assigned.
  const js_puns = [];
  const heart_js = [];

  $("#color option").each(function(){
    if($(this).hasClass('puns')) {
      js_puns.push($(this));
    }
    if($(this).hasClass('heart')) {
      heart_js.push($(this));
    }
  });

// now that we have our 2 arrays of color options
// we need to display one of them depending on the value of the '#design' select element
// with the .change method I listen when the value of '#design' changes
// and with the help of an if/else statement I append the right array
// to the '#color' select element.
// the approach of all conditions is:
// 1) remove all current options 2) add the right array of options
  $('#design').change(function(){

    if($(this).val() === 'js puns') {
      $("#color").children().remove();
      $("#color").append(js_puns);
      $('#color').val(js_puns[0].val());
    }
    else if($(this).val() === 'heart js') {
        $("#color").children().remove();
        $("#color").append(heart_js);
        $('#color').val(heart_js[0].val());
    }
    else{
        $("#color").children().remove();
        const allColors = js_puns.concat(heart_js);
        $("#color").append(allColors);
        $('#color').val(allColors[0].val());
    }
  });


// I select 4 inputs inside the fieldset '.activities'
// which I will pass as arguments for the 'checkbox_relation' function.
const $js_frameworks = $(".activities input[name='js-frameworks']");
const $express = $(".activities input[name='express']");

const $js_libs = $(".activities input[name='js-libs']");
const $node = $(".activities input[name='node']");


// The 'checkbox_relation' function deals with the relation of 2 activites that happen
// at the same day and time inside the fieldset '.activities'.
// If the checkbox of one is checked the checkbox of the other
// gets disabled and vice versa.
const checkbox_relation = (checkbx1, checkbx2) => {
// first if statement enables both if one of them is unchecked
   if(!checkbx1.prop('checked') || !checkbx2.prop('checked')) {
      checkbx1.prop('disabled', false);
      checkbx1.parent().removeClass('disabled');
      checkbx2.prop('disabled', false);
      checkbx2.parent().removeClass('disabled');
   }
   if(checkbx1.prop('checked')) {
     checkbx2.prop('disabled', true);
     checkbx2.parent().addClass('disabled');
   }
   if(checkbx2.prop('checked')) {
     checkbx1.prop('disabled', true);
     checkbx1.parent().addClass('disabled');
   }
}

/*****
I pair up all input checkboxes with their equivalent activity price by dinamically create an array of object.
each object in the array will have the following format:

   name: the value of the name attribute of the specific input,
   price: the price of the activity

I loop through all the label elements inside '.activities' and for every loop
an object is created and pushed to the 'arr_obj_prices' array
*****/
const arr_obj_prices = [];

$('.activities label').each(function(){
   const obj = {};

   const $name = $(this).children(':first').attr('name');

   const $label_text = $(this).text();
   const $text_in_words = $label_text.split(' ');
   const last_word = [];
   last_word.push($text_in_words.pop());

   const price = last_word[0].slice(1);

   obj.name = $name;
   obj.price = price;
   arr_obj_prices.push(obj);
});


// I set a 'click' event listener on the fieldset '.activities'
$('.activities').on('click', 'input', function(event) {

// we call the 'checkbox_relation' function passing as arguments the 2 pairs
// of activities that happen at the same day and time.

  checkbox_relation($js_frameworks, $express);
  checkbox_relation($js_libs, $node);

// everytime the 'click' event is triggered we need to compare
// the values of the attribute 'name' of all 'checked' inputs with the names we store in
// the array of objects we created earlier in the code.
// ( nested loops are great for comparing 2 lists )

// we loop through all inputs and if any of them is 'checked'
// another loop will take place through the array of objects
// where we check if there is a match and if so we add the price paired
// to the matched name to the 'total' variable.

  let total = 0;
  const $inputs = $('.activities input');

  $inputs.each(function() {

    if($(this).prop('checked')){

      for(let i = 0; i < arr_obj_prices.length; i+=1) {
         const name_checked = $(this).attr('name');
         const name_array = arr_obj_prices[i].name;

         if(name_checked === name_array) {
         total+= parseInt(arr_obj_prices[i].price);
         }
      }
    }
  })

// after the looping, in a conditional statement we append and/or remove to the page
// the 'total' variable which represents the total price of all the activites that the user checked.

  if(total !== 0) {
    $('#total').remove();
    $('.activities').append("<p id='total'>Total: $" + total + "</p>");
  }else{
    $('#total').remove();
  }
});


/* PAYMENT INFO SECTION */

// I set the default view of the payment info section
// by hiding and showing elements that represent different payment methods
$('#payment').val('credit card');

$('#credit-card').show();
$('#paypal').hide();
$('#bitcoin').hide();
$("#payment option[value='select_method']").attr('disabled', true);

// the 'change' method on '#payment' allow me to listen for any changes in value of the select element.
// I dispay and/or hide the divs containing the different payment info depending on the selected payment option.
$('#payment').change(function() {

  if($('#payment').val() === 'credit card') {
     $('#credit-card').show();
     $('#paypal').hide();
     $('#bitcoin').hide();
  }

  else if($('#payment').val() === 'paypal') {
     $('#credit-card').hide();
     $('#paypal').show();
     $('#bitcoin').hide();
  }

  else if($('#payment').val() === 'bitcoin') {
     $('#credit-card').hide();
     $('#paypal').hide();
     $('#bitcoin').show();
  }

});





});
