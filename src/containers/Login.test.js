import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from './Login';

describe('Login Component', () => {
    it('should render without throwing an error', () => {
        expect(shallow(<Login />).find('form').exists()).toBe(true)
    })

    it('renders a email input', () => {
        expect(mount(<Login />).find('#username').length).toEqual(1)
    })

    it('renders a password input', () => {
        expect(mount(<Login />).find('#password').length).toEqual(1)
    })

    it('renders a login button', () => {
        expect(mount(<Login />).find('button').length).toEqual(1)
    })
})

describe('Username input', () => {
  
    it('should respond to change event and change the state of the Login Component', () => {
     
        const wrapper = mount(<Login />);
        wrapper.find('#username').simulate('change', {target: {id: 'username', value: 'TestUser'}});
        
        expect(wrapper.state('username')).toEqual('TestUser');
    })
   })
   
describe('Password input', () => {

    it('should respond to change event and change the state of the Login Component', () => {
        
        const wrapper = mount(<Login />);
        wrapper.find('#password').simulate('change', {target: {id: 'password', value: 'testpassword'}});
        
        expect(wrapper.state('password')).toEqual('testpassword');
    })
})

describe('Password and username input validation', () => {

    it('should login button be active for password contains 8 characters, at least one small letter, at least one capital letter, at least one number and username is at least 5 characters long', () => {
        
        const wrapper = mount(<Login />);
        wrapper.find('#username').simulate('change', {target: {id: 'username', value: 'TestUser'}});
        wrapper.find('#password').simulate('change', {target: {id: 'password', value: 'aaaaaaA1'}});
        
        expect(wrapper.find('button').props().disabled).toBe(false)
    })

    it('should login button be disabled for not correct password and username at least 5 characters long', () => {
        
        const wrapper = mount(<Login />);
        wrapper.find('#username').simulate('change', {target: {id: 'username', value: 'TestUser'}});
        wrapper.find('#password').simulate('change', {target: {id: 'password', value: 'aaaaaaaaaa'}});
        
        expect(wrapper.find('button').props().disabled).toBe(true)
    })

    it('should login button be disabled for correct password but username under 5 characters long', () => {
        
        const wrapper = mount(<Login />);
        wrapper.find('#username').simulate('change', {target: {id: 'username', value: 'Test'}});
        wrapper.find('#password').simulate('change', {target: {id: 'password', value: 'aaaaaaA1'}});
        
        expect(wrapper.find('button').props().disabled).toBe(true)
    })

    it('should login button be disabled for not correct password and username under 5 characters long', () => {
        
        const wrapper = mount(<Login />);
        wrapper.find('#username').simulate('change', {target: {id: 'username', value: 'Test'}});
        wrapper.find('#password').simulate('change', {target: {id: 'password', value: 'aaaaaaaaaaa'}});
        
        expect(wrapper.find('button').props().disabled).toBe(true)
    })
})
