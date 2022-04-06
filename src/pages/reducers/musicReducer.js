const musicReducer = (
  state = {
    token: null,
    user: { display_name: "Still loading", spotifyid: "none" },
  },
  action
) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "ADD_SPOTIFY_USER":
      return {
        ...state,
        spotifyuser: action.spotifyuser,
      };

    case "ADD_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default musicReducer;
