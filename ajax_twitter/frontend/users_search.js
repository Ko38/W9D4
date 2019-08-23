const APIUtil = require('./api_util'); 

class UsersSearch {
  constructor($el, input, ul) {
    this.$el = $el;
    this.input = input;
    this.ul = ul;
    this.setUpButton();
    // APIUtil.searchUsers('breakfast').then( (thing) => {
    //   console.log("success");
    //   console.log(thing);
    // } ).catch((err) => {
    //   console.log("Error");
    //   console.log(err);
    // });
  }

  setUpButton() {
    $('.users-search button').click( ()=> {

      const userInput = this.$el.children('input').val();
      
      console.log(userInput);
      APIUtil.searchUsers(userInput).then( (users) => {
        // this.ul.append(`<li>${}`)
        this.ul.empty();
        for(let user of users){
          this.ul.append(`<li>${user.username}</li>`);
        }
      });
    });
  }

}

module.exports = UsersSearch;