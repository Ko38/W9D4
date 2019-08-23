const APIUtil = require('./api_util');

class FollowToggle {
  
  constructor(userId, initialFollowState) {
    this.userId = userId;
    this.initialFollowState = initialFollowState;
    this.render();
    $('.follow-toggle').click(this.handleClick.bind(this));
  }

  render() {
    let text = this.initialFollowState ? "Unfollow!" : "Follow!";
    $('.follow-toggle').text(text);
    $(".follow-toggle").removeAttr('disabled');
  }

  handleClick(e) {
    $('.follow-toggle').attr('disabled', 'disabled');

    e.preventDefault();
    if (this.initialFollowState) {
      APIUtil.unfollowUser(this.userId).then( (thing) => {
        this.initialFollowState = !this.initialFollowState;
        this.render();
      }).catch( (err) => console.log(err) );
    } else {
      APIUtil.followUser(this.userId).then((thing) => {
        this.initialFollowState = !this.initialFollowState;
        this.render();
      }).catch((err) => console.log(err));
    }
    
    // let method = this.initialFollowState ? 'DELETE' : 'POST'
    // $.ajax({
    //   url: `/users/${this.userId}/follow`,
    //   type: method,
    //   dataType: 'json',
    //   success: (thing) => {
    //     this.initialFollowState = !this.initialFollowState;
    //     this.render();
    //   },
    //   error: (err) => console.log(err)
    // });
  }

}


module.exports = FollowToggle;