    var fm_currentDate = new Date();
    var FormCurrency_4 = '$';
    var FormPaypalTax_4 = '0';
    var check_submit4 = 0;
    var check_before_submit4 = {};
    var required_fields4 = ["2","3"];
    var labels_and_ids4 = {"4":"type_text","2":"type_text","3":"type_text","6":"type_text","7":"type_text","1":"type_submit_reset"};
    var check_regExp_all4 = [];
    var check_paypal_price_min_max4 = [];
    var file_upload_check4 = [];
    var spinner_check4 = [];
    var scrollbox_trigger_point4 = '20';
    var header_image_animation4 = 'none';
    var scrollbox_loading_delay4 = '0';
    var scrollbox_auto_hide4 = '1';
    var inputIds4 = '[]';
        var update_first_field_id4 = 0;
    var form_view_count4 = 0;
    // Occurs before the form is loaded
function before_load4() {
     
}

// Occurs just before submitting  the form
function before_submit4() {
     // IMPORTANT! If you want to interrupt (stop) the submitting of the form, this function should return true. You don't need to return any value if you don't want to stop the submission.
}

// Occurs just before resetting the form
function before_reset4() {
     
}
// Occurs after form is submitted and reloaded
function after_submit4() {
     
}    function onload_js4() {    }

    function condition_js4() {    }

    function check_js4(id, form_id) {
      if (id != 0) {
        x = jQuery("#" + form_id + "form_view"+id);
      }
      else {
        x = jQuery("#form"+form_id);
      }
          }

    function onsubmit_js4() {
      
    var disabled_fields = "";
    jQuery("#form4 div[wdid]").each(function() {
      if(jQuery(this).css("display") == "none") {
        disabled_fields += jQuery(this).attr("wdid");
        disabled_fields += ",";
      }
    })
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields4\" value =\""+disabled_fields+"\" />").appendTo("#form4");
    };    }

    function unset_fields4( values, id, i ) {
      rid = 0;
      if ( i > 0 ) {
        jQuery.each( values, function( k, v ) {
          if ( id == k.split('|')[2] ) {
            rid = k.split('|')[0];
            values[k] = '';
          }
        });
        return unset_fields4(values, rid, i - 1);
      }
      else {
        return values;
      }
    }

    function ajax_similarity4( obj, changing_field_id ) {
      jQuery.ajax({
        type: "POST",
        url: fm_objectL10n.form_maker_admin_ajax,
        dataType: "json",
        data: {
          nonce: fm_ajax.ajaxnonce,
          action: 'fm_reload_input',
          page: 'form_maker',
          form_id: 4,
          inputs: obj.inputs
        },
        beforeSend: function() {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              if ( val != '' && parseInt(wdid) == parseInt(changing_field_id) ) {
                jQuery("#form4 div[wdid='"+ wdid +"']").append( '<div class="fm-loading"></div>' );
              }
            });
          }
        },
        success: function (res) {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              jQuery("#form4 div[wdid='"+ wdid +"'] .fm-loading").remove();
              if ( !jQuery.isEmptyObject(res[wdid]) && ( !val || parseInt(wdid) == parseInt(changing_field_id) ) ) {
                jQuery("#form4 div[wdid='"+ wdid +"']").html( res[wdid].html );
              }
            });
          }
        },
        complete: function() {
        }
      });
    }

    function fm_script_ready4() {
      if (jQuery('#form4 .wdform_section').length > 0) {
        fm_document_ready( 4 );
      }
      else {
        jQuery("#form4").closest(".fm-form-container").removeAttr("style")
      }
      if (jQuery('#form4 .wdform_section').length > 0) {
        formOnload(4);
      }
      var ajaxObj4 = {};
      var value_ids4 = {};
      jQuery.each( jQuery.parseJSON( inputIds4 ), function( key, values ) {
        jQuery.each( values, function( index, input_id ) {
          tagName =  jQuery('#form4 [id^="wdform_'+ input_id +'_elemen"]').attr("tagName");
          type =  jQuery('#form4 [id^="wdform_'+ input_id +'_elemen"]').attr("type");
          if ( tagName == 'INPUT' ) {
            input_value = jQuery('#form4 [id^="wdform_'+ input_id +'_elemen"]').val();
            if ( jQuery('#form4 [id^="wdform_'+ input_id +'_elemen"]').is(':checked') ) {
              if ( input_value ) {
                value_ids4[key + '|' + input_id] = input_value;
              }
            }
            else if ( type == 'text' ) {
              if ( input_value ) {
                value_ids4[key + '|' + input_id] = input_value;
              }
            }
          }
          else if ( tagName == 'SELECT' ) {
            select_value = jQuery('#form4 [id^="wdform_'+ input_id +'_elemen"] option:selected').val();
            if ( select_value ) {
              value_ids4[key + '|' + input_id] = select_value;
            }
          }
          ajaxObj4.inputs = value_ids4;
          jQuery(document).on('change', '#form4 [id^="wdform_'+ input_id +'_elemen"]', function() {
          var id = '';
          var changing_field_id = '';
          if( jQuery(this).attr("tagName") == 'INPUT' ) {
            if( jQuery(this).is(':checked') ) {
              id = jQuery(this).val();
            }
            if( jQuery(this).attr('type') == 'text' ) {
              id = jQuery(this).val();
            }
          }
          else {
            id = jQuery(this).val();
          }
          value_ids4[key + '|' + input_id] = id;
          jQuery.each( value_ids4, function( k, v ) {
            key_arr = k.split('|');
            if ( input_id == key_arr[2] ) {
              changing_field_id = key_arr[0];
              count = Object.keys(value_ids4).length;
              value_ids4 = unset_fields4( value_ids4, changing_field_id, count );
            }
          });
          ajaxObj4.inputs = value_ids4;
          ajax_similarity4( ajaxObj4, changing_field_id );
          });
        });
      });
      if ( update_first_field_id4 && !jQuery.isEmptyObject(ajaxObj4.inputs) ) {
        ajax_similarity4( ajaxObj4, update_first_field_id4 );
      }
      form_load_actions();
      	  }
    jQuery(function () {
      fm_script_ready4();
    });
        