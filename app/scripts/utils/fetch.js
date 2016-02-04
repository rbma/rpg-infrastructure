'use strict';

const q = require('q');

module.exports = function(url, json){

	let request = new XMLHttpRequest();
	let deferred = q.defer();

	request.open('GET', url, true);

	request.onload = function(){
		if (request.status >= 200 && request.status < 400){

			if (json === true){
				let data = JSON.parse(request.responseText);
				deferred.resolve(data);
			}
			else{
				deferred.resolve(request.responseText);
			}
			
		}

		else{
			deferred.reject(err);
		}

	};

	request.onerror = function(err){
		deferred.reject('Err', err);
	};

	request.send();

	return deferred.promise;

};
