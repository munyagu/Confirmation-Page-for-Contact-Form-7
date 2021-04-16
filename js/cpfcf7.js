window.onload = function () {
    var wpcf7 = document.querySelector( '.wpcf7' );
    wpcf7.addEventListener( 'wpcf7submit', function( event ) {
        if('cpfcf7_confirm' === event.detail.status){
            var elements = document.querySelectorAll( '.wpcf7-form input:not(.wpcf7-submit),.wpcf7-form select,.wpcf7-form textarea' );
            elements.forEach(function(element) {
                if( 'hidden' !== element.type ) {
                    cpfcf7_disable_element(element);
                }

            });
        }
    }, false );
}
function cpfcf7_disable_element( element ) {

    switch(element.tagName){
        case 'SELECT':
            element.disabled = true;
            break;

        case 'INPUT':
            if('radio' === element.type || 'checkbox' === element.type){
                element.disabled = true;
            } else {
                element.readOnly = true;
            }
            break;

        case 'TEXTAREA':
            element.readOnly = true;

        default:
            break;
    }

}
