
/* ======= Model ======= */

var model = {
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Cat1',
            imgSrc : 'img/cat1.jpg'
        },
        {
            clickCount : 0,
            name : 'Cat2',
            imgSrc : 'img/cat2.jpg'
        },
        {
            clickCount : 0,
            name : 'Cat3',
            imgSrc : 'img/cat3.jpg'
        },
        {
            clickCount : 0,
            name : 'Cat4',
            imgSrc : 'img/cat4.jpg'
        },
        {
            clickCount : 0,
            name : 'Cat5',
            imgSrc : 'img/cat5.jpg'
        }
    ]
};

/*
console.log(model.currentCat);
for(cat in model.cats){
  console.log(model.cats[cat].name);
}
*/

var octopus = {

    init: function() {
        console.log("init function of octopus")
        console.log(model.cats[0]);
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];
        console.log(model.currentCat);
        // tell our views to initialize
        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        console.log(model.currentCat);
        return model.currentCat;
    },

    getCats: function() {
        console.log(model.cats);
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;

    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    }
};


/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        console.log("render function of cat view");
        var currentCat = octopus.getCurrentCat();
        console.log("the render function current cat is " + currentCat);
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        console.log("cat list view initial function")
        this.catListElem = document.getElementById('cat-list');
        console.log(this.render);
        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        console.log("render function of cat list view ")
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();
        console.log("the render function of catlist" + cats);

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

// make it go!
octopus.init();
