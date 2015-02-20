/*
 *AUTHOR: MICAH KAMLA
 *NBA Content API version 1.0
*/


(function(window){
	'use-strict';
	
	var init = function(config){
		var settings = {
			callback: function(data){
				console.log('Success!');
				console.log(data);
			},
			error: function(data){
				console.log('There was an error with your request:');
				console.log(data);
			},
			team: 'rockets',//STRING, ['celtics','lakers','rockets',...] - valid teamname in NBA.com subdomain
			parameters: {
				type: null,// STRING, [video,story,photo_gallery] -- with no value, all content types are returned
				lang: null,// STRING, ['en','es'] -- default is 'en' (english)
				auth: null, // STRING, -- author parameter utilizes Drupal login for author ('jdoe', 'msmith', etc.)
				size: null,// INT, -- default = 10, maximum = 100
				offset: null,// INT, -- used for offsetting, or pagination
				taxonomy: {
					player: null,// STRING, -- 'Jordon, Michael'
					teams: null,// STRING, ['Rockets','Pelicans','Nuggets','Lakers','<Teamname>'] -- first letter capitalized of team name
					coach: null,// STRING, ['Jackson, Phill','McHale, Kevin','Karl, George']
					channels: null,//STRING -- used for filtering video only
					section: null,//STRING -- 'community', 'pre-game', etc. used for filtering stories or photo galleries only 
					tags: null//STRING -- filter using taxonomy tags in Drupal
				}
			}
		};

		if(config && typeof(config)==='object'){
			//extend config
			for (var i in config){
				if(settings.hasOwnProperty(i)){
					
					settings[i] = config[i];
				}
			}
		}

		console.log('Initiating content API');

		request(settings);
	};

	var request = function(ajaxOpts){
		var baseURL = 'http://nba.com/'+ajaxOpts.team+'/api/v1/json';

		var constructParameters = function(parameters){
			var string = '?';

			for(var i in parameters){
				switch(i){
					case 'type':
						if(parameters[i] !== null){
							string += 'type='+parameters[i]+'&';
						}
						break;
					case 'lang':
						if(parameters[i] !== null){
							string += 'lang='+parameters[i]+'&';
						}
						break;
					case 'auth':
						if(parameters[i] !== null){
							string += 'auth='+parameters[i]+'&';
						}
						break;
					case 'size':
						if(parameters[i] !== null){
							string += 'size='+parameters[i]+'&';
						}
						break;
					case 'offset':
						if(parameters[i] !== null){
							string += 'offset='+parameters[i]+'&';
						}
						break;
					case 'type':
						if(parameters[i] !== null){
							string += 'type='+parameters[i]+'&';
						}
						break;
					case 'taxonomy':
						if(parameters[i] !== null){
							for(var x in parameters[i]){
								if(parameters[i][x] !== null){
									parameters[i][x] = encodeURI(parameters[i][x]);
									//disable case sensitivity
									parameters[i][x] +='%20OR%20'+parameters[i][x].toLowerCase();
									switch(x){
										case 'player':
												string += 'player='+parameters[i][x]+'&';
											break;
										case 'teams':
												string += 'teams='+parameters[i][x]+'&';
											break;
										case 'coach':
												string += 'coach='+parameters[i][x]+'&';
											break;
										case 'channels':
												string += 'channels='+parameters[i][x]+'&';
											break;
										case 'section':
												string += 'section='+parameters[i][x]+'&';
											break;
										case 'tags':
												string += 'tags='+parameters[i][x]+'&';
											break;
										default:
											//DEFAULT
											break;
									}
								}
							}
						}
						break;
					default:
						//DEFAULT
						break;
				}
			}

			//if last character of string is an ampersand, trim it
			if(string.slice(-1)==='&'){
				string = string.slice(0,(string.length-1));
			}

			//return string value
			return string;
		};

		var ajax = function(url){
			var httpRequest;

			if(window.XMLHttpRequest){
				httpRequest = new XMLHttpRequest();
			} else if (window.ActiveXObject){
				try {
					httpRequest = new ActiveXObject('Msxml2.XMLHTTP');
				}
				catch(e){
					try {
						httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
					}
					catch(e){}
				}
			}

			if(!httpRequest){
				console.log('AJAX Error: No request object found.');
				return false;
			}

			httpRequest.onreadystatechange = function(){
				if(httpRequest.readyState === 4){
					if(httpRequest.status===200){
						ajaxOpts.callback(httpRequest.responseText);
					} else {
						ajaxOpts.error(httpRequest.responseText);
					}
				}
			};

			httpRequest.open('GET',url);
			httpRequest.send();
		};

		ajax(baseURL+constructParameters(ajaxOpts.parameters));
	};

	//public
	var _public =  {
		init: init
	};

	//export
	if(!window.contentAPI){
		window.contentAPI = _public;
	}

}(window));