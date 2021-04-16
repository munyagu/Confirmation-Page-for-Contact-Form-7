<?php

namespace Barbwire;

use WPCF7_Submission;

class CPfCF7 {

    const CONFIRMING_FLAG_FIELD_NAME = '_cpfcf7_confirm';

    private static $is_status_confirm = false;

    public static function init(){



        add_filter( 'wpcf7_form_hidden_fields', [ __CLASS__, 'wpcf7_form_hidden_fields' ] );

        // add_filter( 'wpcf7_before_send_mail', [ __CLASS__, 'wpcf7_before_send_mail' ], 10, 3 );

        add_filter( 'wpcf7_skip_mail', [ __CLASS__, 'wpcf7_skip_mail' ], 10, 2 );


        add_filter( 'wpcf7_feedback_response', [ __CLASS__, 'wpcf7_feedback_response' ] );


    }



    /**
     * Add hidden fields to form.
     * @param $hidden_fields hidden fields.
     * @return hidden fields.
     */
    public static function wpcf7_form_hidden_fields( $hidden_fields ){

        $hidden_fields[self::CONFIRMING_FLAG_FIELD_NAME] = '1';

        return $hidden_fields;
    }

    public static function wpcf7_skip_mail( $skip_mail, $contact_form ){

        if( isset($_POST[ self::CONFIRMING_FLAG_FIELD_NAME ]) && '1' === $_POST[ self::CONFIRMING_FLAG_FIELD_NAME ] ) {
            $skip_mail = true;
            self::$is_status_confirm = true;
        }



        return $skip_mail;
    }

    public static function wpcf7_before_send_mail( $contact_form, $abort, $submission ){

        $abort = true;

        return $abort;
    }



    public static function wpcf7_feedback_response( $response ){

        // error_log(print_r($response,true),3,__DIR__ . '/log.txt');

        if( self::$is_status_confirm ) {
            $response['status'] = 'cpfcf7_confirm';
            $response['message'] = '入力内容をご確認ください。';
        }


        return $response;
    }
}