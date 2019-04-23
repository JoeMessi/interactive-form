
// let's wrap everything inside the document.ready
$(document).ready(() => {

// variable that will hold a boolian value (true = we have at least 1 activity checked)
let checked_boxes;

// I select 4 inputs inside the fieldset '.activities'
// which I will pass as arguments for the 'checkbox_relation' function.
const $js_frameworks = $(".activities input[name='js-frameworks']");
const $express = $(".activities input[name='express']");
const $js_libs = $(".activities input[name='js-libs']");
const $node = $(".activities input[name='node']");

// this will be an array of objects which will be used to pair up
// all input checkboxes with their equivalent activity price
const arr_obj_prices = [];


// gives focus to the name text field
  $('#name').focus();


/*** JOB ROLE SECTION ***/

// hides the text field that should appear when the 'Other' option
// is selected in the 'Job Role' dropdown menu
  $('#other-title').hide();

// this will show the text field only when 'other' is
// selected from the 'job role' drop down menu.
  $('#title').change(function() {

    if($('#title').val() === 'other') {
      $('#other-title').show();
    }else{
      $('#other-title').hide();
    }
  });


/*** T-SHIRT INFO SECTION ***/

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
    // let's show the div '#colors-js-puns' which is supposed to be hidden
    // until a design is selected from the 'design' drop down menu.
       $('#colors-js-puns').show();

       $("#color").children().remove();
       $("#color").append(js_puns);
       $('#color').val(js_puns[0].val());
    }
    else if($(this).val() === 'heart js') {
    // let's show the div '#colors-js-puns' which is supposed to be hidden
    // until a design is selected from the 'design' drop down menu.
        $('#colors-js-puns').show();

        $("#color").children().remove();
        $("#color").append(heart_js);
        $('#color').val(heart_js[0].val());
    }
    else{
        $('#colors-js-puns').hide();
    }
  });


/*** REGISTER FOR ACTIVITIES SECTION ***/

// The 'checkbox_relation' function deals with the relation of 2 activites that happen
// at the same day and time inside the fieldset '.activities'.
// If the checkbox of one is checked the checkbox of the other
// gets disabled and vice versa.
const checkbox_relation = (checkbx1, checkbx2) => {
// first if statement enables both if one of them is unchecked
// the 'disabled' class changes the opacity of the label the inputs are in
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
I pair up all input checkboxes with their equivalent activity price by dinamically create an array of objects.
each object in the array will have the following format:

   name: the value of the name attribute of the specific input,
   price: the price of the activity

I loop through all the label elements inside '.activities' and for each loop
an object is created and pushed to the 'arr_obj_prices' array
*****/

$('.activities label').each(function(){
   const obj = {};

// '$name' holds the value of the input name attribute
   const $name = $(this).children(':first').attr('name');

// I get the price of the activity from the actual string of the label.
//   1) select the string
//   2) split the string into an array of words
//   3) I push the last word (which is our activity price) into a new array
//   4) I remove the $ sign from it

   const $label_text = $(this).text();
   const $text_in_words = $label_text.split(' ');
   const last_word = [];
   last_word.push($text_in_words.pop());

   const price = last_word[0].slice(1);

   obj.name = $name;
   obj.price = price;
   arr_obj_prices.push(obj);
});


// now we set a 'click' event listener on the fieldset '.activities'
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
// the 'total' variable which represents the total price of all the activites that the user has checked.

  if(total !== 0) {
    $('#total').remove();
    $('.activities').append("<p id='total'>Total: $" + total + "</p>");
    checked_boxes = true;
  }else{
    $('#total').remove();
    checked_boxes = false;
  }
});


/*** PAYMENT INFO SECTION ***/

// I set the default view of the payment info section
// by hiding and showing elements that contain the different payment methods
$('#payment').val('credit card');

$('#credit-card').show();
$('#paypal').hide();
$('#bitcoin').hide();
// this one disables the 'select payment method' option from the drop down menu
$("#payment option[value='select_method']").attr('disabled', true);

