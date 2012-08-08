$( function( ) {
    $( '.slider-group .slider' ).each( function( i ) {
      var rel = $( this ).attr( 'rel' );
      var params = rel.split( '|' );
      var deflt = parseInt( $( this ).prev( '.default' ).find( '.amount' ).html() );
      $( this ).slider( {
        value: deflt,
        min: parseInt( params[0] ),
        max: parseInt( params[1] ),
        step: parseInt( params[2] ),
        slide: function( event, ui ) {
          $( this ).prev( '.default' ).find( '.amount' ).html( ui.value );
          calculate();
        }
      } );
    } );
    calculate();
} );
var data = {};
function calculateFixed( ) {
  data.purchase = parseInt( $( '#purchase .default .amount' ).html() );
  data.duration = parseInt( $( '#duration .default .amount' ).html() );
  data.resale = parseInt( $( '#resale .default .amount' ).html() );
  data.insurance = parseInt( $( '#insurance .default .amount' ).html() );
  data.registration = parseInt( $( '#registration .default .amount' ).html() );
  data.inspection = parseInt( $( '#inspection .default .amount' ).html() );

  data.fixedTotal = ( ( data.purchase - data.resale ) / ( data.duration * 365 ) ) + ( ( data.insurance * 12 ) / 365 ) + ( ( data.registration / 2 ) / 365 ) + ( data.inspection / 365 );
  $( '#fixed-total .default .amount' ).html( data.fixedTotal.toFixed( 2 ) );
}
function calculateOperating( ) {
  data.gas = parseInt( $( '#gas .default .amount' ).html() );
  data.parking = parseInt( $( '#parking .default .amount' ).html() );
  data.tolls = parseInt( $( '#tolls .default .amount' ).html() );
  data.tires = parseInt( $( '#tires .default .amount' ).html() );
  data.repairs = parseInt( $( '#repairs .default .amount' ).html() );
  data.maintenance = parseInt( $( '#maintenance .default .amount' ).html() );
  data.tickets = parseInt( $( '#tickets .default .amount' ).html() );

  data.operatingTotal = ( ( data.gas * 52 ) / 365 ) + ( ( data.parking * 12 ) / 365 ) + ( ( data.tolls * 12 ) / 365 ) + ( data.tires / 365 ) + ( data.repairs / 365 ) + ( data.maintenance / 365 ) + ( data.tickets / 365 );
  $( '#operating-total .default .amount' ).html( data.operatingTotal.toFixed( 2 ) );
}
function calculate( ) {
  calculateFixed();
  calculateOperating();

  var perDay = data.fixedTotal + data.operatingTotal;
  var perMonth = perDay * 30;
  var perYear = perDay * 365;

  $( '#per-day-total .default .amount' ).html( perDay.toFixed( 2 ) );
  $( '#per-month-total .default .amount' ).html( perMonth.toFixed( 2 ) );
  $( '#per-year-total .default .amount' ).html( perYear.toFixed( 2 ) );
}
