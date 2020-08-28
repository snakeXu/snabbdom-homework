// import { init, h, thunk } from 'snabbdom'
import { h } from 'snabbdom/build/package/h';
import { init } from 'snabbdom/build/package/init';
import { classModule } from 'snabbdom/build/package/modules/class';
import { styleModule } from 'snabbdom/build/package/modules/style'
import { propsModule } from 'snabbdom/build/package/modules/props'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'

let totalHeight = 0
let vnode
let initData = [
  { rank: 1, title: 'The Shawshank Redemption', desc: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', elmHeight: 0 },
  { rank: 2, title: 'The Godfather', desc: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', elmHeight: 0 },
  { rank: 3, title: 'The Godfather: Part II', desc: 'The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.', elmHeight: 0 },
  { rank: 4, title: 'The Dark Knight', desc: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.', elmHeight: 0 },
  { rank: 5, title: 'Pulp Fiction', desc: 'The lives of two mob hit men, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', elmHeight: 0 },
  { rank: 6, title: 'Schindler\'s List', desc: 'In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.', elmHeight: 0 },
  { rank: 7, title: '12 Angry Men', desc: 'A dissenting juror in a murder trial slowly manages to convince the others that the case is not as obviously clear as it seemed in court.', elmHeight: 0 },
  { rank: 8, title: 'The Good, the Bad and the Ugly', desc: 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.', elmHeight: 0 },
  { rank: 9, title: 'The Lord of the Rings: The Return of the King', desc: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.', elmHeight: 0 },
  { rank: 10, title: 'Fight Club', desc: 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more...', elmHeight: 0 },
]
let l = initData.length
function add () {
	let n = Math.floor(Math.random() * 10)
	let newOne = [{
		rank: l + 1, 
		title: initData[n].title,
		desc: initData[n].desc,
		elmHeight: initData[n].elmHeight
	}]
	l+=1
	initData = newOne.concat(initData)
	render()
}
function del (i) {
	// initData = initData.filter(item => {
	// 	return item.rank !== i
	// })
	initData.forEach((item, index) => {
		if (item.rank === i) {
			initData.splice(index, 1)
		}
	})
	render()
}
function sort (attr) {
	initData = initData.sort((a, b) => {
		if (a[attr] > b[attr]) {
	      return 1
	    }
	    if (a[attr] < b[attr]) {
	      return -1
	    }
	    return 0
	})
	// console.log(initData)
	render()
}
function render () {
  initData = initData.reduce((acc, m) => {
    var last = acc[acc.length - 1]
    m.offset = last ? last.offset + last.elmHeight + 8 : 8
    return acc.concat(m)
  }, [])
  totalHeight = initData.length === 0
    ? 0
    : initData[initData.length - 1].offset + initData[initData.length - 1].elmHeight
  vnode = patch(vnode, view())
}
function createli (data) {
	return h('li',[
		h('span.rank', data.rank),
		h('span.title', data.title),
		h('span.desc', data.desc),
		h('i.del', { on: { click: [del, data.rank] } }, 'X')
	])
}
function view () {
	return h('div.main', [
		h('h1', 'Top ten movies'),
		h('div.clibtn',[
			h('div.left', [
				h('span', 'Sort by:'),
				h('button', { on: { click: [sort, 'rank'] } }, 'Rank'),
				h('button', { on: { click: [sort, 'title'] } }, 'Title'),
				h('button', { on: { click: [sort, 'desc'] } }, 'Description')
			]),
			h('button', { on: { click: add } }, 'Add')
		]),
		h('ul.listnone', initData.map(createli))
	])
}
let container = document.getElementById('app')
let patch = init([ // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule // attaches event listeners
])
vnode = patch(container, view ())