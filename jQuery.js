// Login Button
$(document).ready(function(){
    $("#myBtn").click(function(){
        $("#myModal").modal();
    });
});

// Login Function
var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
var username = document.getElementById("test1").value;
var password = document.getElementById("test2").value;
if ( username == "user" && password == "user"){
		alert ("Login successfully");
		window.location.href = "/home.html"; // Redirecting to other page.
		return false;
	}
	else{
	attempt --;// Decrementing by one.
	alert("You have left "+attempt+" attempt;");
// Disabling fields after 3 attempts.
if( attempt == 0){
	document.getElementById("username").disabled = true;
	document.getElementById("password").disabled = true;
	document.getElementById("submit").disabled = true;
	return false;
}
}
}

// Card
$card	= $( '.card' );

$card.on( 'mousemove', function( e ) {
	var $this		= $( this ),
		eX			= e.offsetX,
		eY			= e.offsetY,
		dim			= this.getBoundingClientRect();
		w			= dim.width/2,
		h			= dim.height/2,
		tiltLimit	= 15,
		posX		= ( h - eY ) * ( tiltLimit / h );
		posY		= ( w - eX ) * ( tiltLimit / w ) * -1;

	$this.find( 'a' ).css({
		'transform': 'rotateX( ' + posX + 'deg ) rotateY( ' + posY + 'deg )',
		'box-shadow': ( posY * -1 ) + 'px ' + ( posX + 14 ) + 'px 34px 0 rgba( 0, 0, 0, 0.1 )'
	});
	
	$this.find( '.highlight' ).css({
		'opacity': 1,
		'transform': 'translate3d( ' + ( posX * -4 ) + 'px, ' + ( posY * -4 ) + 'px, '  + '0 )'
	});
});

$card.mouseleave( function( e ) {
	var $el = $( this ).find( 'a' );

	$el.removeAttr( 'style' ).addClass( 'hover--ending' );

	setTimeout( function() {
		$el.removeClass( 'hover--ending' );
	}, 500 );
	
	$el.find( '.highlight' ).removeAttr( 'style' );
});







