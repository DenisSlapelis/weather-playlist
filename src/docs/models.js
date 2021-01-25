exports.loggedInUserResponse = {
    "user": {
        "email": "denis.slapelis@gmail.com",
        "name": "Denis Slapelis",
        "hometown": "São Paulo"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkZW5pcy5zbGFwZWxpc0BnbWFpbC5jb20iLCJob21ldG93biI6IlPDo28gUGF1bG8iLCJpYXQiOjE2MTE2MTQzNTF9.2ATz5en61qEZgQ5tg6VVIkzHXz8CxHfY86FOJDKadCA"
}

exports.customError = {
    name: 'Error type',
    message: ['Error message'],
    stack: 'If env var SHOW_STACK is true, the stacktrace of the error will be displayed, otherwise it will be null'
};