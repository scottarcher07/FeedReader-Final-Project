/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* This test loops through each feed*/
         it('URL is defined and not empty', function() {
             allFeeds.forEach(function(feed) {
             feedLink = feed.url;
             expect(feedLink).toBeDefined();
             expect(feedLink.length).not.toBe(0);
             });
         });
        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name is defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                feedName = feed.name;
                expect(feedName).toBeDefined();
                expect(feedName.length).not.toBe(0);
            });
        });
    });
    /* This is  "The menu" test suite  */
        /* This test ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        describe('menu', function() {
            it('hidden menu', function () {
                expect($('.menu-hidden').is(':visible')).toBe(true);
            });
            /* This test ensures the menu changes
             * visibility when the menu icon is clicked. This test
             * should have two expectations: does the menu display when
             * clicked and does it hide when clicked again.
             */

             /* exception 1 */
            it('menu visible on click', function () {
                $('a.menu-icon-link').trigger('click');
                expect($('.menu-hidden').is(':visible')).toBe(false);
            });
            /* exception 2 */
            it('hidden by clicking again ', function () {
                $('a.menu-icon-link').trigger('click');
                expect($('.menu-hidden').is(':visible')).toBe(true);
            });
        });
    /* This is the "Initial Entries" test suite */
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         describe('Initial Entries', function() {
                beforeEach(function(done) {
                    loadFeed(0, done);
                });

                it('initial element is there', function(){
                    expect($('.feed .entry').length).toBeGreaterThan(0);
                });
            });
    /* This is the "New Feed Selection" test suite
        /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        describe('New Feed Selection', function(){
            var testfeed;
            beforeEach(function(done) {
                loadFeed(0, function() {
                    testfeed = $('.feed').html();
                    loadFeed(1, done);
                });
            });

            it('has been loaded', function(){
                expect($('.feed').html()).not.toEqual(testfeed);
            });
        });
 }());
