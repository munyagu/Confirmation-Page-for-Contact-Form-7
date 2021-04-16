<?php
/**
 * Plugin Name:       Confirmation Page for Contact Form 7
 * Plugin URI:
 * Description:       Contact Form 7 displays a confirmation page before sending.
 * Version:           0.0.1
 * Requires at least: 5.5
 * Requires PHP:      7.1
 * Author:            munyagu
 * Author URI:        https://munyagu.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Text Domain:       cp-for-cf7
 * Domain Path:       /languages
 */

include 'inc/CPfCF7.php';

use Barbwire\CPfCF7;


CPfCF7::init();

add_action( 'wp_enqueue_scripts', 'cpfcf7_wp_enqueue_scripts' );

function cpfcf7_wp_enqueue_scripts(){
    wp_enqueue_script( 'cpfcf7', plugins_url( 'js/cpfcf7.js', __FILE__ ) , [], '999', true );
    wp_enqueue_style( 'cpfcf7', plugins_url( 'css/cpfcf7.css', __FILE__ ) , [], '999' );
}