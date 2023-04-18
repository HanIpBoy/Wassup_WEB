const initialState = {
    token: null,
    loading: false,
    error: null,
};

const prefix = "calendar/auth";

const { pending, success, fail } = createActions(
    "PENDING",
    "SUCCESS",
    "FAIL",
    { prefix }
);

const reducer = handleActions(
    {
        [pending]: (state) => ({
            ...state,
            loading: true,
            error: null,
        }),
        [success]: (state, action) => ({
            token: action.payload,
            loading: false,
            error: null,
        }),
        [fail]: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload
        }),
    },
    initialState,
    { prefix }
);

export default reducer;

// saga
function* authSaga() {

}

export { authSaga };