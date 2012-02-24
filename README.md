jQuery sequential traversal
===========================

*Like [NodeIterator](http://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html#Iterator-overview), but less [shit](http://ejohn.org/blog/unimpressed-by-nodeiterator/).*

New relative traversal methods for jQuery that flatten the DOM into a sequential list to take into account elements higher up the tree. Useful for crawling documents whose exact DOM structure you may be unfamiliar with (ie. for portable plugin development) or may be subject to change (ie. you need to build logical functionality for a document that is still being designed or built), while sticking to the fundamental semantics of ordered sequence.

Because any DOM traversal will be inherently sequential unless the traversal is relative to a particular node, the exposed methods offer sequential versions of the following native jQuery traversal methods:

<table>
  <tr>
    <th>Sequential method</th>
		<th>Native equivalent</th>
  </tr>
  <tr>
    <td><code>.sequentialNext</code></td>
		<td><code><a href="http://api.jquery.com/next/">.next</a></code></td>
  </tr>
  <tr>
    <td><code>.sequentialNextAll</code></td>
		<td><code><a href="http://api.jquery.com/nextAll/">.nextAll</a></code></td>
  </tr>
  <tr>
    <td><code>.sequentialPrev</code></td>
		<td><code><a href="http://api.jquery.com/prev/">.prev</a></code></td>
  </tr>
  <tr>
    <td><code>.sequentialPrevAll</code></td>
		<td><code><a href="http://api.jquery.com/prevAll/">.prevAll</a></code></td>
  </tr>
</table>

### Wait a minute. Those methods already are sequential. ###

You might prefer the term 'linear' to 'sequential'. They key point is that it isn't concerned with nesting: with sequential traversal, one node is after another if it's opening tag stands later in the document order - the normal hierarchical methods won't consider elements that stand next to or above the relative node's parent.

If you prefer W3's language (some people do), these method is more akin to [NodeIterator](http://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html#Iterator-overview), while nearly all other methods follow [TreeWalker](http://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html#TreeWalker). 

### Example. ###

<pre>
&lt;ul&gt;
	&lt;li&gt;
		&lt;label for="name"&gt;Name&lt;/label&gt;
		&lt;input id="name"&gt;&lt;/input&gt;
	&lt;/li&gt;
	&lt;li&gt;
		&lt;label for="email">Email&lt;/label&gt;
		&lt;input id="email">&lt;/input&gt;
	&lt;/li&gt;
&lt;/ul&gt;
</pre>

In the case above, `$('#name').next('input')` won't return anything, because `#name` is its containers last child, but `$('#name').sequentialNext('input')` will return `#email` because it's the next matching element in the sequential order of the document.

## Gotchas and TODOs ##

- Reverse order traversal methods (`.prev` and `.prevAll`) necessarily return their own parents. This is counter-intuitive for most applications, but expensive to circumvent.
- Need to implement `.sequentialNextUntil` and `.sequentialPrevUntil`.