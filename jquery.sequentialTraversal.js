/*
Sequential methods flatten the DOM to allow linear directional
traversal from any given node, such that elements higher up the DOM
tree can be filtered.

The methods provided emulate these 'non-sequential',
ie DOM hierarchy-sensitive, relative traversal methods:

sequentialNext
sequentialNextAll
sequentialPrev
sequentialPrevAll

Example:
<ul>
	<li>
		<span id="span1">Hit me</span>
	</li>
	<li>
		<span id="span2">Hit me</span>
	</li>
	<li>
		<span id="span3">Hit me</span>
	</li>
	<li>
		<span id="span4">Hit me</span>
	</li>
</ul>

$('#span2').sequentialNextAll('span');
>> ['#span3','#span4']
*/

void function jQuerySequentialTraversalInit($){
	// Define our target methods and abstract their properties
	var methods = {
		next:    {backwards:0,multiple:0},
		nextAll: {backwards:0,multiple:1},
		prev:    {backwards:1,multiple:0},
		prevAll: {backwards:1,multiple:1}
	};
	// New super function to define new functionality.
	// props object argument defines properties established above,
	function sequentialCrawl(props, selector){
		// Current element
		var	$marker = this;
		var marker  = this[0];
		// Grab the whole DOM, reversed if we're going backwards
		var $all    = props.backwards ? [].reverse.apply($('*')) : $('*');
		var all     = $all.get();
		// Eventual return scope
		var $match  = $();
		// Whether we've hit the matched element, useful to avoid pointless iteration
		var passed  = false;

		// Iterate through flattened DOM
		$all.each(function sequentialIteration(i, x){
			var $x = $(x);

			// Do we already have the only match we need?
			if($match.length && !props.multiple){
				return false;
			}

			// Where are we in relation to the marker?
			if(!passed){
				// ...is this it?
				if(x === marker){
					passed = true;
				}

				return;
			}

			// If we're going backwards, we don't want to include parents
			if(props.backwards && $.contains(x, marker)){
				return;
			}

			// Match if we need to
			if(!selector || $x.is(selector)){
				$match = $match.add($x);
			};
		});

		return $match;
	}

	// New bindings
	$.each(methods, function bindNew(method){
		$.fn['sequential' + method.charAt(0).toUpperCase() + method.slice(1)] = function sequentialTest(){
			var args = [].unshift.call(arguments, methods[method]);

			return sequentialCrawl.apply(this, arguments);
		}
	});
}(jQuery);
