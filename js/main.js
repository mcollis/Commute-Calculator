$( function( ) {
    $( '.slider-group .slider' ).each( function( i ) {
      var rel = $( this ).attr( 'rel' );
      var params = rel.split( '|' );
      var deflt = parseInt( $( this ).prev( '.default' ).find( '.amount' ).html() );
      $( this ).slider( {
        value: deflt,
        min: parseInt( params[0] ),
        max: parseInt( params[1] ),
        step: parseFloat( params[2] ),
        slide: function( event, ui ) {
          $( this ).prev( '.default' ).find( '.amount' ).html( ui.value );
          calculate();
        }
      } );
    } );
    $( '#car-size-select' ).change( function() {
      data.size = parseFloat( $( '#car-size-select' ).val() );
      calculate();
    } );
    data.size = parseFloat( $( '#car-size-select' ).val() );
    calculate();
} );
var data = {};
function calculateCosts( ) {
  data.parking = parseInt( $( '#parking .default .amount' ).html() );
  data.tolls = parseInt( $( '#tolls .default .amount' ).html() );
  data.roundtrip = parseInt( $( '#round-trip .default .amount' ).html() );
  data.workdays = parseInt( $( '#work-days .default .amount' ).html() );
  data.economy = parseInt( $( '#economy .default .amount' ).html() );
  data.gas = parseFloat( $( '#gas-price .default .amount' ).html() );
  $( '#gas-price .default .amount' ).html( data.gas.toFixed( 2 ) );

  data.totalMiles = data.roundtrip * data.workdays;
  data.totalGallons = data.totalMiles / data.economy;
  data.totalGas = data.totalGallons * data.gas;
  data.totalMaintenance = data.totalMiles * data.size;
}

function calculate( ) {
  calculateCosts();

  $( '#total-miles .default .amount' ).html( data.totalMiles );
  $( '#total-gallons .default .amount' ).html( data.totalGallons.toFixed( 1 ) );
  $( '#total-gas .default .amount' ).html( data.totalGas.toFixed( 2 ) );
  $( '#total-maintenance .default .amount' ).html( data.totalMaintenance.toFixed( 2 ) );

  var perMonth = data.parking + data.tolls + data.totalGas + data.totalMaintenance;
  var perDay = perMonth / data.workdays;
  var perYear = perMonth * 12;

  $( '#per-day-total .default .amount' ).html( perDay.toFixed( 2 ) );
  $( '#per-month-total .default .amount' ).html( perMonth.toFixed( 2 ) );
  $( '#per-year-total .default .amount' ).html( perYear.toFixed( 2 ) );
}
