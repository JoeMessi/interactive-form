

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

// if(!($(this).val() === 'js puns') && !($(this).val() === 'js puns')) {
//   console.log('yeyeye');
// }

    if($(this).val() === 'js puns') {
       $('#colors-js-puns').show();
       $("#color").children().remove();
       $("#color").append(js_puns);
       $('#color').val(js_puns[0].val());
    }
    else if($(this).val() === 'heart js') {
        $('#colors-js-puns').show();
        $("#color").children().remove();
        $("#color").append(heart_js);
        $('#color').val(heart_js[0].val());
    }
    else{
   // ( the commented lines used to concat and show all colors, probably no need for that anoymore )
        // $("#color").children().remove();
        // const allColors = js_puns.concat(heart_js);
        // $("#color").append(allColors);
        // $('#color').val(allColors[0].val());
        $('#colors-js-puns').hide();
    }
  });


// ( PROBABLY BRING THOSE VARIABLES UP LATER )

// variable that will hold a boolian value (true = we have at least 1 activity checked)
let checked_boxes;

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
    checked_boxes = true;
  }else{
    $('#total').remove();
    checked_boxes = false;
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

  // the following remove any error messages if any
     $('#credit-card').find('.error-span').hide();
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
// the card number and zip code fields when registering using the credit card payment option.
const checkIfNum = (element) => {
  const element_value = element.val();
  return /^\d+$/.test(element_value);
}




$('button').on('click', function(e) {
   e.preventDefault();

// name  ( I WANT TO MAKE THE ERROR GONE WHEN USER START TYPING BACK )
  if($('#name').val() === '') {
  //  console.log('name field is empty');
    $('#name').next().show();
    $('#name').addClass('error-border');
  }else{
      $('#name').next().hide();
      $('#name').removeClass('error-border');
  }

// email
  const email_input = /^[^@]+@[^@.]+\.[a-z]+$/i.test($('#mail').val());

  if(!email_input) {
  //   console.log('email not good');
    $('#mail').next().show();
    $('#mail').addClass('error-border');
  }else{
      $('#mail').next().hide();
      $('#mail').removeClass('error-border');
  }

// checkbox
  if(!checked_boxes) {
//     console.log('check at least one activity');
     $('.activities').find('.error-span').show();
  }else{
     $('.activities').find('.error-span').hide();
  }

// credit card payment
  if($('#payment').val() === 'credit card') {

    // holds the value of the card number input field
    const $card_num = $('#cc-num').val();
    // holds the value of the zip code input field
    const $card_zip = $('#zip').val();
    // holds the value of the CVV input field
    const $cvv = $('#cvv').val();

    // selects the generic error
    const $error_span = $('#credit-card').find('#error-card');
    // selects the credit card number error span we'll show and hide in the page
    const $error_span_num = $('#credit-card').find('#error-card-num');
    // selects the zip code error span we'll show and hide in the page
    const $error_span_zip = $('#credit-card').find('#error-card-zip');
    // selects the cvv error span we'll show and hide in the page
    const $error_span_cvv = $('#credit-card').find('#error-card-cvv');

    // the 'checkIfNum' function is called as the first condition of the following if statements.
    // we pass the relevant input element as argument to check if the user has typed only numbers in the field.

    // if any of this conditions the error message is shown
    if( (!checkIfNum($('#cc-num')) || !($card_num.length >= 13 && $card_num.length <= 16)) ||
        (!checkIfNum($('#zip')) || $card_zip.length !== 6) ||
        (!checkIfNum($('#cvv')) || $cvv.length !== 3) ) {

        $error_span.show();
    }else {
        $error_span.hide();
    }


    // some conditional errors for the credit card number field
    if($card_num === '') {
      // this sets the default error when the input is just empy
       $error_span_num.show().html('');
       $('#cc-num').addClass('error-border');

       if(!$error_span_num.html().includes('- enter a credit card number.')) {
         $error_span_num.append('- enter a credit card number.');
        }

    }else{ // *
      $error_span_num.html($error_span_num.html().replace('- enter a credit card number.', ''));
      $('#cc-num').addClass('error-border');

      if(!checkIfNum($('#cc-num'))) {
         $error_span_num.show().html('');

         if(!$error_span_num.html().includes('- card number can only contain numbers.')) {
            $error_span_num.append('- card number can only contain numbers.');
             $('#cc-num').addClass('error-border');

         }
      }else{
         $error_span_num.html($error_span_num.html().replace('- card number can only contain numbers.', ''));
         $('#cc-num').addClass('error-border');

         if (!($card_num.length >= 13 && $card_num.length <= 16)) {
            $error_span_num.show().html('');

            if(!$error_span_num.html().includes('- enter a number that is between 13 and 16 digits long.')) {
               $error_span_num.append('- enter a number that is between 13 and 16 digits long.');

            }
         }else{
            $error_span_num.html($error_span_num.html().replace('- enter a number that is between 13 and 16 digits long.', ''));
            $('#cc-num').removeClass('error-border');
            $error_span_num.hide();
         }

      }
    } // end of first else *





    // some conditional errors for the zip code number field
    if($card_zip === '') {
      // this sets the default error when the input is just empy
       $error_span_zip.show().html('');
       $('#zip').addClass('error-border');

       if(!$error_span_zip.html().includes('- enter a zip code.')) {
         $error_span_zip.append('- enter a zip code.');
        }

    }else{ // *
      $error_span_zip.html($error_span_zip.html().replace('- enter a zip code.', ''));
      $('#zip').addClass('error-border');

      if(!checkIfNum($('#zip'))) {
         $error_span_zip.show().html('');

         if(!$error_span_zip.html().includes('- zip code can only contain numbers.')) {
            $error_span_zip.append('- zip code can only contain numbers.');
             $('#zip').addClass('error-border');

         }
      }else{
         $error_span_zip.html($error_span_zip.html().replace('- zip code can only contain numbers.', ''));
         $('#zip').addClass('error-border');

         if ($card_zip.length !== 6) {
            $error_span_zip.show().html('');

            if(!$error_span_zip.html().includes('- zip code is a number of 6 digits.')) {
               $error_span_zip.append('- zip code is a number of 6 digits.');

            }
         }else{
            $error_span_zip.html($error_span_zip.html().replace('- zip code is a number of 6 digits.', ''));
            $('#zip').removeClass('error-border');
            $error_span_zip.hide();
         }

      }
    } // end of first else *








      // some conditional errors for the cvv number field
        if($cvv === '') {
          // this sets the default error when the input is just empy
           $error_span_cvv.show().html('');
           $('#cvv').addClass('error-border');

           if(!$error_span_cvv.html().includes('- enter a CVV number.')) {
             $error_span_cvv.append('- enter a CVV number.');
            }

        }else{ // *
          $error_span_cvv.html($error_span_cvv.html().replace('- enter a CVV number.', ''));
          $('#cvv').addClass('error-border');

          if(!checkIfNum($('#cvv'))) {
             $error_span_cvv.show().html('');

             if(!$error_span_cvv.html().includes('- CVV code can only contain numbers.')) {
                $error_span_cvv.append('- CVV code can only contain numbers.');
                 $('#cvv').addClass('error-border');

             }
          }else{
             $error_span_cvv.html($error_span_cvv.html().replace('- CVV code can only contain numbers.', ''));
             $('#cvv').addClass('error-border');

             if ($cvv.length !== 3) {
                $error_span_cvv.show().html('');

                if(!$error_span_cvv.html().includes('- CVV code is a number of 3 digits.')) {
                   $error_span_cvv.append('- CVV code is a number of 3 digits.');

                }
             }else{
                $error_span_cvv.html($error_span_cvv.html().replace('- CVV code is a number of 3 digits.', ''));
                $('#cvv').removeClass('error-border');
                $error_span_cvv.hide();
             }

          }
        } // end of first else *
















}


});  // end of click event


















});
