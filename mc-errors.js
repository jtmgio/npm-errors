module.exports = McErrors();

/**
	3 levels of errors
		error
		message
		messageDetails - [{ field, message }]

	Error structure from the backend service
	{
		"timestamp":1456002622628,
		"status":400,
		"error":"Bad Request",
		"message":"Invalid paging parameters",
		"messageDetails":[{"field":"pageNumber","message":"Page number is invalid. Max page number is 6."}],
		"path":"/directory-search/v1/directory-search/results/f2b0a59b-0d52-4ec1-add6-f4eea1370fa2",
		"parameters":{"pageSize":["15"],"pageNumber":["7"]}
	}

	General format
		{ status : '', errors : [{ message : '' }] }
**/

/*
**-------------------------------------------------------------------------------------
** METHOD NAME - McErrors
** DESC - this will return the functions to use with the module
**-------------------------------------------------------------------------------------
*/
function McErrors(){
	return {
		formatErrors : fnFormatErrors,
		createErrorBlock : fnCreateErrorBlock
	}
}
/*
**-------------------------------------------------------------------------------------
** METHOD NAME - fnCreateErrorBlock
** DESC - This will create an error block
**-------------------------------------------------------------------------------------
*/
function fnCreateErrorBlock( status_code, error, message, dirname ){
	return JSON.stringify({
		"timestamp": new Date().getTime(),
		"status": status_code,
		"error":error,
		"message": message,
		"path": dirname
	});
}
/*
**-------------------------------------------------------------------------------------
** METHOD NAME - fnFormatErrors
** PARAM - {string} errorObj the error response from the backend service call
** DESC - this will determine which format to use for the errors
**-------------------------------------------------------------------------------------
*/

function fnFormatErrors( errorObj ){
	var errorObj = JSON.parse( errorObj );
	if( typeof errorObj.messageDetails !== "undefined" && errorObj.messageDetails.length )
		return fnFormatArrayErrors( errorObj );
	if( typeof errorObj.message !== "undefined" && errorObj.message != "" )
		return fnFormatStringErrors( errorObj );
	if( typeof errorObj.error !== "undefined" )
		return fnFormatStringErrors( errorObj );
}

/*
**-------------------------------------------------------------------------------------
** METHOD NAME - fnFormatStringErrors
** PARAM - {object} errorObj the parsed error response from the backend service call
** DESC - this will format the string
**-------------------------------------------------------------------------------------
*/

function fnFormatStringErrors( errorObj ){
	return {
		status : errorObj.status,
		errors : [{ message : errorObj.message }]
	};
}

/*
**-------------------------------------------------------------------------------------
** METHOD NAME - fnFormatArrayErrors
** PARAM - {object} errorObj the parsed error response from the backend service call
** DESC - this will format the array errors
**-------------------------------------------------------------------------------------
*/

function fnFormatArrayErrors( errorObj ){
	var messages = [];
	errorObj.messageDetails.forEach(function( detail, idx ){
		if( typeof detail == "string" ) {
			messages.push( { message : detail } );
			return;
		}
		messages.push( detail );
	});
	return {
		status : errorObj.status,
		errors : messages
	};
}

/*
**-------------------------------------------------------------------------------------
** METHOD NAME - fnFormatObjectErrors
** PARAM - {object} errorObj the parsed error response from the backend service call
** DESC - this will format the object errors
**-------------------------------------------------------------------------------------
*/

function fnFormatObjectErrors( errorObj ){
	//TODO - fill in when needed
}
