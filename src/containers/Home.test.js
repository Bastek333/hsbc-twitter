import React from 'react';
import { shallow, mount} from 'enzyme';
import { BrowserRouter as Router } from "react-router-dom";
import Home from './Home';

import postsFetch from '../components/PostsFetch';


describe('Home Component', () => {
    it('should render without throwing an error', () => {
        const wrapper = mount(<Router><Home isAuthenticated="true"/></Router>);
        expect(wrapper.find('.Home').exists()).toBe(true)
    })

    it('renders a posts', async () => {
        const wrapper = mount(<Router><Home isAuthenticated="true"/></Router>);

        const postList = await postsFetch();

        expect(postList.length).not.toBeLessThan(1)
    })

    it('renders a search input', () => {
        const wrapper = mount(<Router><Home isAuthenticated="true"/></Router>);
        expect(wrapper.find('#search').length).toEqual(1)
    })

    it('renders Logout button', () => {
        const wrapper = mount(<Router><Home isAuthenticated="true"/></Router>);
        expect(wrapper.find('button').length).toEqual(1)
    })
})

