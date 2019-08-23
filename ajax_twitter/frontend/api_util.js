const APIUtil = {
  followUser: id => {
    return new Promise( (res, rej) => {
      $.ajax({
        url: `/users/${id}/follow`,
        type: 'POST',
        dataType: 'json',
        success: (thing) => {
          res(thing);
        },
        error: (err) => {
          rej(err);
        }
      });
    });
  },

  unfollowUser: id => {
    return new Promise((res, rej) => {
      $.ajax({
        url: `/users/${id}/follow`,
        type: 'DELETE',
        dataType: 'json',
        success: (thing) => {
          res(thing);
        },
        error: (err) => {
          rej(err);
        }
      });
    });
  },

  searchUsers: queryVal => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `/users/search`,
        type: 'GET',
        dataType: 'json',
        data: {
          query: queryVal
        },
        success: (thing) => {
          resolve(thing);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }
};

module.exports = APIUtil;