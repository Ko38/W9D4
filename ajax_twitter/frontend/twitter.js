const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');

$(document).ready( () => {

  let $ft = $('.follow-toggle');
  if ($ft.data()) {
    let initFollowState = $ft.data().initialFollowState;
    let userId = $ft.data().userId;
    let follow_toggle = new FollowToggle(userId, initFollowState);
  }
  let users_search = new UsersSearch($('.users-search'), $('.users-search input').attr('name'), $('.users-search ul'));

});