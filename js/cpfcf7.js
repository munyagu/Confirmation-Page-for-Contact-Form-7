window.onload = function () {
    var wpcf7 = document.querySelector( '.wpcf7' );

    wpcf7.addEventListener( 'wpcf7submit', function( event ) {
        if('cpfcf7_confirm' === event.detail.status){

            cpfcf7_disable_element(true);
            var input = document.querySelector('input[name="_cpfcf7_confirm"]');
            input.value = '0';

        }
    });

    wpcf7.addEventListener( 'wpcf7invalid', function( event ) {
        cpfcf7_init_form();
    });
    wpcf7.addEventListener( 'wpcf7spam', function( event ) {
        cpfcf7_init_form();
    });
    wpcf7.addEventListener( 'wpcf7mailsent', function( event ) {
        cpfcf7_init_form();
    }, false);
    wpcf7.addEventListener( 'wpcf7mailfailed', function( event ) {
        cpfcf7_init_form();
    });

}

function cpfcf7_init_form(){
    var input = document.querySelector('input[name="_cpfcf7_confirm"]');
    input.value = '1';
    cpfcf7_disable_element(false);
}

function cpfcf7_disable_checkbox( element, disable ){

    if(disable){
        element.addEventListener('click', cpfcf7_disable_click_event);
    }else{

        element.removeEventListener('click', cpfcf7_disable_click_event);
    }

}

function cpfcf7_disable_click_event(event){
    event.preventDefault();
    return false;
}

function cpfcf7_disable_element( disable ) {

    var elements = document.querySelectorAll( '.wpcf7-form input:not(.wpcf7-submit),.wpcf7-form select,.wpcf7-form textarea' );
    elements.forEach(function(element) {
        if( 'hidden' !== element.type ) {
            switch(element.tagName){
                case 'SELECT':
                    element.disabled = disable;
                    break;

                case 'INPUT':

                    if('radio' === element.type) {
                        if( ! element.checked ) {
                            element.disabled = disable;
                        }
                    } else if('checkbox' === element.type) {
                        cpfcf7_disable_checkbox(element, disable);
                        if( ! element.checked ) {
                            element.disabled = disable;
                        }
                    } else {
                        element.readOnly = disable;
                    }

                    break;

                case 'TEXTAREA':
                    element.readOnly = disable;
                    break;

                default:
                    break;
            }
        }
    });

}
