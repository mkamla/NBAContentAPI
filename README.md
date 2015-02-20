
#NBA Content API Javascript Library
Unofficial JavaScript client library for the [NBA's Content API](https://nbateams.atlassian.net/wiki/pages/viewpage.action?pageId=589949).

This library supports JSON API calls. XML API calls will be supported in future versions.

##Installation


##Usage

Include minified contentAPI JavaScript file in the head of your HTML document.

	<script type="text/javascript" src="../dist/contentAPI.min.js"></script>

Make an API call for the most recent content

```javascript

//Set API options
var options = {
	team: 'lakers'
};

//Make API call
contentAPI.init(options);
```

###CORS

Cross Origin Resource Sharing (CORS) prevents AJAX or XMLHttpRequest calls from domains outside of the NBA's domain (http://nba.com). API calls must be made from documents hosted on nba.com or their subdomains. Content Delivery Networks (CDN) hosted by Turner, the NBA or third-parties **do not** fall within the same origin policy.

More information on [CORS]().


##Methods
###contentAPI.init
Public function that initializes the AJAX content API call. Function accepts a Javascript object as an argument.

```javascript
var options = {
	team: "rockets",
	parameters: {
		type: "video"
	}
};

contentAPI.init(options)
```

##Options

Configurable options listed below are accepted as properties of a JavaScript object by the `contentAPI.init()` method.

| **Property** | **Required** | **Type** | **Description** |
| -------- | -------- | ---- | ----------- |
| **success** | No | Function | function to be called after a successful AJAX request |
| **error** | No | Function | function to be called after a failed AJAX request |
| **team** | Yes | String | string |
| **parameters** | No | Object | Object containing request parameters |

---
###success
**Optional**

Function to be called after a successful AJAX request. Accepts JSON data object returned from the server.

**Default:**

```javascript
function(rsp){
	console.log('Success!');
	console.log(rsp);
}
```

**Usage:**
```javascript
contentAPI.init({
	success: function(rsp){
		//do something with API response
		console.log(rsp);
	}
});
```

---
###error
**Optional**

Function to be called after a failed AJAX request. Accepts error messaging from server.

**Default:** 

```javascript
function(rsp){
	console.log('There was an error with your request:');
	console.log(rsp);
}
```

**Usage:**

```javascript
contentAPI.init({
	error: function(rsp){
		//do something with API response
		console.log(rsp);
	}
});
```

---
###team
**Required**

String that defines which NBA team content API to request from. This parameter is required for all requests to the content API.

**Default:** `"rockets"`

**Usage:**

```javascript
contentAPI.init({
	team: "lakers"
});
```

---
###parameters
**Optional**

Object used to construct the API call.

**Default:** 

```javascript
{
	type: null,
	lang: null,
	auth: null,
	size: null,
	offset: null,
	taxonomy: {
		player: null,
		teams: null,
		coach: null,
		channels: null,
		section: null,
		tags: null
	}
}
```

**Usage:**

```javascript
contentAPI.init({
	parameters: {
		type: "story",
		lang: "en",
		auth: "jsmith",
		taxonomy: {
			player: "Jordan, Michael",
		}
	}
});
```

---
####`type`

Optional

**Type:** String

Filter content by content types such as, `story`, `video`, `photo_gallery`. When the value is absent, all content types are returned.

**Example Value:** story

---
####`lang`

Optional

**Type:** String

Two letter abbreviation that specifies the desired language. When the value is absent, the default language is set to English.

**Example Value:** ru

---
####`auth`

Optional

**Type:** String

Designated Drupal name of a specific content author. Naming conventions generally follow the concatenation of first initial, last name.

**Example Value:** jdoe

---
####`size`

Optional

**Type:** Integer

Specifies the number of returned content items to try and return during one API call. Default value is 10. Maximum value is 100. This value is best thought of as a limit to the number of content items to return.

**Example Value:** 20

---
####`offset`

Optional

**Type:** Integer

Specifies the offset of returned content items. This number correlates to the **size** property. Offset is generally used to paginate through content items.

**Example Value:** 2

---
####`taxonomy`

+ `player`

	Optional

	**Type:** String

	Returns content items tagged with the specified player name. Follows last name first naming convention.

	**Example Value:** Jordan, Michael


+ `teams`
		
	Optional

	**Type:** String

	Returns content with the specified NBA teams tagged. Naming convention requires the first letter of the team name be capitalized.

	**Example Value:** Lakers


+ `coach`
		
	Optional

	**Type:** String

	Returns content items tagged with the specified coach name. Follows last name first naming convention.

	**Example Value:** Jackson, Phil


+ `channels`
		
	Optional

	**Type:** String

	Returns content items in a specified channel. Filters video content types only.

	**Example Value:** Highlights


+ `section`
		
	Optional

	**Type:** String

	Returns content items in a specified section. Filters story and photo gallery content types only.

	**Example Value:** News


+ `tags`
		
	Optional

	**Type:** String

	Filter content using taxonomy tags (freestyle tags) in Drupal. Tags are not case sensitive.

	**Example Value:** press release



###Example Response
```javascript
{
	"node": {
		"16619": {
			"type": "story",
			"title": "Rockets Acquire K.J. McDaniels and Pablo Prigioni",
			"url": "http: //www.nba.com/rockets/news/rockets-acquire-k.j.-mcdaniels-and-pablo-prigioni",
			"created": "19 Feb 2015 11:08:00 UTC",
			"author": "John Smith",
			"summary": "Houston Conveys Isaiah Canaan, Alexey Shved and Second Round Picks",
			"body": "<p>HOUSTON - Houston Rockets General Manager Daryl Morey announced today that the team has acquired K.J. McDaniels and Pablo Prigioni in trades with the New York Knicks and Philadelphia 76ers.&nbsp; In exchange for McDaniels, the Rockets sent Isaiah Canaan and a 2015 second round pick to Philadelphia.&nbsp; Houston held the lesser of the 2015 Minnesota Timberwolves and Denver Nuggets second round picks, and will convey it to Philadelphia as part of the deal.&nbsp; In exchange for Prigioni, the Rockets sent Alexey Shved and their 2017 and 2019 second round picks to New York.</p><p>McDaniels (6-6, 200, Clemson) has averaged 9.2 points, 3.8 rebounds, 1.3 assists and 1.3 blocks in 52 appearances (15 starts) with the Philadelphia 76ers this season. The first year swingman recorded season-highs of 21 points and 13 rebounds against the Dallas Mavericks on Nov. 29, 2014.&nbsp; In his final season at Clemson, he was named ACC Defensive Player of the Year and became the only college player with 600+ points, 100+ blocks and 40+ 3FGM in a single season in the last twenty years.&nbsp; McDaniels was selected by Philadelphia with the second pick of the second round of the 2014 NBA Draft (32nd overall).</p><p>Prigioni (6-3, 180, Argentina) has averaged 4.7 points, 2.4 assists, 1.9 rebounds and 1.2 steals in 43 games (three starts) for the New York Knicks this season. The third-year veteran holds NBA career-averages of 3.9 points, 3.0 assists, 1.9 rebounds and 1.0 steals in 17.9 minutes per game in 187 total games (48 starts).&nbsp; Prigioni originally signed with the Knicks on Jul. 17, 2012 after an extensive international career that included an appearance on the 2008 Argentinian National Team that captured Bronze in the Beijing Summer Olympics and the 2012 team in the London Summer Olympics.&nbsp; Prigioni originally went undrafted in the 1999 NBA Draft.</p><p>Canaan (6-0, 201, Murray State) has appeared in 23 games this season (including nine starts) for the Rockets and recorded 6.7 points, 1.3 assists and 1.4 rebounds per game in 15.6 minutes per game.&nbsp; A second year player, Canaan holds career averages of 5.4 points, 1.2 rebounds and 1.1 assists in 13.2 minutes per game in 47 career appearances. He was selected by the Rockets with the fourth pick of the second round (34th overall) of the 2013 NBA Draft.</p><p>Shved (6-6, 187, Russia) has averaged 7.6 points, 1.9 assists and 1.0 rebounds per game in 26 appearances with the Philadelphia 76ers and Houston Rockets this season.&nbsp; The third year pro went undrafted in the 2010 NBA Draft and originally signed as free agent with the Minnesota Timberwolves on Jul. 23, 2012.&nbsp; In 166 career appearances (including 16 starts), Shved holds career averages of 6.7 points, 2.4 assists and 1.7 rebounds per game.</p>",
			"thumbnail": "http://i.cdn.turner.com/drp/nba/rockets/sites/default/files/styles/stream/public/tradedeadlinehorizontal.jpg?itok=WyHjHu2R",
			"tagging": {
				"players": ["Canaan, Isaiah","Shved, Alexey"],
				"teams": ["Rockets"],
				"section":["news"]
			}
		}
	}
}
```



