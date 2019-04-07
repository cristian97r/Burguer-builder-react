import reducer from './auth'
import * as actionsTypes from '../actions/actionTypes'


describe('auth reducer', () => {

    it('shuld return the initial state', () => {
         expect(reducer(undefined, {})).toEqual({
                token: null,
                userId: null,
                error: null,
                loading: false,
                authRedirectPath: '/'
         })
    })

    it('shuld store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
     }, {
         type: actionsTypes.AUTH_SUCCESS,
         idToken: 'test-token',
         userId: 'test-user-id'
        })).toEqual({
            token: 'test-token',
            userId: 'test-user-id',
            error: null,
            loading: false,
            authRedirectPath: '/'
     })
    })
})