// the 'change' method on '#payment' allow me to listen for any changes in value of the select element.
// I display and/or hide the divs containing the different payment info depending on the selected payment option.
$('#payment').change(function() {

  if($('#payment').val() === 'credit card') {
     $('#credit-card').show();
     $('#paypal').hide();
     $('#bitcoin').hide();

  // the following remove any error messages if any appended on the page
     $('#credit-card').find('#error-card-num').hide();
     $('#credit-card').find('#error-card-zip').hide();
     $('#credit-card').find('#error-card-cvv').hide();

     $('#cc-num').removeClass('error-border').val('');
     $('#zip').removeClass('error-border').val('');
     $('#cvv').removeClass('error-border').val('');
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


// this function checks if the value of an element contains only numbers.
// we will use this function to check if the user has typed only numbers in
// the card number, zip code and CVV fields when registering using the credit card payment option.
const checkIfNum = (element) => {
  const element_value = element.val();
  return /^\d+$/.test(element_value);
}


// the 'appendError' function append 'error' spans to the page depending on some conditions
// related to the 3 inputs in the credit card section ( card number, zip code and CVV )
// since the validation I was testing is almost identical for all 3 inputs I thought I'd write
// a function to shorten the code.

// it takes 6 parameters ( I know it's not ideal to have that many parameters,
// but creating this function made the code 60 lines shorter  )

// the parameters are:
   // - the actual input element
   // - the error span related to that specific input ( which is created in the html)
   // - a first error string
   // - a second error string
   // - a third error string
   // - and finaly an additional condition, which I pass as an argument since it will be different for each inputs.
   //   an example of what it will be tested in this final condition is:
   //    - if the number is between 13 and 16 digits long
   //    - or if the number is a exactly a certain numbers of digits long.

// the condition we are testing are:
//   if the input is empty
//   if the input value is a number
//   and if the number typed in is between/or a certain digit long.

// and depending on the condition we append different strings to the page.

const appendError = (input, error_span, error1, error2, error3, last_condition ) => {

 // hold the value of the input field
  const input_value = input.val();

 // we first test if the input is empty
  if(input_value === '') {

  // this will clear the span if any strings already appended to it
     error_span.show().html('');
  // this will add a red border to the input
     input.addClass('error-border');
  // if the span does NOT include our first error string we append it to it
     if(!error_span.html().includes(error1)) {
       error_span.append(error1);
     }

  }else{
  /* if we got here it means that the input is not empty anymore */

  // we clear our span and add the red border to the input
     error_span.show().html('');
     input.addClass('error-border');

  // now we check if the input value is NOT all numbers
     if(!checkIfNum(input)) {
  // if the span does NOT include our second error string we append it to it
       if(!error_span.html().includes(error2)) {
          error_span.append(error2);
       }

     }else{
  /* if we got here it means that the input is not empty and it's only numbers */

  // we clear our span and add the red border to the input
       error_span.show().html('');
       input.addClass('error-border');

  // now we check if the last condition is NOT true
  // the last condition varies depending on which input we're calling the function for
         if (!last_condition) {

  // if the span does NOT include our third error string we append it to it
          if(!error_span.html().includes(error3)) {
            error_span.append(error3);
           }

         }else{
  /* at this point the validation is completed and we can clear our error  */
           input.removeClass('error-border');
           error_span.hide();
         }
     }
  }
}


// inside a 'click' event listener on the 'register' button
// we test and run validations for the inputs in our form
// depending on the outcome we append errors to the page

$('button').on('click', function(e) {
   e.preventDefault();


// NAME ( the input can't be empy )
  if($('#name').val() === '') {

    $('#name').next().show();
    $('#name').addClass('error-border');
  }else{
      $('#name').next().hide();
      $('#name').removeClass('error-border');
  }


// EMAIL ( we test the input value using a regular expression )
  const email_input = /^[^@\s]+@[^@.\s]+\.[a-z\S]+$/.test($('#mail').val());

  if(!email_input) {

    $('#mail').next().show();
    $('#mail').addClass('error-border');
  }else{
      $('#mail').next().hide();
      $('#mail').removeClass('error-border');
  }


// ACTIVITY CHECKBOXES ( at least one input must be checked, 'checked_boxes' holds a boolian value )
  if(!checked_boxes) {

     $('.activities').find('.error-span').show();
  }else{
     $('.activities').find('.error-span').hide();
  }


// CREDIT CARD PAYMENT
// for the credit card inputs (card number, zip code and CVV) we'll call
// the 'appendError' function passing the relevant arguments for each of the 3 inputs.

  if($('#payment').val() === 'credit card') {

  // holds the value of the card number input field
    const $card_num = $('#cc-num').val();
  // holds the value of the zip code input field
    const $card_zip = $('#zip').val();
  // holds the value of the CVV input field
    const $cvv = $('#cvv').val();

  // selects the credit card number error span we'll show and hide in the page
    const $error_span_num = $('#credit-card').find('#error-card-num');
  // selects the zip code error span we'll show and hide in the page
    const $error_span_zip = $('#credit-card').find('#error-card-zip');
  // selects the cvv error span we'll show and hide in the page
    const $error_span_cvv = $('#credit-card').find('#error-card-cvv');


  // calling 'appendError' for the card number input
    appendError( $('#cc-num'), $error_span_num,
                 '- enter a credit card number.',
                 '- card number can only contain numbers.',
                 '- enter a number that is between 13 and 16 digits long.',
                 ($card_num.length >= 13 && $card_num.length <= 16) );

  // calling 'appendError' for the zip code input
    appendError( $('#zip'), $error_span_zip,
                 '- enter a zip code.',
                 '- zip code can only contain numbers.',
                 '- zip code is a number of 6 digits.',
                 ($card_zip.length === 6) );

  // calling 'appendError' for the CVV input
    appendError( $('#cvv'), $error_span_cvv,
                 '- enter a CVV number.',
                 '- CVV code can only contain numbers.',
                 '- CVV code is a number of 3 digits.',
                 ($cvv.length === 3) );
  }
});


// until here we run our validations only when the user has clicked the button of our form.
// now, additionally, we run some validations inside a 'keyup' event listener
// this will provide the user with an instant feedback about what he/she is typing.

// the code used to validate each input remains the same as the ones inside the
// 'click' event listener.


// keyup validation for the email input
$('#mail').keyup(function() {

  const email_input = /^[^@\s]+@[^@.\s]+\.[a-z\S]+$/.test($('#mail').val());

  if(!email_input) {
    $('#mail').next().show();
    $('#mail').addClass('error-border');
  }else{
      $('#mail').next().hide();
      $('#mail').removeClass('error-border');
  }
});


// keyup validation for the card number input
  $('#cc-num').keyup(function() {

    // holds the value of the card number input field
    const $card_num = $('#cc-num').val();

    // selects the generic error
    // const $error_span = $('#credit-card').find('#error-card');

    // selects the credit card number error span we'll show and hide in the page
    const $error_span_num = $('#credit-card').find('#error-card-num');

    appendError( $('#cc-num'), $error_span_num,
                 '- enter a credit card number.',
                 '- card number can only contain numbers.',
                 '- enter a number that is between 13 and 16 digits long.',
                 ($card_num.length >= 13 && $card_num.length <= 16) );
  });



// keyup validation for the zip code input
  $('#zip').keyup(function() {

    // holds the value of the zip code input field
    const $card_zip = $('#zip').val();

    // selects the zip code error span we'll show and hide in the page
    const $error_span_zip = $('#credit-card').find('#error-card-zip');

    appendError( $('#zip'), $error_span_zip,
                '- enter a zip code.',
                '- zip code can only contain numbers.',
                '- zip code is a number of 6 digits.',
                ($card_zip.length === 6) );
  });



// keyup validation for the CVV input
  $('#cvv').keyup(function() {

    // holds the value of the CVV input field
    const $cvv = $('#cvv').val();

    // selects the cvv error span we'll show and hide in the page
    const $error_span_cvv = $('#credit-card').find('#error-card-cvv');

    appendError( $('#cvv'), $error_span_cvv,
                '- enter a CVV number.',
                '- CVV code can only contain numbers.',
                '- CVV code is a number of 3 digits.',
                ($cvv.length === 3) );
  });

});
